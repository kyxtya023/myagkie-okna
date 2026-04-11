import nodemailer from 'nodemailer'
import type { QuizAnswers, ContactForm, EmailResponse } from '~/types'

interface EmailBody {
  type: 'quiz' | 'contact' | 'estimate'
  data: QuizAnswers | ContactForm
}

export default defineEventHandler(async (event): Promise<EmailResponse> => {
  const config = useRuntimeConfig()
  
  const body = await readBody<EmailBody>(event)
  
  if (!body || !body.type || !body.data) {
    return {
      success: false,
      message: 'Неверные данные запроса'
    }
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: config.mailHost,
    port: parseInt(config.mailPort),
    secure: true,
    auth: {
      user: config.mailUser,
      pass: config.mailPass
    }
  })

  // Generate email content based on type
  let subject = ''
  let htmlContent = ''

  if (body.type === 'quiz') {
    const data = body.data as QuizAnswers
    subject = `Новая заявка с квиза`
    htmlContent = generateQuizEmailTemplate(data)
  } else if (body.type === 'contact') {
    const data = body.data as ContactForm
    subject = `Новая заявка`
    htmlContent = generateContactEmailTemplate(data)
  }

  try {
    await transporter.sendMail({
      from: `"МягкиеОкна" <${config.mailUser}>`,
      to: config.mailTo,
      subject,
      html: htmlContent
    })

    return {
      success: true,
      message: 'Заявка успешно отправлена'
    }
  } catch (error) {
    console.error('Email send error:', error)
    return {
      success: false,
      message: 'Ошибка при отправке письма'
    }
  }
})

function generateQuizEmailTemplate(data: QuizAnswers): string {
  return `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Новая заявка</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 40px 20px;">
            <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #82dbf7 0%, #5bc4e8 100%); padding: 30px 40px; text-align: center;">
                  <h1 style="margin: 0; color:#0f172a; font-size: 20px; font-weight: 700;">
                    Новая заявка
                  </h1>
                  <p style="
                    margin:8px 0 0;
                    font-size:13px;
                    color:#0f172a;
                    opacity:0.8;
                  ">
                  Форма "Квиз"
                  </p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <!-- Contact Info -->
                  <table role="presentation" style="width: 100%; margin-bottom: 30px; background-color: #f1f5f9; border-radius: 12px; padding: 20px;">
                    <tr>
                      <td style="padding: 15px 20px;">
                        <p style="margin: 0 0 5px 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Имя</p>
                        <p style="margin: 0; font-size: 18px; color: #1e293b; font-weight: 600;">${escapeHtml(data.name)}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 15px 20px;">
                        <p style="margin: 0 0 5px 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Телефон</p>
                        <p style="margin: 0; font-size: 18px; color: #82dbf7; font-weight: 600;">
                          <a href="tel:${escapeHtml(data.phone)}" style="color: #82dbf7; text-decoration: none;">${escapeHtml(data.phone)}</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Quiz Answers -->
                  <h2 style="margin: 0 0 20px 0; font-size: 18px; color: #1e293b; border-bottom: 2px solid #82dbf7; padding-bottom: 10px;">
                    Ответы на вопросы
                  </h2>
                  
                  <table role="presentation" style="width: 100%; border-collapse: collapse;">
                    ${generateAnswerRow('Площадь остекления', data.area)}
                    ${generateAnswerRow('Дверных проемов', data.doors)}
                    ${generateAnswerRow('Основание', data.base)}
                    ${generateAnswerRow('Комплект', data.package)}
                    ${generateAnswerRow('Монтаж', data.installation)}
                    ${generateAnswerRow('Сроки', data.timing)}
                  </table>
                  
                  ${data.comment ? `
                  <div style="margin-top: 25px; padding: 20px; background-color: #fef3c7; border-radius: 12px; border-left: 4px solid #f59e0b;">
                    <p style="margin: 0 0 5px 0; font-size: 12px; color: #92400e; text-transform: uppercase; letter-spacing: 0.5px;">Комментарий</p>
                    <p style="margin: 0; font-size: 14px; color: #78350f; line-height: 1.6;">${escapeHtml(data.comment)}</p>
                  </div>
                  ` : ''}
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8fafc; padding: 25px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                    Это автоматическое уведомление с сайта МягкиеОкна
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

function generateContactEmailTemplate(data: ContactForm): string {
  return `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Новая заявка</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
      <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 40px 20px;">
            <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #82dbf7 0%, #5bc4e8 100%); padding: 30px 40px; text-align: center;">
                  <h1 style="margin: 0; color: #0f172a; font-size: 24px; font-weight: 700;">
                    Новая заявка
                  </h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <table role="presentation" style="width: 100%;">
                    <tr>
                      <td style="padding: 10px 0;">
                        <p style="margin: 0 0 5px 0; font-size: 12px; color: #64748b;">Имя</p>
                        <p style="margin: 0; font-size: 16px; color: #1e293b; font-weight: 600;">${escapeHtml(data.name)}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0;">
                        <p style="margin: 0 0 5px 0; font-size: 12px; color: #64748b;">Телефон</p>
                        <p style="margin: 0; font-size: 16px; color: #82dbf7; font-weight: 600;">
                          <a href="tel:${escapeHtml(data.phone)}" style="color: #82dbf7; text-decoration: none;">${escapeHtml(data.phone)}</a>
                        </p>
                      </td>
                    </tr>
                    ${data.email ? `
                    <tr>
                      <td style="padding: 10px 0;">
                        <p style="margin: 0 0 5px 0; font-size: 12px; color: #64748b;">Email</p>
                        <p style="margin: 0; font-size: 16px; color: #1e293b;">${escapeHtml(data.email)}</p>
                      </td>
                    </tr>
                    ` : ''}
                    ${data.message ? `
                    <tr>
                      <td style="padding: 10px 0;">
                        <p style="margin: 0 0 5px 0; font-size: 12px; color: #64748b;">Сообщение</p>
                        <p style="margin: 0; font-size: 14px; color: #475569; line-height: 1.6;">${escapeHtml(data.message)}</p>
                      </td>
                    </tr>
                    ` : ''}
                  </table>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8fafc; padding: 25px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                    Это автоматическое уведомление с сайта МягкиеОкна
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

function generateAnswerRow(label: string, value: string): string {
  if (!value) return ''
  return `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
        <span style="display: inline-block; width: 150px; font-size: 14px; color: #64748b;">${label}:</span>
        <span style="font-size: 14px; color: #1e293b; font-weight: 500;">${escapeHtml(value)}</span>
      </td>
    </tr>
  `
}

function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char])
}
