import express from "express";
import bcrypt from "bcrypt"
import conexao from '../connect_db.js';
import authenticateToken from "../middleware/mid_auth.js";
import jsonwebtoken from 'jsonwebtoken';
const router = express.Router();


router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hash = await bcrypt.hash(password, 12);

        const sql = "INSERT INTO usuarios (user_name, user_email, user_password) VALUES (?, ?, ?)";
        conexao.query(sql, [name, email, hash], (err) => {
            if (err) {
                return res.status(400).json({ error: "error when creating account!" });
            }
            return res.status(200).json({ message: "account created successfully!" });
        });
    } catch (error) {
        console.log("server error!");
        console.log(error);
    }
})
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM usuarios WHERE user_email = ?"
    conexao.query(sql, [email], async (err, result) => {
        if (err) {
            return res.status(401).json({ message: "server error!" })
        } if (result.length === 0) {
            return res.status(400).json({ message: "Incorrect username or password!" })
        } const user = result[0]
        const ok = await bcrypt.compare(password, user.user_password)

        if (!ok) {
            return res.status(401).json({ message: "Incorrect username or password!" })
        }const token = jsonwebtoken.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
         return res.status(200).json({ message: "successfully logged in!", token })

    })

});
export default router;