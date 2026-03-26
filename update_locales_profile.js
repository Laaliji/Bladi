const fs = require('fs');
const path = require('path');

const localesDir = '/home/ismail-chafai/Desktop/New Folder/maroc_turate/maroc_turate/locales';

// New keys specifically for profile-screen demo data
const newKeys = {
  en: {
    demo_user: {
      name: "Alexandra Chen",
      country: "United States",
      member_since_date: "March 2024",
      time_2d: "2 days ago",
      time_3d: "3 days ago",
      time_1w: "1 week ago",
      member_since_prefix: "Member since"
    }
  },
  ar: {
    demo_user: {
      name: "ألكسندرا تشين",
      country: "الولايات المتحدة",
      member_since_date: "مارس 2024",
      time_2d: "منذ يومين",
      time_3d: "منذ 3 أيام",
      time_1w: "منذ أسبوع",
      member_since_prefix: "عضو منذ"
    }
  },
  fr: {
    demo_user: {
      name: "Alexandra Chen",
      country: "États-Unis",
      member_since_date: "Mars 2024",
      time_2d: "Il y a 2 jours",
      time_3d: "Il y a 3 jours",
      time_1w: "Il y a 1 semaine",
      member_since_prefix: "Membre depuis"
    }
  },
  tzm: {
    demo_user: {
      name: "ⴰⵍⵉⴽⵙⴰⵏⴷⵔⴰ ⵛⵉⵏ",
      country: "ⵉⵡⵓⵏⴰⴽ ⵉⵎⵓⵏⵏ",
      member_since_date: "ⵎⴰⵕⵚ 2024",
      time_2d: "ⵙⵉⵏ ⵡⵓⵙⵙⴰⵏ ⴰⵢⴰ",
      time_3d: "ⴽⵕⴰⴹ ⵡⵓⵙⵙⴰⵏ ⴰⵢⴰ",
      time_1w: "ⵢⴰⵏ ⵉⵎⴰⵍⴰⵙⵙ ⴰⵢⴰ",
      member_since_prefix: "ⴰⴳⵎⴰⵎ ⵙⴳ"
    }
  }
};

['en', 'ar', 'fr', 'tzm'].forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  data.demo_user = newKeys[lang].demo_user;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Updated profile demo data in ${lang}.json`);
});
