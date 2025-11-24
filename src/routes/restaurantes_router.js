import express from "express"
import conexao from "../connect_db.js";

const rst = express.Router();


rst.get("/busca", async (req, res) =>{
    try{
        const sql = 'SELECT id, nome, descricao FROM restaurantes';
        conexao.query(sql, (err, result)=>{
            if(err){
                res.status(500).json({ error: "Erro interno no servidor" })
                return
            }
            const restauranteIDN = result.map(rest => ({
                id_restaurante: rest.id,
                nome_restaurante: rest.nome,
                descricao: rest.descricao
            }))
            res.status(200).json(restauranteIDN);
        })
        


    } catch(err){
        console.error(err);
        res.status(500).json({ Message: "Erro ao busca restaurantes"})
    }
})

export default rst