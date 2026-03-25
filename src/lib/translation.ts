export const TRANSLATIONS = {
  en: {
    // ---form---
    number: "Card Number",
    ph_number: "16 or 19 digits",
    name: "Name",
    ph_name: "Card holder's name",
    month: "Month",
    year: "Year",
    cvc: "CVC/CVV",
    pay: "Pay",
    cancel: "Cancel",
    cvc_bubble: "This is the 3-digit security code on the back of your card.",
    // --- card display ---
    name_display: "cardholder's name",
    your_name: "your name here",
    valid: "valid thru",
    month_display: "MM",
    year_display: "YY",
    // ------
    fill: "Fill in the card details",
    slider_hue: "Hue",
    slider_lightness: "Lightness",
    slider_chroma: "Chroma",
    slider_reset: "Reset to original color",
    language: "Language",
    result:
      "Your card details have been conditionally transferred to the server.",
  },
  ru: {
    // ---form---
    number: "Номер карты",
    ph_number: "16 или 19 цифр",
    name: "Имя",
    ph_name: "Фамилия владельца карты",
    month: "месяц",
    year: "год",
    cvc: "код",
    pay: "Оплатить",
    cancel: "Отменить",
    cvc_bubble:
      "Это 3-значный код безопасности на обратной стороне вашей карты.",
    // --- card display ---
    name_display: "имя владельца",
    your_name: "Ваша фамилия здесь",
    valid: "срок",
    month_display: "MM",
    year_display: "ГГ",
    // ------
    fill: "Заполните данные карты",
    slider_hue: "Тон",
    slider_lightness: "Освещение",
    slider_chroma: "Насыщенность",
    slider_reset: "Сбросить до исходного цвета",
    language: "Язык",
    result: "Данные вашей карты условно переданы на сервер.",
  },
};

export const ERRORS = {
  en: {
    no_of_digits: "Must be 16 or 19 digits.",
    only_digits: "Number must contain only digits.",
    required: "This field is required.",
    two_chars: "Name must be at least 2 characters.",
    latin_chars: "String must contain only Latin letters",
    cvc_digits: "CVC must contain only digits.",
    cvc_three: "CVC must be 3 digits.",
  },
  ru: {
    no_of_digits: "Должно содержаться 16 или 19 цифр.",
    only_digits: "Номер должен содержать только цифры.",
    required: "Это поле является обязательным.",
    two_chars: "Имя должно состоять минимум из 2 букв.",
    latin_chars: "Строка должна содержать только латинские буквы.",
    cvc_digits: "Код должен содержать только цифры.",
    cvc_three: "Код должен содержать 3 цифры.",
  },
};
