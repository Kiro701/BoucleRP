const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); // permet d'autoriser ton panel

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // pour servir ton site principal

// Endpoint pour sauvegarder les JSON
app.post("/api/save", (req, res) => {
    const { tree, status } = req.body;

    try {
        fs.writeFileSync(path.join(__dirname, "member-family.json"), JSON.stringify(tree, null, 2));
        fs.writeFileSync(path.join(__dirname, "Famille-aide.json"), JSON.stringify(status, null, 2));
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
