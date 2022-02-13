var express = require("express")
var http  = require("http")
const session = require('express-session'); //To store the session variables
const bcryptjs = require('bcryptjs')
const bodyParser = require("body-parser")
const MongoClient = require("mongodb").MongoClient
const socket = require("socket.io"); //TODO: implement socket.io cause it's cool and I like it.


var url = "mongodb://192.168.100.192:27017/escull_aventura";
const app = express()
//---All modules used by express and express-session
app.use(express.json())
app.use('/resources', express.static('public'))
app.use( express.static(__dirname + '/public'))
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({extended:false}))
//*** For express-session ***//
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge: 36000000,
        httpOnly: false, // <- set httpOnly to false
        secure:false
    }
  }))

app.get('/', (req,res) =>{
    res.render("inici.ejs")
})

app.get('/joc', (req,res) =>{
    res.render("main.ejs")
})

app.get('/api', (req,res) =>{
    res.send('Working.')
})

app.post('/api', (req,res) =>{
    const lvl = req.body.lvl
    const option = req.body.val
    if(lvl == 1){
        if(option == 'op_1'){
            res.send({text:"Exit! Has aconseguit passar al seguent nivell. El LLeó mor i la historia segueix normalment.", title:"Escull la teva aventura | 1", status:true, case:"exit",lvl:2})
        }
        else if(option == 'op_2'){
            res.send({text:"El te que el Gregor li porta al Lleó, se'l beu la Júlia. Quan la Júlia es mor, el Lleó cau en depressió i s'acaba suicidant. Final fatídic. ", title:"Escull la teva aventura | 1", status:true, case:"fallo"})
        }
        else{
            res.send({text:"Error! Alguna cosa no ha anat bé. Torna-ho a provar.", title:"Escull la teva aventura | Error", status:false, case:"error"})
        }
    }
    else{
        res.send({text:"Error", title:"Error", status:true, case:"error"})
    }
})
app.post("/seg", (req,res)=>{
    const lvl = req.body.lvl
    if(lvl == 1){
            res.send({lvl:1,text:"Molt bé, començem. A l'inici de la historia, el Lleó, l'avi de la Júlia, es mor. Creus que es el camí correcte o tu ho faries diferent?", title:"Escull la teva aventura | 1", op_1:"El Lleó es mor", op_2:"El Lleó no es mor", op1_val:'{"lvl":1, "val":"op_1"}', op2_val:'{"lvl":1, "val":"op_2"}',opnum:2})
    }
    if(lvl == 2){
        res.send({lvl:2,text:"El Lleó mor el dia que la Júlia fa 18 anys, com creus que ha mort el Lleó?", op_1:"Ha mort de vell.", op_2:"Ha mort asassinat per algú.", op_3:"Ha mort per una sobredosis", title:"Escull la teva aventura | 2", opnum:3, op1_val:'{"lvl":2, "val":"op_1"}',op2_val:'{"lvl":2, "val":"op_2"}', op3_val:'{"lvl":2, "val":"op_3"}'})
    }
})
app.post("/users", (req,res)=>{
    const user_id = req.body.uid
    const existent = req.body.existent
    const update = req.body.update
    if(existent){
    MongoClient.connect(url, function(err, db){
        if (err) throw err;
        var dbo = db.db("escull_aventura");
        dbo.collection("users").findOne({"uid":user_id}, function(err, result){
            if (err) throw err;
            console.log(result)
            res.send(result)
        })
    })
}
    else{
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("escull_aventura");
            var newuser = {"uid":user_id, "lvl":1};
            dbo.collection("users").insertOne(newuser, function(err, result) {
              if (err) throw err;
              var response = {result, user_id}
              res.send(response)
              console.log(result)
            });
          }); 
    }
    if(update){
        const user_level = req.body.lvl
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("escull_aventura");
            var uid = {"uid":user_id};
            var updateLevel = {$set: {lvl:user_level}}
            dbo.collection("users").updateOne(uid, updateLevel, function(err, result) {
              if (err) throw err;
              console.log(result)
            });
          }); 
    }

})

http.createServer(app).listen(8090);