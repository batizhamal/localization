import api from "@/api";

const API_KEY = "AIzaSyCFSmxmoFonpg9zufuK9uiZz44JuFOoR7U";

export const translate = async (text, lang) => {
  try {
    const response = await api.post(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      { q: text, target: lang }
    );
    return response.data.data.translations.map(
      (translation) => translation.translatedText
    );
  } catch (error) {
    throw error.response;
  }
};
