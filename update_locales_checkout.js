const fs = require('fs');
const path = require('path');

const localesDir = '/home/ismail-chafai/Desktop/New Folder/maroc_turate/maroc_turate/locales';

// New keys specifically for checkout-screen that are missing
const newKeys = {
  en: {
    checkout: {
      order_success_msg: "Your artisan items are being prepared with care. You will receive a confirmation shortly.",
      view_orders: "View Orders",
      qty: "Qty",
      by: "by",
      artisan_support: "ARTISAN SUPPORT",
      supporting_local: "Supporting Local Artisans",
      purchase_goes: "85% of your purchase goes directly to the maker",
      artisan_receives: "Artisan receives",
      platform_fee: "Platform fee (15%)",
      pay: "Pay",
      mad: "MAD",
      apple_pay: "Apple Pay",
      google_pay: "Google Pay"
    }
  },
  ar: {
    checkout: {
      order_success_msg: "يتم تحضير عناصرك الحرفية بعناية. ستتلقى تأكيدًا قريبًا.",
      view_orders: "عرض الطلبات",
      qty: "كمية",
      by: "بواسطة",
      artisan_support: "دعم الحرفيين",
      supporting_local: "دعم الحرفيين المحليين",
      purchase_goes: "85٪ من مشترياتك تذهب مباشرة إلى الصانع",
      artisan_receives: "يحصل الحرفي على",
      platform_fee: "رسوم المنصة (15٪)",
      pay: "دفع",
      mad: "درهم",
      apple_pay: "Apple Pay",
      google_pay: "Google Pay"
    }
  },
  fr: {
    checkout: {
      order_success_msg: "Vos articles artisanaux sont préparés avec soin. Vous recevrez bientôt une confirmation.",
      view_orders: "Voir les commandes",
      qty: "Qté",
      by: "par",
      artisan_support: "SOUTIEN AUX ARTISANS",
      supporting_local: "Soutien aux artisans locaux",
      purchase_goes: "85% de votre achat va directement au créateur",
      artisan_receives: "L'artisan reçoit",
      platform_fee: "Frais de plateforme (15%)",
      pay: "Payer",
      mad: "MAD",
      apple_pay: "Apple Pay",
      google_pay: "Google Pay"
    }
  },
  tzm: {
    checkout: {
      order_success_msg: "ⴰⵔ ⵜⵜⵓⵙⵡⵊⴰⴷⵏ ⵉⵙⴳⵎⴰⵏ ⵏⵏⴽ ⵙ ⵜⵖⴹⴼⵜ. ⵔⴰⴷ ⵜⴰⵎⵥⴹ ⴰⵙⴷⴷⵉⴷ ⴷⵖⵉ.",
      view_orders: "ⵥⵕ ⵉⵙⵓⵖⴰⵏ",
      qty: "ⵜⵙⵎⴽⵜⴰ",
      by: "ⵙⵖ",
      artisan_support: "ⴰⵏⴰⵍ ⵉ ⵉⵎⵓⵙⵏⴰⵡⵏ",
      supporting_local: "ⴰⵏⴰⵍ ⵉ ⵉⵎⵓⵙⵏⴰⵡⵏ ⵏ ⵜⵎⴰⵣⵉⵔⵜ",
      purchase_goes: "85% ⵙⴳ ⵜⵙⵖⵉⵜ ⵏⵏⴽ ⵔⴰⴷ ⵜⴷⴷⵓ ⵙⴳ ⵓⵙⵏⵓⴼⵍⴰⵢ",
      artisan_receives: "ⴰⵔ ⵉⵜⵜⴰⵎⵥ ⵓⵎⵓⵙⵏⴰⵡ",
      platform_fee: "ⵜⴰⵎⵙⴳⴰⵔⵜ ⵏ ⵜⵏⵙⴰ (15%)",
      pay: "ⵙⴼⵔⵓ",
      mad: "MAD",
      apple_pay: "Apple Pay",
      google_pay: "Google Pay"
    }
  }
};

['en', 'ar', 'fr', 'tzm'].forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  Object.assign(data.checkout, newKeys[lang].checkout);
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Updated checkout in ${lang}.json`);
});
