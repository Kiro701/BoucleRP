document.addEventListener("DOMContentLoaded", async () => {
  // 1. On charge le Header et on attend qu'il soit fini (await)
  const headerRes = await fetch("includes/header.html");
  const headerData = await headerRes.text();
  document.getElementById("header").innerHTML = headerData;

  // 2. On charge le Footer et on attend (await)
  const footerRes = await fetch("https://kiro701.github.io/BoucleRP/includes/footer.html");
  const footerData = await footerRes.text();
  document.getElementById("footer").innerHTML = footerData;

  // 3. SEULEMENT MAINTENANT, on lance la traduction
  // On vérifie si la fonction existe pour éviter les erreurs
  if (typeof changeLanguage === "function") {
    const savedLang = localStorage.getItem('preferredLang') || navigator.language.slice(0, 2);
    const params = new URLSearchParams(window.location.search);
    const finalLang = params.get('lang') || savedLang;
    
    changeLanguage(finalLang);
  }
});