const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models/index');
const dotenv = require('dotenv').config();
const routesUsuario = require('./routes/usuario');
const routesCartas = require('./routes/cards');
const routesJugadas = require('./routes/jugadas');

app.use(express.json());
app.use(cors());

(async () => {
    await db.sequelize.sync();
})();

app.use('/usuarios', routesUsuario);
app.use('/cartas', routesCartas);
app.use('/jugadas', routesJugadas);


const PORT = process.env.PORT || 4000; 

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});