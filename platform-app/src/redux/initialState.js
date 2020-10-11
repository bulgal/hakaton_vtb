export const INITIAL_STATE = {
  form: null,
  webcomponentIsUploaded: false,
  actuals: {
    fingerprint: "",
    country: "",
    purchaseHistory: [
      {
        category: "Наименование покупки",
        everageDate: "09.10.2020",
        check: "22512",
        lastDate: "09.10.2020",
      },
    ],
  },
  currents: {
    fingerPrint: {
      status: "disabled",
      value: "",
    },
    country: {
      status: "disabled",
      value: "",
    },
  },
  user: {
    purchase: {
      category: "Бытовая техника",
      sum: 1000,
      date: "11.02.2021",
      percent: 0,
    },
  },
  statics: {
    countries: [],
    purchaseData: {
      categories: [
        { value: "Бытовая техника", label: "Бытовая техника" },
        { value: "Одежда", label: "Одежда" },
        {
          value: "Мебель и товары для дома",
          label: "Мебель и товары для дома",
        },
        { value: "Продукты питания", label: "Продукты питания" },
        { value: "Автозапчасти", label: "Автозапчасти" },
      ],
    },
  },
  formula: null,
};
