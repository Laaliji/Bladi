const fs = require('fs');
const path = require('path');

const localesDir = '/home/ismail-chafai/Desktop/New Folder/maroc_turate/maroc_turate/locales';

const demoData = {
  en: {
    name: "Fatima Zahra",
    craft: "Traditional Zellige",
    city: "Fes",
    bio: "Third-generation zellige artisan specializing in traditional Moroccan mosaic art. My family has been crafting zellige tiles in the medina of Fes for over 80 years, preserving ancient techniques passed down through generations.",
    time_2w: "2 weeks ago",
    time_1m: "1 month ago",
    review1_text: "Absolutely stunning craftsmanship! The zellige table is the centerpiece of my home.",
    review1_name: "Sarah M.",
    review2_text: "Authentic Moroccan artistry. Highly recommended!",
    review2_name: "Ahmed K.",
    product1: "Zellige Table",
    product2: "Mosaic Mirror",
    product3: "Tile Set (25pc)"
  },
  ar: {
    name: "فاطمة الزهراء",
    craft: "الزليج التقليدي",
    city: "فاس",
    bio: "حرفية زليج من الجيل الثالث متخصصة في فن الفسيفساء المغربي التقليدي. عائلتي تصنع بلاط الزليج في مدينة فاس منذ أكثر من 80 عامًا، مع الحفاظ على التقنيات القديمة المتوارثة عبر الأجيال.",
    time_2w: "منذ أسبوعين",
    time_1m: "منذ شهر",
    review1_text: "حرفية مذهلة حقًا! طاولة الزليج هي القطعة المركزية في منزلي.",
    review1_name: "سارة م.",
    review2_text: "فن مغربي أصيل. يوصى به بشدة!",
    review2_name: "أحمد ك.",
    product1: "طاولة زليج",
    product2: "مرآة فسيفساء",
    product3: "مجموعة بلاط (25 قطعة)"
  },
  fr: {
    name: "Fatima Zahra",
    craft: "Zellige traditionnel",
    city: "Fès",
    bio: "Artisane zellige de troisième génération spécialisée dans l'art de la mosaïque traditionnelle marocaine. Ma famille fabrique des carreaux de zellige dans la médina de Fès depuis plus de 80 ans, préservant ainsi les techniques anciennes transmises de génération en génération.",
    time_2w: "Il y a 2 semaines",
    time_1m: "Il y a 1 mois",
    review1_text: "Un savoir-faire absolument magnifique ! La table en zellige est la pièce maîtresse de ma maison.",
    review1_name: "Sarah M.",
    review2_text: "Art marocain authentique. Fortement recommandé !",
    review2_name: "Ahmed K.",
    product1: "Table en zellige",
    product2: "Miroir en mosaïque",
    product3: "Ensemble de carreaux (25 pces)"
  },
  tzm: {
    name: "ⴼⴰⵟⵉⵎⴰ ⵣⵣⵀⵕⴰ",
    craft: "ⴰⵣⵍⵍⵉⵊ ⴰⵎⵏⵙⴰⵢ",
    city: "ⴼⴰⵙ",
    bio: "ⵜⴰⵎⵓⵙⵏⴰⵡⵜ ⵏ ⵓⵣⵍⵍⵉⵊ ⵙⴳ ⵜⴰⵙⵓⵜ ⵜⵉⵙⵙ ⴽⵕⴰⴹⵜ ⵉⵥⵍⵉⵏ ⵙ ⵜⵥⵓⵕⵉ ⵏ ⵓⴼⵙⵉⴼⵙⴰ ⴰⵎⵖⵔⵉⴱⵉ ⴰⵎⵏⵙⴰⵢ. ⵜⴰⵡⵊⴰ ⵉⵏⵓ ⴰⵔ ⵜⵙⴽⴰⵔ ⵜⵉⴼⵉⵍⵉⵏ ⵏ ⵓⵣⵍⵍⵉⵊ ⴳ ⵜⵎⴷⵉⵏⵜ ⵏ ⴼⴰⵙ ⵓⴳⴳⴰⵔ ⵏ 80 ⵉⵙⴳⴳⵯⴰⵙⵏ, ⴰⵔ ⵜⵃⵟⵟⵓ ⵜⵉⵜⵉⵇⵏⵉⵢⵉⵏ ⵜⵉⵇⵇⴱⵓⵕⵉⵏ ⵉⵜⵜⵓⵢⴰⵣⴰⵏ ⵙⴳ ⵜⴰⵙⵓⵜⵉⵏ.",
    time_2w: "ⵙⵉⵏ ⵉⵎⴰⵍⴰⵙⵙⵏ ⴰⵢⴰ",
    time_1m: "ⵢⴰⵏ ⴰⵢⵢⵓⵔ ⴰⵢⴰ",
    review1_text: "ⵜⴰⵎⵓⵙⵏⵉ ⵉⴼⴰⵡⵏ ⴰⵟⵟⴰⵚ! ⵜⴰⵟⴰⴱⵍⴰ ⵏ ⵓⵣⵍⵍⵉⵊ ⵜⴳⴰ ⵜⴰⵖⴰⵡⵙⴰ ⵜⴰⵏⴰⵎⵎⴰⵙⵜ ⴳ ⵜⴳⵎⵎⵉ ⵉⵏⵓ.",
    review1_name: "ⵙⴰⵔⴰ ⵎ.",
    review2_text: "ⵜⴰⵥⵓⵕⵉ ⵜⴰⵎⵖⵔⵉⴱⵉⵜ ⵜⴰⵏⵚⵍⵉⵜ. ⴰⵔ ⵜ ⵏⵙⵙⵓⵎⵔ ⵙ ⵡⴰⵟⵟⴰⵚ!",
    review2_name: "ⴰⵃⵎⴰⴷ ⴽ.",
    product1: "ⵟⴰⴱⵍⴰ ⵏ ⵓⵣⵍⵍⵉⵊ",
    product2: "ⵜⵉⵙⵉⵜ ⵏ ⵓⴼⵙⵉⴼⵙⴰ",
    product3: "ⵜⴰⴳⵔⵓⵎⵎⴰ ⵏ ⵜⴼⵉⵍⵉⵏ (25 ⵜⵉⴳⴳⵎⵉ)"
  }
};

const screensFixes = {
  ar: {
    artisan_profile_screen: { portfolio: "معرض الأعمال" }
  },
  tzm: {
    artisan_profile_screen: { 
      portfolio: "ⴰⵎⵙⴽⴰⵏ ⵏ ⵜⵡⵓⵔⵉⵡⵉⵏ",
      reviews: "ⵉⵙⵉⵜⴳⵏ",
      shop: "ⵜⴰⵃⴰⵏⵓⵜ",
      follow: "ⴹⴼⵕ",
      following: "ⴹⴼⵕ"
    }
  }
};

['en', 'ar', 'fr', 'tzm'].forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  data.demo_artisan = demoData[lang];
  
  if (screensFixes[lang] && screensFixes[lang].artisan_profile_screen) {
    if (!data.artisan_profile_screen) data.artisan_profile_screen = {};
    Object.assign(data.artisan_profile_screen, screensFixes[lang].artisan_profile_screen);
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Updated ${lang}.json`);
});
