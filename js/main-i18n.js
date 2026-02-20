function changeLanguage(lang) {
        if (!translations[lang]) lang = 'fr';
        document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.getAttribute('data-i18n');
          if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
          }
        });
        document.documentElement.lang = lang;
        localStorage.setItem('preferredLang', lang);
      }

      window.addEventListener('DOMContentLoaded', () => {
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get('lang');
        const savedLang = localStorage.getItem('preferredLang');
        const finalLang = urlLang || savedLang || navigator.language.slice(0, 2);
        changeLanguage(finalLang);
      });