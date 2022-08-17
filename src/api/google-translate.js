import api from "@/api";

const API_KEY = "AIzaSyB96Y9F_bPaE1XI2J_Msb-xDC_RDBXQ8OA";

export const translate = async (text, lang) => {
  return "hint";
  try {
    const response = await api.post(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      { q: text, target: lang }
    );
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    throw error.response;
  }
};
