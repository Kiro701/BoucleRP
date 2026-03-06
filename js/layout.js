document.addEventListener("DOMContentLoaded", async () => {

  // Base automatique du site (fonctionne en local ET GitHub Pages)
  const BASE_PATH = document.querySelector("base")?.href || "/";

  // Header
  const headerRes = await fetch(BASE_PATH + "includes/header.html");
  const headerData = await headerRes.text();
  document.getElementById("header").innerHTML = headerData;

  // Footer
  const footerRes = await fetch(BASE_PATH + "includes/footer.html");
  const footerData = await footerRes.text();
  document.getElementById("footer").innerHTML = footerData;

  // Traduction
  if (typeof changeLanguage === "function") {
    const savedLang = localStorage.getItem('preferredLang') || navigator.language.slice(0, 2);
    const params = new URLSearchParams(window.location.search);
    const finalLang = params.get('lang') || savedLang;
    changeLanguage(finalLang);
  }

});