var mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const mongoDBURL = "mongodb://db:27017/atv8";
mongoose.connect(mongoDBURL, {useNewUrlParser: true});

var db = mongoose.connection;

db.on('connected', () => {
    console.info("Mongo db conectado!");
});

db.on('disconnected', () => {
    console.warn("Mongo db disconectado!");
});

db.on('error', (err) => {
    console.error(`Mongo erro: ${err}`);
});

module.exports = {MongoConn: db};