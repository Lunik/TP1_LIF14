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

function saveFood(){
  storeData("food", FOOD);
}

function addAliment(name, quantity, date){
  var aliment = new Aliment(name,quantity, date);
  console.log(aliment);
  FOOD.push(aliment);
  saveFood();
}

/////////////////
//  html add
/////////////////

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
$('.addFood').mousedown(function(){
  document.location = './addFood.html';
});

$('.foodSubmit').mousedown(function(){
  addAliment($('.foodAdder .foodInput').val(), $('.foodAdder .foodqte').val(), new Date());
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
