const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const maquinaRoutes = require("./routes/maquinas.js");
const ordemRoutes = require("./routes/ordemServico.js");
const usuarioRoutes = require("./routes/usuario.js");
const app = express();
const porta = process.env.PORT || 10000;
app.use(
    cors({
        origin: "https://monitoramento-maquinas-frontend.vercel.app" || "http://localhost:5173",
        methods: "GET, PUT, DELETE, POST",
        credentials: true,
    })
);
app.use(express.json());
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((err) => console.error("Erro ao conectar:", err));
app.use("/api/maquinas", maquinaRoutes);
app.use("/api/ordens", ordemRoutes);
app.use("/api/usuario", usuarioRoutes);
app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});



