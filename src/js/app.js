/////////////////
//  Class
/////////////////
function Consomation(date,quantity){
  this.date = date;
  this.quantity = quantity;

  this.getDate = function(){ return this.date; }
  this.setDate = function(date){ this.date = date; }
  this.getQuantity = function(){ return this.quantity; }
  this.setQuantity = function(quantity){ this.quantity = quantity; }
}

function Aliment(name, quantity){
  this.name = name;
  this.conso = new Consomation(Date(), quantity);

  this.getName = function(){ return this.name; }
  this.setName = function(name){ this.name = name; }
  this.getConso = function(){ return this.conso; }
  this.setConso = function(conso){ this.conso = conso; }
}
/////////////////
//  Food
/////////////////

var $FOOD = $('.container .food');
var FOOD = [];

initFood();

function initFood(){
  FOOD = readData("food");
}

function saveFood(){
  storeData("food", FOOD);
}

function addAliment(name, quantity){
  var aliment = new Aliment(name,quantity);
  FOOD.push(aliment);
  saveFood();
}

/////////////////
//  html add
/////////////////

function insertFood(){
  FOOD;
}

/////////////////
//  Event
/////////////////
$('.addFood').mousedown(function(){
  document.location = './addFood.html';
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
