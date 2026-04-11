import * as yup from "yup";
import { phoneFormats } from "./phoneFormatting";

export const phoneValidationRules = [
  {
    code: "7",
    regex: /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/,
    message: "Введите корректный номер России: +7 (XXX) XXX-XX-XX",
  },
  {
    code: "375",
    regex: /^\+375\s?\(\d{2}\)\s?\d{3}-\d{2}-\d{2}$/,
    message: "Введите корректный номер Беларуси: +375 (XX) XXX-XX-XX",
  },
  {
    code: "374",
    regex: /^\+374\s?\(\d{2}\)\s?\d{3}-\d{2}-\d{2}$/,
    message: "Введите корректный номер Армении: +374 (XX) XXX-XX-XX",
  },
  {
    code: "373",
    regex: /^\+373\s?\(\d{3}\)\s?\d{1}-\d{2}-\d{2}$/,
    message: "Введите корректный номер Молдовы: +373 (XXX) X-XX-XX",
  },
  {
    code: "380",
    regex: /^\+380\s?\(\d{2}\)\s?\d{3}-\d{2}-\d{2}$/,
    message: "Введите корректный номер Украины: +380 (XX) XXX-XX-XX",
  },
  {
    code: "992",
    regex: /^\+992\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/,
    message: "Введите корректный номер Таджикистана: +992 (XXX) XXX-XX-XX",
  },
  {
    code: "993",
    regex: /^\+993\s?\(\d{2}\)\s?\d{3}-\d{2}-\d{2}$/,
    message: "Введите корректный номер Туркменистана: +993 (XX) XXX-XX-XX",
  },
  {
    code: "994",
    regex: /^\+994\s?\(\d{2}\)\s?\d{3}-\d{2}-\d{2}$/,
    message: "Введите корректный номер Азербайджана: +994 (XX) XXX-XX-XX",
  },
  {
    code: "995",
    regex: /^\+995\s?\(\d{3}\)\s?\d{2}-\d{2}-\d{2}$/,
    message: "Введите корректный номер Грузии: +995 (XXX) XX-XX-XX",
  },
  {
    code: "996",
    regex: /^\+996\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/,
    message: "Введите корректный номер Кыргызстана: +996 (XXX) XXX-XX-XX",
  },
] as const;

export type PhoneMaskItem = {
  code: string;
  name: string;
  mask: string;
  message: string;
};

const countryNameMap: Record<string, string> = {
  России: "Россия",
  Беларуси: "Беларусь",
  Армении: "Армения",
  Молдовы: "Молдова",
  Украины: "Украина",
  Таджикистана: "Таджикистан",
  Туркменистана: "Туркменистан",
  Азербайджана: "Азербайджан",
  Грузии: "Грузия",
  Кыргызстана: "Кыргызстан",
};

const convertPatternToMask = (pattern: string) =>
  pattern.replace(/\{0:(\d+)\}/g, (_, len: string) => "#".repeat(Number(len)));

const extractCountryName = (message: string) => {
  const match = message.match(/номер\s+([^:]+):/i);
  const raw = match?.[1]?.trim() || "";
  return countryNameMap[raw] || raw;
};

export const getPhoneMaskItems = (): PhoneMaskItem[] => {
  return phoneValidationRules.map((rule) => {
    const format = phoneFormats[rule.code];
    const mask = format
      ? `+${rule.code} ${format.patterns.map(convertPatternToMask).join("")}`.trim()
      : rule.message;

    return {
      code: rule.code,
      name: extractCountryName(rule.message),
      mask,
      message: rule.message,
    };
  });
};

const DEFAULT_PHONE_MESSAGE = "Наведи и разберёмся";

export const phoneValidator = yup
  .string()
  .optional()
  .test(
    "is-valid-cis-phone",
    DEFAULT_PHONE_MESSAGE, // 👈 ВОТ ЭТО ЗАМЕНИЛИ
    function (value) {
      if (!value) {
        return this.createError({
          message: DEFAULT_PHONE_MESSAGE,
        });
      }

      const matchedRule = phoneValidationRules.find((rule) =>
        value.startsWith("+" + rule.code),
      );

      if (!matchedRule) {
        return this.createError({
          message: DEFAULT_PHONE_MESSAGE, // 👈 ВОТ ЭТО ТОЖЕ
        });
      }

      if (!matchedRule.regex.test(value)) {
        return this.createError({
          message: matchedRule.message,
        });
      }

      return true;
    },
  );
