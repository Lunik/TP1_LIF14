/////////////////
//  Class
/////////////////
function Consomation(date,quantity){
  this.date = date;
  this.quantity = quantity;

  this.prototype.getDate = function(){ return this.date; }
  this.prototype.setDate = function(date){ this.date = date; }
  this.prototype.getQuantity = function(){ return this.quantity; }
  this.prototype.setQuantity = function(quantity){ this.quantity = quantity; }
}

function Aliment(name, quantity){
  this.name = name;
  this.conso = new Consomation(Date(), quantity);

  this.prototype.getName = function(){ return this.name; }
  this.prototype.setName = function(name){ this.name = name; }
  this.prototype.getConso = function(){ return this.conso; }
  this.prototype.setConso = function(conso){ this.conso = conso; }
}
/////////////////
//  Food
/////////////////

var $FOOD = $('.foodContainer');
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
  for(var i=0; i<FOOD.length; ++i){
    var f = FOOD[0];
    console.log(f);
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
