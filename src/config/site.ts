export const siteConfig = {
  name: {
    ar: "مؤسسة جسور السلام الفلسطينية للعون والتنمية",
    en: "Palestinian Bridges of Peace Foundation for Relief and Development",
  },
  url: import.meta.env.VITE_SITE_URL ?? "",
  donation: {
    iban: import.meta.env.VITE_DONATION_IBAN ?? "SA00 0000 0000 0000 0000 0000",
    accountName: {
      ar: "مؤسسة جسور السلام الفلسطينية للعون والتنمية",
      en: "Palestinian Bridges of Peace Foundation for Relief and Development",
    },
    clickLink: import.meta.env.VITE_DONATION_CLICK_LINK ?? "",
    payPalLink: import.meta.env.VITE_DONATION_PAYPAL_LINK ?? "",
    usdtAddress: import.meta.env.VITE_DONATION_USDT_ADDRESS ?? "TT7DEMOUSDTWALLET0000000000000000000xxx",
    usdtNetwork: import.meta.env.VITE_DONATION_USDT_NETWORK ?? "TRC20",
  },
  contact: {
    phone: import.meta.env.VITE_CONTACT_PHONE ?? "+966500000000",
    phoneDisplay: import.meta.env.VITE_CONTACT_PHONE ?? "+966 50 000 0000",
    email: import.meta.env.VITE_CONTACT_EMAIL ?? "info@arabheritage.org",
  },
};
