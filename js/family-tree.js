/* ================================
    Template
================================ */
FamilyTree.templates.kiro = Object.assign({}, FamilyTree.templates.base);
FamilyTree.templates.kiro.defs = `<style>
                                    .{randId} .bft-edit-form-header, .{randId} .bft-img-button{
                                        background-color: #aeaeae;
                                    }
                                    .{randId}.male .bft-edit-form-header, .{randId}.male .bft-img-button{
                                        background-color: #039BE5;
                                    }        
                                    .{randId}.male div.bft-img-button:hover{
                                        background-color: #F57C00;
                                    }
                                    .{randId}.female .bft-edit-form-header, .{randId}.female .bft-img-button{
                                        background-color: #F57C00;
                                    }        
                                    .{randId}.female div.bft-img-button:hover{
                                        background-color: #039BE5;
                                    }
                                    .{randId}.nonbinary .bft-edit-form-header,
                                    .{randId}.nonbinary .bft-img-button{
                                        background-color: #FFD700;
                                    }
                                    .{randId}.nonbinary div.bft-img-button:hover{
                                        background-color: #aeaeae;
                                    }

                                </style>
                                <clipPath id="kiro_img_0"><rect x="6" y="6" rx="54" ry="54" width="108" height="108"></rect></clipPath>
                                ${FamilyTree.gradientCircleForDefs('circle', '#aeaeae', 60, 5)}
                                ${FamilyTree.gradientCircleForDefs('male_circle', '#039BE5', 60, 5)}
                                ${FamilyTree.gradientCircleForDefs('female_circle', '#F57C00', 60, 5)}
                                ${FamilyTree.gradientCircleForDefs('nonbinary_circle', '#FFD700', 60, 5)}
`;
FamilyTree.templates.kiro.field_0 = 
    '<text ' + FamilyTree.attr.width + ' ="230" style="font-size: 16px;font-weight:bold;" fill="#aeaeae" x="60" y="135" text-anchor="middle">{val}</text>';
FamilyTree.templates.kiro.field_1 = 
    '<text ' + FamilyTree.attr.width + ' ="150" style="font-size: 13px;" fill="#aeaeae" x="60" y="150" text-anchor="middle">{val}</text>';
FamilyTree.templates.kiro.node = '<use x="0" y="0" xlink:href="#circle" />';
FamilyTree.templates.kiro.img_0 = 
    '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#kiro_img_0)" xlink:href="{val}" x="6" y="6" width="108" height="108"></image>';
FamilyTree.templates.kiro.ripple = {
    radius: 60,
    color: "#e6e6e6",
    rect: null
};

FamilyTree.templates.kiro.size = [120, 120]
FamilyTree.templates.kiro_male = Object.assign({}, FamilyTree.templates.kiro);
FamilyTree.templates.kiro_male.node += '<use x="0" y="0" xlink:href="#male_circle" />';
FamilyTree.templates.kiro_male.ripple = {
    radius: 60,
    color: "#039BE5",
    rect: null
};
FamilyTree.templates.kiro_female = Object.assign({}, FamilyTree.templates.kiro);
FamilyTree.templates.kiro_female.node += '<use x="0" y="0" xlink:href="#female_circle" />';
FamilyTree.templates.kiro_female.ripple = {
    radius: 60,
    color: "#F57C00",
    rect: null
};
FamilyTree.templates.kiro_nonbinary = Object.assign({}, FamilyTree.templates.kiro);

FamilyTree.templates.kiro_nonbinary.node += '<use x="0" y="0" xlink:href="#nonbinary_circle" />';
FamilyTree.templates.kiro_nonbinary.ripple = {
    radius: 60,
    color: "#FFD700",
    rect: null
};

