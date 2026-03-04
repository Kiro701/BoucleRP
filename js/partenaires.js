document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("partenaires-container");

    partenaires.forEach(partenaire => {

        let liensHTML = "";

        partenaire.liens.forEach(lien => {
            liensHTML += `
                <a href="${lien.url}" class="link-button" target="_blank">
                    <img src="${lien.icon}" alt="${lien.type}">
                </a>
            `;
        });

        const card = document.createElement("div");
        card.classList.add("partenaires-grid");

        card.innerHTML = `
            <div>
                <img src="${partenaire.image}" alt="${partenaire.nom}">
                <div class="desc-grid">
                    <h3>${partenaire.nom}</h3>
                    <p>${partenaire.description}</p>
                    <div class="partenaire-link">
                        ${liensHTML}
                    </div>
                </div>
            </div>
        `;

        container.appendChild(card);
    });

});
