import express from "express";
import bcrypt from "bcrypt"
import conexao from '../connect_db.js';
const router = express.Router();


router.post("/register", async (req, res) => {
    try {
        const { nome, email, password } = req.body;
        const hash = await bcrypt.hash(password, 12);

        const sql = "INSERT INTO usuarios (user_name, user_email, user_password) VALUES (?, ?, ?)";
        conexao.query(sql, [nome, email, hash], (err) => {
            if (err) {
                return res.status(400).json({ error: "error when creating account!" });
            }
            return res.status(200).json({ message: "account created successfully!" });
        });
    } catch (error) {
        console.log("Erro no servidor");
        console.log(error);
    }
});
export default router;