const express = require('express');
const entreprise=require('./routes/entreprise');
const categorie=require('./routes/categorie');
const choix=require('./routes/choix');
const question=require('./routes/question');
const diagnostic=require('./routes/diagnostique');
const authRoutes=require('./routes/auth');
const reponse=require('./routes/reponse');

const port =3000;
const cors=require("cors");
const app = express();
const mongoose=require('mongoose');
var corsoptions={
    methode:["GET","POST","PUT","DELETE","PATCH"]
}
app.use(cors(corsoptions));
app.use(express.json());
app.use(entreprise);
app.use(categorie);
app.use(choix);
app.use(diagnostic);
app.use('/auth', authRoutes);
app.use('/question', question);
app.use(reponse);

app.listen(port,()=>{console.log("bonjour depuis le serveur "+ port)});
mongoose.connect('mongodb+srv://saadia:saadia2002@cluster0.rztoahe.mongodb.net/serviceMedicale?retryWrites=true&w=majority',{  useNewUrlParser: true,
useUnifiedTopology: true,}).then(result=>{
    console.log('hi saadadati');
    app.listen(9000);
}).catch(err=>{
    console.log(err);
});