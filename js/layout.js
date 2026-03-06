document.addEventListener("DOMContentLoaded", async () => {

  // Détection automatique du chemin de base
  const pathParts = window.location.pathname.split("/").filter(Boolean);

  let BASE_PATH = "/";

  // Si on est sur GitHub Pages avec un repo
  if (location.hostname.includes("github.io")) {
    if (pathParts.length > 0) {
      BASE_PATH = "/" + pathParts[0] + "/";
    }
  }

  // Chargement Header
  const headerRes = await fetch(BASE_PATH + "includes/header.html");
  const headerData = await headerRes.text();
  document.getElementById("header").innerHTML = headerData;

  // Chargement Footer
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