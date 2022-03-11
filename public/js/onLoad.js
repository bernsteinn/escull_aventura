var gifs;
window.onload = function() {
  gifs = Gifffer({playButtonStyles: {
    'opacity': '0',
    'width': '60px',
    'height': '60px',
    'border-radius': '30px',
    'background': 'rgba(0, 0, 0, 0.3)',
    'position': 'absolute',
    'top': '50%',
    'left': '50%',
    'margin': '-30px 0 0 -30px'
  }
});
  setTimeout( function() {
    gifs[0].click(); //will play the first gif
  }, 1000);
}
async function escriure(text, velocitat, callbackTrue, callback, seconds, lvl){
var i = 0;
var txt = text;
var speed = velocitat; 
document.getElementById("bafarada").innerHTML = ""
function typeWriter() {
    if (i < txt.length) {
        if(txt.charAt(i-1) == ":" || txt.charAt(i-1) == "," || txt.charAt(i-1) == "." ){
            sleep(300)
            document.getElementById("bafarada").innerHTML += txt.charAt(i);
            i++;        
        }
        else{
            document.getElementById("bafarada").innerHTML += txt.charAt(i);
            i++;
        }

    setTimeout(typeWriter, speed);
}

}
typeWriter()
if(callbackTrue){
    setTimeout(callback, seconds, lvl)
}
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }
function uid(){ //https://stackoverflow.com/questions/3231459/create-unique-id-with-javascript Guy Thomas 2012
    var idstr=String.fromCharCode(Math.floor((Math.random()*25)+65));
    do {                
        var ascicode=Math.floor((Math.random()*42)+48);
        if (ascicode<58 || ascicode>64){
            idstr+=String.fromCharCode(ascicode);    
        }                
    } while (idstr.length<32);

    return (idstr);
}
function precheck(){
  var cache = document.createElement("CACHE"); //images guardades aqui
  document.body.appendChild(cache);
  function images() {
      for (var i=0; i<arguments.length; i++) {
          var img = new Image();
          img.src = arguments[i];
          var parent = arguments[i].split("/")[1];
          if ($(`cache #${parent}`).length == 0) {
              var ele = document.createElement("DIV");
              ele.id = parent;
              cache.appendChild(ele);
          }
          $(`cache #${parent}`)[0].appendChild(img);
      }
  }
  var usid = localStorage.getItem("uid")
if(usid == null){
    document.getElementById("submit1").style.display = "none"
    document.getElementById("submit2").style.display = "none"
    document.getElementById("submit3").style.display = "none"
    console.log("nou usuari")
    images("/resources/img/happy.gif")
    
}
images("/resources/img/happy.gif")
}
function run(){
var sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))//loading.io
var usid = localStorage.getItem("uid")
if(usid == null){
  var nou_usuari = String(uid())
  var browserData = `{"uid":"${nou_usuari}"}`
  $.post("/users", $.parseJSON(browserData), function(data){
      console.log(data)
      if(data.result.acknowledged == true){
          localStorage.setItem("uid",data.user_id)
          localStorage.setItem("lvl",1)
      }
  })    
    Swal.fire({
      title:"Com et dius?", 
      content: "input",
      input: 'text',
      inputPlaceholder: 'Nom',
      }).then(({value}) => {
        $.get(`https://gender-api.com/get?name=${value}&key=nLYBKXedCdLPNuUU3tKrwmCl29mqf4Mm3msJ`, function(data){
          if(data.gender == "female"){
            document.getElementById("bafarada").innerHTML = ""
            escriure(`Hola ${value}! Benvinguda a Escull la teva aventura. El joc es molt senzill: Jo et mostraré un fragment del llibre, i després de llegir-lo, tu hauràs d'escollir entre 2 (o més) opcions. Algunes d'aquestes opcions et revelaran finals alternatius, bons i dolents, i algunes altres opcions et permetran seguir amb el fil de la història. Estàs preparada? `, 50)
          }
          else{
            document.getElementById("bafarada").innerHTML = ""
            escriure(`Hola ${value}! Benvingut a Escull la teva aventura. El joc es molt senzill: Jo et mostraré un fragment del llibre, i després de llegir-lo, tu hauràs d'escollir entre 2 (o més) opcions. Algunes d'aquestes opcions et revelaran finals alternatius, bons i dolents, i algunes altres opcions et permetran seguir amb el fil de la història. Estàs preparat? `, 50)
          }
        })
        setTimeout( function() {
          gifs[0].click(); 
        }, 19600);


        var start = async() =>{        
          await sleep(22000)
          console.log("test")
          var container = document.getElementById("bafarada")
          var newData = ` 
            <div class="button-wrap">
              <input class="hidden radio-label" type="radio" name="accept-offers" id="yes-button" onclick="update()" checked="checked"/>
              <label class="button-label" for="yes-button">
                <h1>Sí</h1>
              </label>
              <input class="hidden radio-label" type="radio" name="accept-offers" id="no-button"/>
              <label class="button-label" for="no-button">
                <h1>No</h1>
              </label>
            </div>
      `
      container.innerHTML += newData
        }
        start()
      
      });
    
}
else{
    console.log("usuari existent")
    var browserData = `{"existent":true,"uid":"${usid}"}`
    $.post("/users", $.parseJSON(browserData), function(data){
        console.log(data)
        localStorage.setItem("lvl",data.lvl)
        var lvl = localStorage.getItem("lvl")
        if(lvl == 1){
          var dataResponses = ""+'"'+'lvl1'+'"'+":"+localStorage.getItem("lvl1response")
        }
        else if(lvl == 2){
          var dataResponses = ""+'"'+'lvl1'+'"'+":"+localStorage.getItem("lvl1response")+',"lvl2":'+localStorage.getItem("lvl2response")
        }
        else if(lvl == 3){
          var dataResponses = ""+'"'+'lvl1'+'"'+":"+localStorage.getItem("lvl1response")+',"lvl2":'+localStorage.getItem("lvl2response")+',"lvl3":'+localStorage.getItem("lvl3response")
        }
        else if(lvl == 4){
          var dataResponses = ""+'"'+'lvl1'+'"'+":"+localStorage.getItem("lvl1response")+',"lvl2":'+localStorage.getItem("lvl2response")+',"lvl3":'+localStorage.getItem("lvl3response")+',"lvl4":'+localStorage.getItem("lvl4response")
        }
        else if(lvl == 5){
          var dataResponses = ""+'"'+'lvl1'+'"'+":"+localStorage.getItem("lvl1response")+',"lvl2":'+localStorage.getItem("lvl2response")+',"lvl3":'+localStorage.getItem("lvl3response")+',"lvl4":'+localStorage.getItem("lvl4response")+',"lvl5":'+localStorage.getItem("lvl5response")
        }
        else{
          var dataResponses = '{"wrong":"wrong"}'
        }
      
        var currentLevel = `"lvl":${data.lvl}`
        var progress = "{"+currentLevel+","+dataResponses+"}"
            $.post("/seg", $.parseJSON(progress), function(data){
                if(data.opnum == 2){
                  $("#submit1").fadeIn(1500)
                  $("#submit2").fadeIn(1500)
                  $(".options").fadeIn(1500)
                  document.getElementById("submit1").value = data.op_1
                  document.getElementById("submit2").value = data.op_2
                  document.getElementById("submit3").style.display = "none";
                  document.title = data.title
                  document.getElementById("1").value = data.op1_val
                  document.getElementById("2").value = data.op2_val
                  escriure(data.text, 50, false)
                  setTimeout( function() {
                    gifs[0].click(); 
                  },data.time);
                
                }
                else if(data.opnum == 3){
                  $("#submit1").fadeIn(1500)
                  $("#submit2").fadeIn(1500)
                  $("#submit3").fadeIn(1500)
                  $(".options").fadeIn(1500)
                  document.getElementById("submit1").value = data.op_1
                  document.getElementById("submit2").value = data.op_2
                  document.getElementById("submit3").style.visibility = "visible";
                  document.getElementById("submit3").value = data.op_3
                  document.title = data.title
                  document.getElementById("1").value = data.op1_val
                  document.getElementById("2").value = data.op2_val
                  document.getElementById("3").value = data.op3_val
                  escriure(data.text, 50, false)
                  setTimeout( function() {
                    gifs[0].click(); 
                  }, data.time);
                
                }

              })  
    })
    
}

}

