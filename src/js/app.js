/////////////////
//  Class
/////////////////
function Consomation(date,quantity,number){
  this.date;
  this.quantity;
  this.number;

  this.getDate = function(){ return this.date; }
  this.setDate = function(date){ this.date = date; }
  this.getQuantity = function(){ return this.quantity; }
  this.setQuantity = function(quantity){ this.quantity = quantity; }
  this.getNumber = function(){ return this.number; }
  this.setNumber = function(number){ this.number = number; }
}

function Aliment(name, resume){
  this.name = name;
  this.resume = resume;
  this.conso = new Consomation(Date(), 0, 0);

  this.getName = function(){ return this.name; }
  this.setName = function(name){ this.name = name; }
  this.getResume = function(){ return this.resume; }
  this.setResume = function(resume){ this.resume = resume; }
  this.getConso = function(){ return this.conso; }
  this.setConso = function(conso){ this.conso = conso; }
}
/////////////////
//  Food
/////////////////

var $FOOD = $('.container .food');
var FOOD;



function initFood(){
  FOOD = readData("food");
}

/////////////////
//  Event
/////////////////


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
