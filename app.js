const express = require("express");
const app = express();

const bodyparser = require("body-parser");
const path = require("path");

app.listen(3000, () => {
    console.log("Servidor rodando");
});

//Body Parser
app.set("view-engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, "public")));
//

app.get('/', function(req, res) {
    res.render('index', {})
})