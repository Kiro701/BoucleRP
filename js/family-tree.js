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
FamilyTree.templates.kiro.img = `
  <img src="{val}" crossOrigin="anonymous">
`;

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
    mouseScrool: FamilyTree.action.zoom,
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
function showModal(node) {
    document.getElementById("modal-body").innerHTML = `
        <div style="text-align:center;">
            <img src="${node.img || 'Image/Profil-Neutre.avif'}"
                 style="width:100px;height:100px;border-radius:50%;
                        border:3px solid ${genderColor(node.gender)};
                        box-shadow:0 0 12px ${genderColor(node.gender)};
                        margin-bottom:10px;"
                 onerror="this.src='Image/Profil-Neutre.avif'">
        </div>

        <p><strong>${T.name} :</strong> ${node.name}</p>
        <p><strong>${T.gender} :</strong> ${T[node.gender] || T.notAvailable}</p>
        <p><strong>${T.discord} :</strong> ${node.discord || T.notAvailable}</p>
        <p><strong>${T.birthday} :</strong> ${node.birthday || T.notAvailable}</p>
        <p><strong>${T.role} :</strong> ${node.role || T.notAvailable}</p>
        <p><strong>${T.socials} :</strong><br>${node.socials?.join("<br>") || T.notAvailable}</p>
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

family.load([
    // 1ème Génération
    { id: 20, pids:[32], divorced: [32], name: "Zestial Hamilton", gender: "male", img: "https://cdn.discordapp.com/guilds/1025887285461405817/users/135511703990304768/avatars/4117bcdedc094c755b25992bbecef662.webp?size=1024"},
    { id: 32, pids:[20], divorced: [20], name: "Coccinelle Hamilton", gender: "female", img: "https://cdn.discordapp.com/avatars/728622392456249375/4595010d42cc7c5b45ba033928d0e45c.webp?size=1024"},
    // 2ème Génération
    { id: 12,fid: 20, mid: 32, pids: [13], divorced: [13], name: "Aka Hamilton", gender: "female", img: "https://cdn.discordapp.com/avatars/719519699716538389/2d4950f645b46d7c8000ca321fa3f8c5.webp?size=1024"},
    { id: 13, pids: [12], divorced: [12], name: "Joseph Wilford", gender: "male", img: "https://cdn.discordapp.com/guilds/1025887285461405817/users/1124522983294238821/avatars/217d997a54f63d9dbb3ca61c6570d858.webp?size=1024"},
    { id: 21, fid: 20, mid: 32, name: "Xeptio Hamilton", gender: "male", img: "https://cdn.discordapp.com/avatars/477440805343330312/4626b02bd0268d7c08e08cbd5f5e2116.webp?size=1024"},
    { id: 22, pids: [23], fid: 20, mid: 32, name: "Kaz Hamilton", gender: "male", img: "https://cdn.discordapp.com/avatars/946068504023556186/2f20ee53725638548a2b0a19218408aa.webp?size=1024"},
    { id: 23, pids: [22], name: "Mai Hamilton", gender: "female", img: "Image/PP/Mai.jpg"},
    { id: 25, fid: 20,mid: 32, pids: [26], name: "Angelo Hamilton", gender: "male", img: "https://cdn.discordapp.com/guilds/1025887285461405817/users/736662177481752607/avatars/1a57c719a3162f8f9d9cab50e06b9a33.webp?size=1024"},
    { id: 26, pids: [25], name: "Chara Hamilton", gender: "male", img: "https://cdn.discordapp.com/guilds/1025887285461405817/users/451426602287366174/avatars/b000cf29966d6e99b81322af3e62bc00.webp?size=1024"},
    // 3ème Génération
    { id: 1, mid: 12, fid: 13, pids: [2, 8], divorced: [8], name: "Mr Vox Hamilton", gender: "male", img: "https://cdn.discordapp.com/guilds/1025887285461405817/users/599130976806764545/avatars/81af776ced0427c0fcb0614a58af5cd0.webp?size=1024" },
    { id: 2, pids: [1], name: "Kokoro Hamilton", gender: "male", img: "https://cdn.discordapp.com/guilds/1025887285461405817/users/699723182793424927/avatars/e4d4e1c68507b74e4afd41db51879b91.webp?size=1024" },
    { id: 8, pids: [1], divorced: [1] , name: "Valéria Hamilton", gender: "female", img: "https://kiro701.github.io/HMC-Site/Image/Profil-Neutre.avif"},
    { id: 14, mid: 12, fid: 13, name: "Aria Hamilton", gender: "female", img: "https://cdn.discordapp.com/guilds/1025887285461405817/users/1093534349896462476/avatars/5b3b852f7114fca17b48a56219213397.webp?size=1024" },
    { id: 15, pids:[17], mid: 12, fid: 13, name: "Minki Hamilton", gender: "female", img: "https://kiro701.github.io/HMC-Site/Image/PP/Minki.jpg" },
    { id: 17, pids:[15], name: "Darkrise Hamilton", gender: "male", img: "https://kiro701.github.io/HMC-Site/Image/PP/Darkrise.jpg"},
    { id: 18, mid: 12, fid: 13, name: "Awwax Hamilton", gender: "male", img: "https://cdn.discordapp.com/avatars/1248946274259042345/65a8188a80344904becd9fcac9185dc6.webp?size=1024"},
    { id: 24, mid: 23, fid: 22, name: "Boopi Hamilton", gender: "male", Discord: "boopi", img: "https://cdn.discordapp.com/avatars/1350479159092187237/afa07f943d07ede09f5334034af8b0db.webp?size=1024"},
    { id: 27, mid: 25, fid: 26, name: "Rayla Hamilton" ,gender: "non-binary", tags: ["nonbinary"] , img: "https://cdn.discordapp.com/avatars/1168134288294809631/da08323d0c46a2472ca94509d6aaa2bd.webp?size=1024"},
    { id: 28, mid: 25, fid: 26, name: "Emilie Hamilton", gender: "female", img: "https://cdn.discordapp.com/avatars/313713012408057856/d4eb2dcc9f824738cfd61e042844990c.webp?size=1024"},
    { id: 29, mid: 25, fid: 26, name: "Byoga Hamilton", gender: "female", img: "https://cdn.discordapp.com/avatars/1394111080212594700/cb894eb4c723968980274af2652af706.webp?size=1024"},
    // 4ème Génération
    { id: 3, mid: 1, fid: 2, name: "Kiro Hamilton", gender: "male", Discord: "Kiro701 (ptitleo2009)", img: "https://cdn.discordapp.com/avatars/902870493550485504/70f002fe5d0c0ce324482d052ef1ad4f.webp" },
    { id: 4, mid: 1, fid: 2, name: "Velvette Hamilton", gender: "female", img: "https://cdn.discordapp.com/avatars/1254016482409582602/e4065c760b3c4d7b2c045b021c6face6.webp" },
    { id: 5, mid: 1, fid: 2, name: "Mimibi Hamilton", gender: "female", img: "https://cdn.discordapp.com/avatars/873570789675397120/70484f7b4399d9104e94080409f2e893.webp" },
    { id: 6, mid: 1, fid: 2, name: "Gaya Hamilton", gender: "female", img: "https://cdn.discordapp.com/avatars/1286974825964769362/e6b77779bc0f50dd3e563ba22c2ee7f1.webp" },
    { id: 7, mid: 1, fid: 2, name: "Louna Hamilton", gender: "male", img: "https://cdn.discordapp.com/guilds/1025887285461405817/users/947833377896149032/avatars/a_08ac97542009d2c0368a9fac245fac26.gif?size=1024&animated=true" },
    { id: 9, pids: [33],divorced: [33], mid: 8, fid: 1, name: "Powder Hamilton", gender: "female", img: "https://kiro701.github.io/HMC-Site/Image/PP/Powder.jpg"},
    { id: 10, mid: 8, fid: 1, name: "Agent Nesquik Hamilton", gender: "male", img: "https://cdn.discordapp.com/guilds/1025887285461405817/users/1200313720195264613/avatars/07aaee22ee1a29abc30323e3b326663f.webp?size=1024"},
    { id: 11, mid : 8, fid: 1 , name: "Meg Hamilton", gender: "male", img: "https://cdn.discordapp.com/avatars/1037398509030219868/948820180a7c9e989255e2cbc95dd701.webp?size=1024"},
    { id: 16, pids: [19], mid : 15, fid: 17, name: "Hugo Hamilton", gender: "male", img: "https://cdn.discordapp.com/avatars/995281733232627752/c127b7ac185664c56751e1b54e67b73f.webp?size=1024"},
    { id: 19, pids: [16], name: "Browy Hamilton", gender: "female", img: "https://cdn.discordapp.com/avatars/1266443779892842597/d74259db4228df28fcc23b5b52b35423.webp?size=1024"},
    { id: 31, mid: 15,  name: "Artique Hamilton", gender: "female", img: "https://cdn.discordapp.com/avatars/1092869363041828954/450668fd8aab5f8b2eb86cf32355c98d.webp?size=1024"},
    { id: 33, pids: [9], divorced: [9], name: "Arlecchino", gender: "female", img: "https://cdn.discordapp.com/avatars/868257732795465789/be238829a22d6f2a93c17e33c2815fc0.webp?size=1024"},
    // 5ème Génération
    { id: 30, mid: 19, fid: 16, name: "Angie Hamilton", gender: "male", img: "https://cdn.discordapp.com/avatars/1009945595559034950/f0dabe08e5ba281b081aa31e5d360920.webp?size=1024"},
    { id: 34, mid: 9, fid: 33, name: "Carla Hamilton", gender: "female", img: "https://cdn.discordapp.com/avatars/1346991196484145223/19b10aa249769f28680ecaf2e662b436.webp?size=1024"},

])