function next(lvl){

    var container = document.getElementById('bafarada');
    if(container.innerHTML != "Error"){
    var button = `<div class="wrapper">
    <a class="cta" href="#" onclick="update()">
      <span>Següent</span>
      <span>
        <svg width="20px" height="20px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="arrow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path class="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
            <path class="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
            <path class="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
          </g>
        </svg>
      </span> 
    </a>
  </div>

`   
    console.log(container.innerHTML);
    container.innerHTML += button

    }
}
function update(){
  var lvl = localStorage.getItem("lvl") - 1
  if(lvl == 1){
    var dataResponses = ""+'"'+'lvl1'+'"'+":"+localStorage.getItem("lvl1response")
  }
  else if(lvl == 2){
    var dataResponses = ""+'"'+'lvl1'+'"'+":"+localStorage.getItem("lvl1response")+',"lvl2":'+localStorage.getItem("lvl2response")
  }
  else if(lvl == 3){
    var dataResponses = ""+'"'+'lvl1'+'"'+":"+localStorage.getItem("lvl1response")+',"lvl2":'+localStorage.getItem("lvl2response")+',"lvl3":'+localStorage.getItem("lvl3response")
  }
  else if(lvl == 4){
    var dataResponses = ""+'"'+'lvl1'+'"'+":"+localStorage.getItem("lvl1response")+',"lvl2":'+localStorage.getItem("lvl2response")+',"lvl3":'+localStorage.getItem("lvl3response")+',"lvl4":'+localStorage.getItem("lvl4response")
  }
  else if(lvl == 5){
    var dataResponses = ""+'"'+'lvl1'+'"'+":"+localStorage.getItem("lvl1response")+',"lvl2":'+localStorage.getItem("lvl2response")+',"lvl3":'+localStorage.getItem("lvl3response")+',"lvl4":'+localStorage.getItem("lvl4response")+',"lvl5":'+localStorage.getItem("lvl5response")
  }
  else{
    var dataResponses = '{"wrong":"wrong"}'
  }

  document.getElementById("submit1").style.display = "none";
  document.getElementById("submit2").style.display = "none";
  document.getElementById("submit3").style.display = "none";
  document.getElementById("submit1").style.boxShadow = "inset 0 0 0.5em 0 var(--clr-neon), 0 0 0.5em 0 var(--clr-neon)"
  document.getElementById("submit2").style.boxShadow = "inset 0 0 0.5em 0 var(--clr-neon), 0 0 0.5em 0 var(--clr-neon)"
  document.getElementById("submit3").style.boxShadow = "inset 0 0 0.5em 0 var(--clr-neon), 0 0 0.5em 0 var(--clr-neon)"
  var lvl1 = localStorage.getItem("lvl")  
  var currentLevel = `"lvl":${lvl1}`
  if(localStorage.getItem("lvl") > 1){
    var option = '{'+dataResponses+','+currentLevel+'}'
  }
  else{
    var option = '{'+currentLevel+'}'
  }
    console.log (option)
    var user_id = localStorage.getItem("uid")
        $.post("/seg", $.parseJSON(option), function(data){
            var browserData = `{"lvl":"${lvl}", "update":true, "uid":"${user_id}"}`
            $.post("/users", $.parseJSON(browserData), function(data){

            })
            if(data.opnum == 2){
                gifs[0].click()
                document.getElementById("submit1").value = data.op_1
                document.getElementById("submit2").value = data.op_2
                document.getElementById("submit3").style.display = "none"
                document.title = data.title
                document.getElementById("1").value = data.op1_val
                document.getElementById("2").value = data.op2_val
                escriure(data.text, 50, false)
                setTimeout( function() {
                  $("#submit1").fadeIn(1500)
                  $("#submit2").fadeIn(1500)  
                  $(".options").fadeIn(1500)
                  gifs[0].click(); 
                }, data.time);

                
              }
              else if(data.opnum == 3){
                document.getElementById("submit1").value = data.op_1
                document.getElementById("submit2").value = data.op_2
                document.getElementById("submit3").style.display = "none"
                document.getElementById("submit3").value = data.op_3
                document.title = data.title
                document.getElementById("1").value = data.op1_val
                document.getElementById("2").value = data.op2_val
                document.getElementById("3").value = data.op3_val
                escriure(data.text, 50, false)
                gifs[0].click(); 
                setTimeout( function() {
                  gifs[0].click(); 
                  $("#submit1").fadeIn(1500)
                  $("#submit2").fadeIn(1500)
                  $("#submit3").fadeIn(1500)
                  $(".options").fadeIn(1500)
                }, data.time);

              }
          })
      }

      function youLost(){
        var container = document.getElementById('lose');
        var animation = `	
        </a>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
      
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
      
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
        <div class="col"></div>
      
        <div class="lost">HAS<br>PERDUT</div>
      
    
    `   
        console.log(container.innerHTML);
        container.innerHTML += animation
        setTimeout(function(){
          localStorage.setItem("lvl",1)
        Swal.fire({
          title: '<h2><b>Has perdut</b></h2>',
          icon: 'info',
          html:
            'Vols intentar-ho una altra vegada? ' +
            `<div class="wrapper">
    <a class="cta" href="#" onclick="update()">
      <span>Torna-ho a provar</span>
      <span>
        <svg width="20px" height="20px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="arrow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path class="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
            <path class="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
            <path class="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
          </g>
        </svg>
      </span> 
    </a>
  </div>`,
          showCloseButton: false,
          showCancelButton: false,
          focusConfirm: false,
        })
        
    }, 6999)
  }
    
      

  