import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(XHR)
  .use(LanguageDetector) // 偵測瀏覽器語系
  .init({
    fallbackLng: 'zh', // 未偵測到時的後備語系
    ns: ['translates'], // 語系的 loading namespace 如語系檔案名稱 translates.js
    defaultNS: 'translates', // 預設的 namespace name
    debug: false,
    interpolation: {
      escapeValue: false // not needed for react!!
    },
    backend: {
    // 設定語系檔案的 server 路徑, 會以GET的方式跟 server 要檔案
    // lng = 語系代碼 ns = namespace
    "loadPath": "/locales/{{lng}}/{{ns}}.json"
    }
  });

export default i18n;