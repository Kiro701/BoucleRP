//JavaScript
var family = new FamilyTree(document.getElementById("tree"), {
    template: "john",
    mouseScrool: FamilyTree.action.zoom,
    mode: "dark",
    editForm: {readOnly: true},
    nodeBinding: {
        field_0: "name",   // Nom affiché
        field_1: "title",  // Texte secondaire (année)
        img_0: "img",       // Champ image pour template "john"
        class: function(node) {
            // appliquer une classe spéciale pour Valéria seulement
            if(node.id === 3) return "ex-partner"; 
            return "";
        }
    }
});
family.on('render-link', function (sender, args) {
    var cnodeData = family.get(args.cnode.id);
    var nodeData = family.get(args.node.id);
    if (cnodeData.divorced != undefined && nodeData.divorced != undefined &&
        cnodeData.divorced.includes(args.node.id) && nodeData.divorced.includes(args.cnode.id)) {
        console.log(args.html);
        args.html = args.html.replace("path", "path stroke-dasharray='3, 2'");
    }
});
family.load([
    // 1ème Génération
    { id: 20, name: "Zestial Hamilton", gender: "male", img: "https://cdn.discordapp.com/guilds/1025887285461405817/users/135511703990304768/avatars/4117bcdedc094c755b25992bbecef662.webp?size=1024"},
    // 2ème Génération
    { id: 12,fid: 20, mid: null, pids: [13], divorced: [13], name: "Aka Hamilton", gender: "female", img: "https://cdn.discordapp.com/avatars/719519699716538389/2d4950f645b46d7c8000ca321fa3f8c5.webp?size=1024"},
    { id: 13, pids: [12], divorced: [12], name: "Joseph Wilford", gender: "male", img: "https://cdn.discordapp.com/guilds/1025887285461405817/users/1124522983294238821/avatars/f241156a67afe7c026a26f78cc6a74f4.webp?size=1024"},
    { id: 21, fid: 20, name: "Xeptio Hamilton", gender: "male", img: "https://cdn.discordapp.com/avatars/477440805343330312/4626b02bd0268d7c08e08cbd5f5e2116.webp?size=1024"},
    { id: 22, pids: [23], fid: 20, name: "Kaz Hamilton", gender: "male", img: "https://cdn.discordapp.com/avatars/946068504023556186/2f20ee53725638548a2b0a19218408aa.webp?size=1024"},
    { id: 23, pids: [22], name: "Mai Hamilton", gender: "female", img: "https://media.discordapp.net/attachments/1452446703427915797/1452449796399829135/b674a98d6dcd741b7d04c7c381cec74e.jpg?ex=6964e188&is=69639008&hm=b32bce755a214717ebeda66277cbb330ef9e5de791ba6500e554315678c58944&=&format=webp"},
    { id: 25, fid: 20, pids: [26], name: "Angelo Hamilton", gender: "male", img: "https://cdn.discordapp.com/guilds/1025887285461405817/users/736662177481752607/avatars/1a57c719a3162f8f9d9cab50e06b9a33.webp?size=1024"},
    { id: 26, pids: [25], name: "Chara Hamilton", gender: "male", img: "https://cdn.discordapp.com/guilds/1025887285461405817/users/451426602287366174/avatars/b000cf29966d6e99b81322af3e62bc00.webp?size=1024"},
    // 3ème Génération
    { id: 1, mid: 12, fid: 13, pids: [2, 8], divorced: [8], name: "Mr Vox Hamilton", gender: "male", img: "https://cdn.discordapp.com/guilds/1025887285461405817/users/599130976806764545/avatars/07ad6a97eaf080066ec1afb397b83a51.webp" },
    { id: 2, pids: [1], name: "Kokoro Hamilton", gender: "male", img: "https://cdn.discordapp.com/guilds/1025887285461405817/users/699723182793424927/avatars/3560e8f1a503a9a19e6028aced998d68.webp" },
    { id: 8, pids: [1], divorced: [1] , name: "Valéria Hamilton", gender: "female", img: "public/Image/Profil-Neutre.avif"},
    { id: 14, mid: 12, fid: 13, name: "Aria Hamilton", gender: "female", img: "https://cdn.discordapp.com/guilds/1025887285461405817/users/1093534349896462476/avatars/5b3b852f7114fca17b48a56219213397.webp?size=1024" },
    { id: 15, pids:[17], divorced: [17], mid: 12, fid: 13, name: "Minki Hamilton", gender: "female", img: "https://cdn.discordapp.com/avatars/1211403503713394762/e68f584c89cabfc147e6e6a62e4ba61f.webp?size=1024" },
    { id: 17, pids:[15], divorced: [15], name: "Darkrise Hamilton", gender: "male", img: "public/Image/Profil-Neutre.avif"},
    { id: 18, mid: 12, fid: 13, name: "Awwax Hamilton", gender: "male", img: "https://cdn.discordapp.com/avatars/1248946274259042345/65a8188a80344904becd9fcac9185dc6.webp?size=1024"},
    { id: 24, mid: 23, fid: 22, name: "Mazda Hamilton", gender: "male", img: "https://cdn.discordapp.com/avatars/1350479159092187237/afa07f943d07ede09f5334034af8b0db.webp?size=1024"},
    { id: 27, mid: 25, fid: 26, name: "Rayla Hamilton", gender: "non-binary", img: "https://cdn.discordapp.com/avatars/1168134288294809631/da08323d0c46a2472ca94509d6aaa2bd.webp?size=1024"},
    { id: 28, mid: 25, fid: 26, name: "Emilie Hamilton", gender: "female", img: "https://cdn.discordapp.com/avatars/313713012408057856/d4eb2dcc9f824738cfd61e042844990c.webp?size=1024"},
    { id: 29, mid: 25, fid: 26, name: "Byoga Hamilton", gender: "female", img: "https://cdn.discordapp.com/avatars/1394111080212594700/cb894eb4c723968980274af2652af706.webp?size=1024"},
    // 4ème Génération
    { id: 3, mid: 1, fid: 2, name: "Kiro Hamilton", gender: "male", img: "https://cdn.discordapp.com/avatars/902870493550485504/70f002fe5d0c0ce324482d052ef1ad4f.webp" },
    { id: 4, mid: 1, fid: 2, name: "Velvette Hamilton", gender: "female", img: "https://cdn.discordapp.com/avatars/1254016482409582602/e4065c760b3c4d7b2c045b021c6face6.webp" },
    { id: 5, mid: 1, fid: 2, name: "Mimibi Hamilton", gender: "female", img: "https://cdn.discordapp.com/avatars/873570789675397120/70484f7b4399d9104e94080409f2e893.webp" },
    { id: 6, mid: 1, fid: 2, name: "Gaya Hamilton", gender: "female", img: "https://cdn.discordapp.com/avatars/1286974825964769362/e6b77779bc0f50dd3e563ba22c2ee7f1.webp" },
    { id: 7, mid: 1, fid: 2, name: "Louna Hamilton", gender: "male", img: "https://cdn.discordapp.com/guilds/1025887285461405817/users/947833377896149032/avatars/a_08ac97542009d2c0368a9fac245fac26.gif?size=1024&animated=true" },
    { id: 9, mid: 8, fid: 1, name: "Powder Hamilton", gender: "female", img: "https://cdn.discordapp.com/avatars/784766226324127746/63c5b15ddda8b24f2c0c5b1cbd3de629.webp?size=1024"},
    { id: 10, mid: 8, fid: 1, name: "Agent Nesquik Hamilton", gender: "male", img: "https://cdn.discordapp.com/guilds/1025887285461405817/users/1200313720195264613/avatars/07aaee22ee1a29abc30323e3b326663f.webp?size=1024"},
    { id: 11, mid : 8, fid: 1, name: "Meg Hamilton", gender: "male", img: "https://cdn.discordapp.com/avatars/1037398509030219868/948820180a7c9e989255e2cbc95dd701.webp?size=1024"},
    { id: 16, pids: [19], mid : 15, fid: 17, name: "Hugo Hamilton", gender: "male", img: "https://cdn.discordapp.com/avatars/995281733232627752/c127b7ac185664c56751e1b54e67b73f.webp?size=1024"},
    { id: 19, pids: [16], name: "Browy Hamilton", gender: "female", img: "https://cdn.discordapp.com/avatars/1266443779892842597/d74259db4228df28fcc23b5b52b35423.webp?size=1024"},
    { id: 30, mid: 19, fid: 16, name: "Angie Hamilton", gender: "male", img: "https://cdn.discordapp.com/avatars/1009945595559034950/f0dabe08e5ba281b081aa31e5d360920.webp?size=1024"}

])