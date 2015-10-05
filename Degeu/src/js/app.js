/////////////////
//  Class
/////////////////
function Consomation(date,quantity){
  if(date)
    this.date = date;
  else
    this.date = Date();
  this.quantity = quantity;

  this.getDate = function(){ return this.date; }
  this.setDate = function(date){ this.date = date; }
  this.getQuantity = function(){ return this.quantity; }
  this.setQuantity = function(quantity){ this.quantity = quantity; }
}

function Aliment(name, quantity, date){
  this.name = name;
  this.conso = new Consomation(date, quantity);

  this.getName = function(){ return this.name; }
  this.setName = function(name){ this.name = name; }
  this.getConso = function(){ return this.conso; }
  this.setConso = function(conso){ this.conso = conso; }
}
/////////////////
//  Food
/////////////////

var $FOOD = $('.foodContainer');
var FOOD = [];

initFood();

//Initialisation de la structure de donnée FOOD
//Recupère les infos depuis le local storage du navigateur
function initFood(){
  var rFood = readData("food");
  if(rFood){
    for(var i=0; i<rFood.length; ++i){
      var f = rFood[i];
      var aliment = new Aliment(f.name, f.conso.quantity, f.conso.date);
      FOOD.push(aliment);
    }
    insertFood();
  }
}

//Sauvegarde de la structure FOOD 
//dans le local storage du navigateur
function saveFood(){
  storeData("food", FOOD);
}

//Ajouter un aliment à la structure FOOD
function addAliment(name, quantity, date){
  var aliment = new Aliment(name,quantity, date);
  console.log(aliment);
  FOOD.push(aliment);
  saveFood();
}

/////////////////
//  html add
/////////////////

//Insertion de la structure FOOD dans le html
function insertFood(){
  for(var i=0; i<FOOD.length; ++i){
    var f = FOOD[i];
    $FOOD.append(''+
      '<div class="aliment">'+
          '<div class="alimentname">'+f.getName()+'</div>'+
          '<div class="alimentquantity">'+f.conso.getQuantity()+'</div>'+
          '<div class="alimentdate">'+f.conso.getDate()+'</div>'+
      '</div>'+
      '');
  }
}

/////////////////
//  Event
/////////////////

//Click sur le bouton d'ajout de nourriture
//Switch sur la page du formulaire d'ajout
$('.addFood').mousedown(function(){
  document.location = './addFood.html';
});

//Soumet le formulaire d'ajout d'aliment
$('.foodSubmit').mousedown(function(){
  console.log()
  addAliment($('.foodAdder input[name=foodname]').val(), $('.foodAdder input[name=foodqte]').val(), new Date());
  document.location = './index.html';
});
/////////////////
//  localStorage
/////////////////

//Sauvgarder des donnes dans le localStorage
function storeData(key,data){
	data = JSON.stringify(data);
	localStorage.setItem(key,data);
}

//Lire des donnes dans le localStorage
function readData(key){
	var data = localStorage.getItem(key);
	data = JSON.parse(data);
	return data;
}

//Effacer le localStorage
function clearData(){
	localStorage.clear();
}

//Affacer un localStorage precis
function clearKey(key){
	localStorage.setItem(key,null);
}
