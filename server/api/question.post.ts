import nodemailer from "nodemailer";

interface QuestionData {
  name: string;
  phone: string;
  email?: string;
}

interface QuestionBody {
  type: "question";
  data: QuestionData;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const body = await readBody<QuestionBody>(event);

  const data = body?.data;

  if (!data?.name || !data?.phone) {
    return {
      success: false,
      message: "Неверные данные",
    };
  }

  const transporter = nodemailer.createTransport({
    host: config.mailHost,
    port: Number(config.mailPort),
    secure: true,
    auth: {
      user: config.mailUser,
      pass: config.mailPass,
    },
  });

  try {
    await transporter.verify();
  } catch (err) {
    return {
      success: false,
      message: "SMTP ошибка",
    };
  }

  const subject = `Нужна консультация с сайта`;

  const accent = "#82dbf7";

  const html = `
<!doctype html>
<html lang="ru">
  <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">

    <div style="padding:30px 16px;">
      <div style="
        max-width:560px;
        margin:0 auto;
        background:linear-gradient(180deg,#ffffff 0%,#f9fbff 100%);
        border-radius:16px;
        overflow:hidden;
        box-shadow:0 10px 30px rgba(0,0,0,0.08);
        border:1px solid #e2e8f0;
      ">

        <div style="
          background:linear-gradient(135deg, ${accent}, #5bc4e8);
          padding:24px;
          text-align:center;
        ">
          <h1 style="margin:0;font-size:20px;color:#0f172a;">
            Нужна консультация
          </h1>
          <p style="margin:8px 0 0;font-size:13px;color:#0f172a;opacity:0.8;">
            Форма "Есть вопросы"
          </p>
        </div>

        <div style="padding:24px;">

          <div style="background:#f1f5f9;border-radius:12px;padding:16px;margin-bottom:16px;">
            <p style="margin:0 0 6px;font-size:12px;color:#64748b;">Имя</p>
            <p style="margin:0;font-size:16px;font-weight:600;color:#0f172a;">
              ${data.name}
            </p>
          </div>

          <div style="background:#f1f5f9;border-radius:12px;padding:16px;margin-bottom:16px;">
            <p style="margin:0 0 6px;font-size:12px;color:#64748b;">Телефон</p>
            <p style="margin:0;font-size:16px;font-weight:600;">
              <a href="tel:${data.phone}" style="color:${accent};text-decoration:none;">
                ${data.phone}
              </a>
            </p>
          </div>

        </div>

        <div style="padding:16px;text-align:center;font-size:12px;color:#94a3b8;border-top:1px solid #e2e8f0;">
          Это автоматическое уведомление с сайта МягкиеОкна
        </div>

      </div>
    </div>

  </body>
</html>
`;

  try {
    const result = await transporter.sendMail({
      from: `"МягкиеОкна" <${config.mailUser}>`,
      to: config.mailTo,
      subject,
      html,
    });

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (e) {
    return {
      success: false,
      message: "Ошибка отправки",
    };
  }
});