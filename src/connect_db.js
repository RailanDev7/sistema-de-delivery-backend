
import mysql2 from "mysql2";
import dotenv from 'dotenv';
dotenv.config()
const conexao = mysql2.createConnection({
   host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})

conexao.connect((err, ok)=>{
    if(err){
        console.log("Erro ao conectar no banco")
    }if(ok){
        console.log("Conectado ao banco com sucesso")
    }
})

export default conexao;