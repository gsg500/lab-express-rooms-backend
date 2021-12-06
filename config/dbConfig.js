const mongoose = require("mongoose");
const MONGODB_URI = `mongodb://localhost:27000/room-app`;

const connPromise = mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connObj) =>
    console.log(`Conectado com banco de dados ${connObj.connections[0].name}`)
  )
  .catch((err) => console.log("Erro de conexão", err));

module.exports = connPromise;