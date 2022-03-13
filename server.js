var express = require("express")
var https = require("https")
var fs = require("fs")
var http  = require("http")
const session = require('express-session');//not needed
const bcryptjs = require('bcryptjs')
const bodyParser = require("body-parser")
const MongoClient = require("mongodb").MongoClient
const socket = require("socket.io"); 
const exp = require("constants"); //not needed
const ip6addr = require("ip6addr")



var url = "mongodb://192.168.100.192:27017/escull_aventura";
const app = express()
//---All modules used by express and express-session
app.use(express.json())
app.use('/favicon.ico', express.static(__dirname + '/public/img/favicon.ico'))
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
  function IntTwoChars(i) {
    return (`0${i}`).slice(-2);
    }
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

    var hora = new Date(new Date()-3600*1000*3).toISOString();
    console.log(`\n${ip6addr.parse(req.socket.remoteAddress).toString({format: 'v4'})} at ${hora} -> Recieved answer from client ${lvl}, ${option}`)

    if(lvl == 1){
        if(option == 'op_1'){
            res.send({time:3000,text:"El LLeó mor i la historia segueix normalment.", title:"Escull la teva aventura | 1", status:true, case:"exit",lvl:2})
        }
        else if(option == 'op_2'){
            res.send({time:6000,text:"El te que el Gregor li porta al Lleó, se'l beu la Júlia. Quan la Júlia es mor, el Lleó cau en depressió i s'acaba suicidant.", title:"Escull la teva aventura | 1", status:true, case:"fallo"})
        }
        else{
            res.send({time:0,text:"Error! Alguna cosa no ha anat bé. Torna-ho a provar.", title:"Escull la teva aventura | Error", status:false, case:"error"})
	        }
    }
    else if(lvl == 2 ){
        if(option == 'op_1'){
            res.send({time:15000,text:"El Lleó anava caminant pel carrer, després d'acabar la seva jornada laboral i tancar la rellotjeria. Estava menjant un croissant de xocolata i de cop i volta va començar a tossir i a tossir fins que va caure al terra.", title:"Escull la teva aventura | 2", status:true, case:"exit",lvl:3})
        }
        else if(option == 'op_2'){
            res.send({time:6000,text:"El Gregor li ha donat un té enverinat de part dels fills.", title:"Escull la teva aventura | 2", status:true, case:"fallo"})
        }
        else if(option == 'op_3'){
            res.send({time:3000,text:"El Lleó té...", title:"Escull la teva aventura | 2", status:true, case:"exit",lvl:4})
        }


    }
    else if(lvl == 3 ){
        if(option == 'op_1' && req.body.lvl2 == 1){
            res.send({time:24000,text:"Al posar-se a cridar va alertar a la policia, que la va tranquilitzar. La Júlia anava repetint que aquell era el seu avi, però els policies no van aconseguir trobar cap informació que els vinculés, així que se la van emportar a la comissaria amb ells. Després de moltes disputes, la Júlia va sortir de comissaria, tot i que no va descobrir mai perquè els policies li deien que no podia ser, que aquell no era el seu avi.", title:"Escull la teva aventura | 2", status:true, case:"fallo",lvl:4})
        }
        if(option == 'op_2' && req.body.lvl2 == 1){
            res.send({time:24000,text:"Es va desmaiar al mig del carrer. Es va despertar a casa seva amb el Gregor al costat i li van dir que el seu avi no existia enlloc. Era realment el seu avi?", status:true, case:"win",lvl:4})
        }

        else if(option == 'op_2' && req.body.lvl2 == 2){
            res.send({time:3000,text:"Algú mata al Lleó d'una manera molt subtil.", title:"Escull la teva aventura | 2", status:true, case:"exit",lvl:4})
        }
        else if(option == 'op_1' && req.body.lvl2 == 3){
            res.send({time:27000,text:"Després d'acabar el seu horari laboral i tancar la rellotgeria, el Lleó va anar al seu bar de confiança on ell berenava sempre. Aquell dia tenia molta gana. Va menjar 12 croissants, 4 begudes energètiques i un bol de maduixes amb nata. Al cap de 20 minuts es va desmaiar mentres llegia el diari del bar, i ja no hi va haver marxa enrere. Després de enterar-se'n, la Júlia estava tant impactada que va decidir anar-se'n a Irlanda i començar una nova vida.", status:true, case:"fallo",lvl:5})
        }
	else if(option == 'op_2' && req.body.lvl2 == 3){
	    res.send({time:27000, case:"fallo",text:"Després de tancar la rellotgeria el Lleó va decidir anar a la platja. Es va banyar una estona, i se'l van emportar les corrents. Al cap de 10 minuts ja no veia la platja. Va Trovar una petita illa i es va aturar allà a descansari observar a veure si veia la platja. Al cap d'una hora, li va venir molta set i va començar a veure aigua del mar. Entre el cansament i la set, no va parar.",status:false,lvl:5, title:"Escull la teva aventura | 3"})
	}
}
    else if(lvl == 4 ){
        if(option == 'op_2'){

        }
        
    }
    else if(lvl == 5 ){
        
    }
    else if(lvl == 6 ){
        
    }
    else if(lvl == 7 ){
        
    }
    else if(lvl == 8 ){
        
    }

    else{
        res.send({time:0,text:"Error", title:"Error", status:true, case:"error"})
    }
})
app.post("/seg", (req,res)=>{
    var hora = new Date(new Date()-3600*1000*3).toISOString();
    console.log(`\n${ip6addr.parse(req.socket.remoteAddress).toString({format: 'v4'})} at ${hora} -> Requested question`)
    const lvl = req.body.lvl
    if(lvl == 1){
            res.send({img:"/resources/img/mort.jpg", time:8000,lvl:1,text:"Molt bé, començem. A l'inici de la historia, el Lleó, l'avi de la Júlia, es mor. Creus que es el camí correcte o tu ho faries diferent?", title:"Escull la teva aventura | 1", op_1:"El Lleó es mor", op_2:"El Lleó no es mor", op1_val:'"lvl":1, "val":"op_1"', op2_val:'"lvl":1, "val":"op_2"',opnum:2})
    }
    if(lvl == 2){
        res.send({img:"/resources/img/croissant.jpg", time:5000 ,lvl:2,text:"El Lleó mor el dia que la Júlia fa 18 anys, com ha mort el Lleó?", op_1:"S'ha ennuegat menjant un croissant.", op_2:"Ha mort assassinat per algú.", op_3:"Ha mort per una sobredosis", title:"Escull la teva aventura | 2", opnum:3, op1_val:'"lvl":2, "val":"op_1"',op2_val:'"lvl":2, "val":"op_2"', op3_val:'"lvl":2, "val":"op_3"'})
    }
    if(lvl == 3){
        if(req.body.lvl2 == 1){
        res.send({img:"/resources/img/patinet.jpg",time:7000 ,lvl:3,text:"La Júlia va passar per aquell carrer amb patinet elèctric i es va acostar per curiositat, quan va veure que era el seu avi el que estava estès al terra la Júlia... ", op_1:"Va posar-se a cridar.", op_2:"Es va desmaiar.", title:"Escull la teva aventura | 3", opnum:2, op1_val:'"lvl":3, "val":"op_1"',op2_val:'"lvl":3, "val":"op_2"'})
        }
        else if(req.body.lvl2 == 2){
            res.send({img:"/resources/img/dinero.jpg",time:5000 ,lvl:3,text:"Després de llegir la carta que en Lleó havia deixat escrita, la Júlia i en Gregor van anar cap a les rambles a trobar-se amb en Petrarca. Després d'alguns dies amb ell i d'aconseguir les cendres del Lleó, van cap a Sa Dragonera a deixar les seves cendres. Per a anar-hi, han de pujar en una barca que està estacionada al port, i hi ha un guardia que vigila qui passa. Per a passar...", op_1:"Li claven una pallissa al guardia.", op_2:"El Petrarca li dona diners al guardia", title:"Escull la teva aventura | 3", opnum:2, op1_val:'"lvl":3, "val":"op_1"',op2_val:'"lvl":3, "val":"op_2"'})
        }
        if(req.body.lvl2 == 3){
            res.send({img:"/resources/img/sucre.jpg",time:5000 ,lvl:3,text:"El Lleó té una sobredosis de...", op_1:"Sucre", op_2:"Sal", title:"Escull la teva aventura | 3", opnum:2, op1_val:'"lvl":3, "val":"op_1"',op2_val:'"lvl":3, "val":"op_2"'})
        }

    }
    if(lvl == 4){
        if(req.body.lvl2 == 3){
            res.send({img:"/resources/img/sucre.jpg",time:5000 ,lvl:3,text:"El Lleó té una sobredosis de...", op_1:"Sucre", op_2:"Sal", title:"Escull la teva aventura | 3", opnum:2, op1_val:'"lvl":3, "val":"op_1"',op2_val:'"lvl":3, "val":"op_2"'})
        }
    }
    if(lvl == 5){
        res.send({time:5000 ,lvl:5,text:"", op_1:"", op_2:"", op_3:"", title:"Escull la teva aventura | 5", opnum:3, op1_val:'{"lvl":5, "val":"op_1"}',op2_val:'{"lvl":5, "val":"op_2"}', op3_val:'{"lvl":5, "val":"op_3"}'})
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
            var hora = new Date(new Date()-3600*1000*3).toISOString();
            console.log(`\nServer at ${hora} -> Succesfully retireved data from user: ${user_id}`)
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
              var hora = new Date(new Date()-3600*1000*3).toISOString();
              console.log(`\nServer at ${hora} -> Succesfully created a new user: ${user_id}`)
          
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
              var hora = new Date(new Date()-3600*1000*3).toISOString();
              console.log(`\nServer at ${hora} -> Succesfully updated the level of user: ${user_id} to ${user_level}`)          
            });
          }); 
    }

})
app.get("/favicon.ico", (req,res)=>{
    res.send
})
app.get("*", (req,res)=>{
    res.render("404")
})

http.createServer(app).listen(80);
