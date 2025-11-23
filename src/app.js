import express from "express"
import auth_users from "../src/routes/routes_auth.js";
const PORT = 3000
const app = express();
app.use(express.json());


app.use("/users", auth_users)




app.listen(PORT, () =>{
    console.log("Server running")
})