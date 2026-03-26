const fs = require('fs');
const path = require('path');

const localesDir = '/home/ismail-chafai/Desktop/New Folder/maroc_turate/maroc_turate/locales';

// New keys for challenges and settings screens
const newKeys = {
  en: {
    settings: {
      profile_edit: "Edit profile",
      app_language: "App Language",
      new_content: "New Content",
      new_content_desc: "Heritage sites, stories, and guides",
      challenges_desc: "Progress updates and new challenges",
      artisan_updates: "Artisan Updates",
      artisan_updates_desc: "New products from followed artisans",
      promotions: "Promotions",
      promotions_desc: "Discounts and special offers",
      accessibility: "ACCESSIBILITY",
      text_size: "Text Size",
      small: "small",
      medium: "medium",
      large: "large",
      high_contrast: "High Contrast",
      high_contrast_desc: "Increase visual contrast",
      audio_desc: "Audio Descriptions",
      audio_desc_desc: "Spoken descriptions for visual content",
      developed_by: "Turath is developed in partnership with:",
      version_info: "Version 1.0.0 · Made with ❤️ in Morocco",
      select_language: "Select Language",
      done: "Done"
    },
    challenges: {
      leaderboard: "Leaderboard",
      rewards_tab: "Rewards",
      challenges_rewards_title: "Challenges & Rewards",
      unlocked_rewards: "UNLOCKED REWARDS",
      valid_until_dec: "Valid until Dec 2024",
      exclusive_video: "Exclusive Zellige Video",
      behind_scenes: "Behind the scenes with master craftsmen",
      points_suffix: "points"
    }
  },
  ar: {
    settings: {
      profile_edit: "تعديل الملف الشخصي",
      app_language: "لغة التطبيق",
      new_content: "محتوى جديد",
      new_content_desc: "مواقع التراث، والقصص، والمرشدين",
      challenges_desc: "تحديثات التقدم والتحديات الجديدة",
      artisan_updates: "تحديثات الحرفيين",
      artisan_updates_desc: "منتجات جديدة من الحرفيين المتابعين",
      promotions: "عروض ترويجية",
      promotions_desc: "خصومات وعروض خاصة",
      accessibility: "إمكانية الوصول",
      text_size: "حجم النص",
      small: "صغير",
      medium: "متوسط",
      large: "كبير",
      high_contrast: "تباين عالٍ",
      high_contrast_desc: "زيادة التباين البصري",
      audio_desc: "الوصف الصوتي",
      audio_desc_desc: "أوصاف منطوقة للمحتوى المرئي",
      developed_by: "تم تطوير تراث بالشراكة مع:",
      version_info: "الإصدار 1.0.0 · صُنع بحب ❤️ في المغرب",
      select_language: "اختر اللغة",
      done: "تم"
    },
    challenges: {
      leaderboard: "لوحة المتصدرين",
      rewards_tab: "المكافآت",
      challenges_rewards_title: "التحديات والمكافآت",
      unlocked_rewards: "المكافآت المفتوحة",
      valid_until_dec: "صالح حتى ديسمبر 2024",
      exclusive_video: "فيديو زليج حصري",
      behind_scenes: "خلف الكواليس مع كبار الحرفيين",
      points_suffix: "نقاط"
    }
  },
  fr: {
    settings: {
      profile_edit: "Modifier le profil",
      app_language: "Langue de l'application",
      new_content: "Nouveau contenu",
      new_content_desc: "Sites patrimoniaux, histoires et guides",
      challenges_desc: "Mises à jour de progression et nouveaux défis",
      artisan_updates: "Mises à jour des artisans",
      artisan_updates_desc: "Nouveaux produits des artisans suivis",
      promotions: "Promotions",
      promotions_desc: "Réductions et offres spéciales",
      accessibility: "ACCESSIBILITÉ",
      text_size: "Taille du texte",
      small: "petit",
      medium: "moyen",
      large: "grand",
      high_contrast: "Contraste élevé",
      high_contrast_desc: "Augmenter le contraste visuel",
      audio_desc: "Descriptions audio",
      audio_desc_desc: "Descriptions parlées pour le contenu visuel",
      developed_by: "Turath est développé en partenariat avec:",
      version_info: "Version 1.0.0 · Fait avec ❤️ au Maroc",
      select_language: "Sélectionner la langue",
      done: "Terminé"
    },
    challenges: {
      leaderboard: "Classement",
      rewards_tab: "Récompenses",
      challenges_rewards_title: "Défis et Récompenses",
      unlocked_rewards: "RÉCOMPENSES DÉVERROUILLÉES",
      valid_until_dec: "Valable jusqu'en déc. 2024",
      exclusive_video: "Vidéo Zellige exclusive",
      behind_scenes: "Dans les coulisses avec les maîtres artisans",
      points_suffix: "points"
    }
  },
  tzm: {
    settings: {
      profile_edit: "ⵙⵏⵉⴼⵍ ⴰⵎⴰⵖⵏⵓ",
      app_language: "ⵜⵓⵜⵍⴰⵢⵜ ⵏ ⵜⵙⵏⵙⵉⵜ",
      new_content: "ⴰⵎⴰⵢⵏⵓ ⵏ ⵓⵎⵓⵖ",
      new_content_desc: "ⵉⵙⴳⵎⴰⵏ ⵏ ⵓⵙⵎⵏⵢⴰⴼ, ⵜⵉⵏⴼⵓⵙⵉⵏ, ⴷ ⵉⵎⵏⵉⴷⵏ",
      challenges_desc: "ⵉⵙⵏⴼⵍⵏ ⵏ ⵓⵖⴰⵔⴰⵙ ⴷ ⵉⵙⴼⴽⴰ ⵉⵎⴰⵢⵏⵓⵜⵏ",
      artisan_updates: "ⵉⵙⵏⴼⵍⵏ ⵏ ⵉⵎⵓⵙⵏⴰⵡⵏ",
      artisan_updates_desc: "ⵉⵙⴳⵎⴰⵏ ⵉⵎⴰⵢⵏⵓⵜⵏ ⵙⴳ ⵉⵎⵓⵙⵏⴰⵡⵏ ⵉⵜⵜⵓⴹⴼⴰⵕⵏ",
      promotions: "ⵜⵉⵙⵖⵉⵡⵉⵏ",
      promotions_desc: "ⵉⵙⴰⵙⵔⴼⵏ ⴷ ⵜⵉⵙⵖⵉⵡⵉⵏ ⵉⵥⵍⵉⵏ",
      accessibility: "ⴰⵣⵔⴼ ⵏ ⵓⴽⵛⵛⵓⵎ",
      text_size: "ⵜⵉⴷⴷⵉ ⵏ ⵓⴹⵕⵉⵙ",
      small: "ⴰⵎⵥⵥⵢⴰⵏ",
      medium: "ⴰⵏⴰⵎⵎⴰⵙ",
      large: "ⴰⵎⵇⵇⵔⴰⵏ",
      high_contrast: "ⴰⵎⵣⴰⵔⴰⵢ ⵢⴰⵜⵜⵓⵢⵏ",
      high_contrast_desc: "ⵙⵙⵉⵎⵖⵓⵔ ⴰⵎⵣⴰⵔⴰⵢ ⵏ ⵉⵥⵕⵉ",
      audio_desc: "ⴰⴳⵍⴰⵎ ⵏ ⵉⵎⵙⵍⵉ",
      audio_desc_desc: "ⵉⴳⵍⴰⵎⵏ ⵉⵜⵜⵓⵙⴰⵡⴰⵍⵏ ⵉ ⵓⵎⵓⵖ ⵏ ⵉⵥⵕⵉ",
      developed_by: "ⵜⵓⵔⴰⵜ ⵉⵜⵜⵓⵙⵏⴼⵍ ⵙ ⵜⵎⴷⵔⴰⵡⵜ ⴷ:",
      version_info: "ⵍⵇⵎ 1.0.0 · ⵉⵜⵜⵓⵙⴽⴰⵔ ⵙ ⵜⴰⵢⵔⵉ ❤️ ⴳ ⵍⵎⵖⵔⵉⴱ",
      select_language: "ⴼⵔⵏ ⵜⵓⵜⵍⴰⵢⵜ",
      done: "ⵉⵜⵜⵓⵙⴽⴰⵔ"
    },
    challenges: {
      leaderboard: "ⵜⴰⴼⵍⵡⵉⵜ ⵏ ⵉⵎⵣⵡⵓⵔⴰ",
      rewards_tab: "ⵜⵉⵔⵔⴰⵣⵉⵏ",
      challenges_rewards_title: "ⵉⵙⴼⴽⴰ ⴷ ⵜⵉⵔⵔⴰⵣⵉⵏ",
      unlocked_rewards: "ⵜⵉⵔⵔⴰⵣⵉⵏ ⵉⵜⵜⵓⵕⵥⵎⵏ",
      valid_until_dec: "ⵉⵖⵥⴰⵏ ⴰⵔ ⴷⵓⵊⴰⵏⴱⵉⵔ 2024",
      exclusive_video: "ⴰⴼⵉⴷⵢⵓ ⵏ ⵓⵣⵍⵍⵉⵊ ⵉⵥⵍⵉⵏ",
      behind_scenes: "ⴷⴼⴼⵉⵔ ⵉⴳⵓⴷⴰⵔ ⴷ ⵉⵎⵓⵙⵏⴰⵡⵏ ⵉⵎⵇⵇⵔⴰⵏⵏ",
      points_suffix: "ⵜⵉⵇⵇⵉⵜⵉⵏ"
    }
  }
};

['en', 'ar', 'fr', 'tzm'].forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.settings) data.settings = {};
  if (!data.challenges) data.challenges = {};
  
  Object.assign(data.settings, newKeys[lang].settings);
  Object.assign(data.challenges, newKeys[lang].challenges);
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`Updated settings and challenges in ${lang}.json`);
});
