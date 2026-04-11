// ~/utils/emailValidation.ts
import * as yup from "yup";

const allowedEmailDomains = [
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "outlook.com",
  "hotmail.com",
  "hotmail.co.uk",
  "live.com",
  "live.co.uk",
  "icloud.com",
  "aol.com",
  "mail.com",
  "protonmail.com",
  "zoho.com",

  // Яндекс (Россия, Украина, Беларусь, Казахстан и др.)
  "yandex.ru",
  "yandex.ua",
  "yandex.by",
  "yandex.kz",
  "yandex.com",
  "ya.ru",

  // Mail.ru и поддомены
  "mail.ru",
  "inbox.ru",
  "list.ru",
  "bk.ru",

  // Рамблер и поддомены
  "rambler.ru",

  // Украинские
  "ukr.net",
  "i.ua",
  "meta.ua",
  "bigmir.net",
  "mail.ua",

  // Белорусские
  "mail.by",

  // Казахстанские
  "mail.kz",

  // Другие СНГ
  "inbox.lv",
  "mail.ee",

  // Дополнительно популярные (например, edu, gov и др. можно при необходимости добавить)
];

// Валидация email с проверкой домена
export const emailSchema = yup
  .string()
  .email("Неверный формат почты")
  .test("is-allowed-domain", "Недопустимый домен почты", (value) => {
    if (!value) return true; // пустое значение пропускаем

    const domain = value.split("@")[1]?.toLowerCase();
    return domain ? allowedEmailDomains.includes(domain) : false;
  });
