import express from "express"
import conexao from "../connect_db.js";

const rst = express.Router();


rst.get("/restaurantes", async (req, res) =>{
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

rst.post("/cardapio", (req, res) => {
    const { nome_produto} = req.body;
    const sql = "SELECT id, nome, preco, descricao FROM produtos WHERE nome = ?"
    conexao.query(sql, [nome_produto], (err, result) => {
        if(err){
            return res.status(401).json({ Message: "Erro no banco"})
        }
        if(result.length === 0){
            return res.status(400).json({ Message: "Produto não disponível"})
        }
        const produtosIDN = result.map(rest =>({
            id: rest.id,
            nome: rest.nome,
            preco: rest.preco,
            descricao: rest.descricao,
            id_restaurante: rest.id_restaurante
        }))
        return res.status(200).json(produtosIDN)
        
    })

})

export default rst