FamilyTree.templates.kiro.nodeMenuButton = `<use ${FamilyTree.attr.control_node_menu_id}="{id}" x="90" y="50" xlink:href="#base_node_menu" />`;
//JavaScript
var family = new FamilyTree(document.getElementById("tree"), {
    template: "kiro",
    mouseScroll: FamilyTree.action.zoom,
    mode: "dark",
    editForm: {readOnly: true},
    menu: {
        pdf: { text: "Export PDF" },
        png: { text: "Export PNG" },
        svg: { text: "Export SVG" },
        xml: { text: "Export XML" },
    },
    tags: {
        male: { template: "kiro_male" },
        female: { template: "kiro_female" },
        nonbinary: { template: "kiro_nonbinary" }
    },
    nodeBinding: {
        field_0: "name",  // Texte secondaire (année)
        img_0: "img",       // Champ image pour template "john"
    },  
    nodeMouseDoubleClick: function (sender, args) {
        showModal(sender.get(args.node.id));
    }
});

/* ================================
    I18N
================================ */

const i18n = {
    fr: {
        name: "Nom",
        discord: "Pseudo Discord",
        birthday: "Date de naissance",
        role: "Rôle RP",
        socials: "Réseaux",
        gender: "Genre",
        notAvailable: "Non renseigné",
        male: "Homme",
        female: "Femme",
        "non-binary": "Non-binaire"
    }
};

const LANG = "fr";
const T = i18n[LANG];

/* ================================
   POPUP
================================ */
function showModal(member) {

  const genderLabel =
    member.gender === "male" ? T.male :
    member.gender === "female" ? T.female :
    member.gender === "non-binary" ? T["non-binary"] :
    T.notAvailable;

  let divorcedNames = T.notAvailable;
  if (member.divorced?.length) {
    divorcedNames = member.divorced.map(id => {
      const ex = family.get(id);
      return ex ? ex.name : "Unknown";
    }).join("<br>");
  }

  document.getElementById("modal-body").innerHTML = `
    <div style="text-align:center;">
      <img src="${member.img}" style="width:110px;height:110px;border-radius:50%;border:3px solid #ff2d2d;margin-bottom:12px;">
    </div>

    <p><strong>${T.name} :</strong> ${member.name}</p>
    <p><strong>${T.discord} :</strong> ${member.discord || T.notAvailable}</p>
    <p><strong>${T.role} :</strong> ${member.role || T.notAvailable}</p>
    <p><strong>${T.gender} :</strong> ${genderLabel}</p>
    <p><strong>${T.socials} :</strong><br>${member.social?.join("<br>") || T.notAvailable}</p>
    <p><strong>Ex :</strong><br>${divorcedNames}</p>
  `;

  document.getElementById("modal").style.display = "flex";
}


/* ================================
    Divorce lines
================================ */
family.on('render-link', function (sender, args) {
    var cnodeData = family.get(args.cnode.id);
    var nodeData = family.get(args.node.id);
    if (cnodeData.divorced != undefined && nodeData.divorced != undefined &&
        cnodeData.divorced.includes(args.node.id) && nodeData.divorced.includes(args.cnode.id)) {
        console.log(args.html);
        args.html = args.html.replace("path", "path stroke-dasharray='3, 2'");
    }
});
/* ================================
   Loading Data
================================ */

// Charger le JSON externe
fetch("member-family.json")
  .then(res => res.json())
  .then(async members => {
    // Si tu utilises Discord avatars via discordId
    await resolveAvatars(members);

    // Charger les membres dans FamilyTree
    family.load(members);
  })
  .catch(err => console.error("Erreur en chargeant members:", err));



async function resolveAvatars(nodes) {
  for (let node of nodes) {
    if (!node.discordId) continue; // seulement ceux avec discordId

    try {
      const res = await fetch(
        `https://divine-moon-e24f.ptitleo2009.workers.dev/?id=${node.discordId}&guild=1025887285461405817`
      );
      const data = await res.json();
      node.img = data.avatar;
    } catch {
      node.img = "https://kiro701.github.io/BoucleRP/Image/Profil-Neutre.avif";
    }
  }
}

