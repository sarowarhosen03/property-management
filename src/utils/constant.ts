const RANGE_MIN_VALUE = 10;
const RANGE_MAX_VALUE = 500;
const RANGE_STEP = 10;
const RANGE_MIN = 10;
const PRICE_RANGE_MAX = 1000000000;
const ADMIN_ROLES = ["admin"];
const MAX_BEST_PROPERTIES = 8;
const MAX_IMAGE_UPLOAD = 20;
const LIMIT_PER_PAGE = 12;

const ADMINS = ["admin", "manager"];

const MONTH_LIST = {
  en: {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  },
  hy: {
    0: "Հունվար",
    1: "Փետրվար",
    2: "Մարտ",
    3: "Ապրիլ",
    4: "Մայիս",
    5: "Հունիս",
    6: "Հուլիս",
    7: "Օգոստոս",
    8: "Սեպտեմբեր",
    9: "Հոկտեմբեր",
    10: "Նոյեմբեր",
    11: "Դեկտեմբեր",
  },
  rus: {
    0: "Январь",
    1: "Февраль",
    2: "Март",
    3: "Апрель",
    4: "Май",
    5: "Июнь",
    6: "Июль",
    7: "Август",
    8: "Сентябрь",
    9: "Октябрь",
    10: "Ноябрь",
    11: "Декабрь",
  },
};

const LAST_UPDATED_TEXT = {
  en: "Updated:",
  hy: "Թարմացվել է՝",
  rus: "Обновлено:",
};

const PUBLISHED_TEXT = {
  en: "Published:",
  hy: "Հրապարակվել է՝",
  rus: "Опубликовано:",
};

export {
  ADMIN_ROLES,
  ADMINS,
  LAST_UPDATED_TEXT,
  LIMIT_PER_PAGE,
  MAX_BEST_PROPERTIES,
  MAX_IMAGE_UPLOAD,
  MONTH_LIST,
  PRICE_RANGE_MAX,
  PUBLISHED_TEXT,
  RANGE_MAX_VALUE,
  RANGE_MIN,
  RANGE_MIN_VALUE,
  RANGE_STEP,
};
