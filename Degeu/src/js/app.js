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

function removeAliment(index){
  FOOD.splice(index, 1);
  saveFood();
  location.reload();
}
/////////////////
//  html add
/////////////////

//Insertion de la structure FOOD dans le html
function insertFood(){
  for(var i=0; i<FOOD.length; ++i){
    var f = FOOD[i];
    $FOOD.append(''+
      '<div class="aliment" id="'+i+'">'+
          '<div class="alimentname">'+f.getName()+'</div>'+
          '<div class="alimentquantity">'+f.conso.getQuantity()+'</div>'+
          '<div class="alimentdate">'+f.conso.getDate()+'</div>'+
          '<input type="submit" class="removeFood" id="'+i+'" value="x"/>'+
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
  var r = confirm("Êtes vous sur de vouloir ajouter un nouveau repas");
  if (r == true) {
    var r2 = confirm("Attention !! Avez vous bien mangé aujourd\'hui !?!?");
    if (r2 == true) {
      document.location = './addFood.html';    
    } 
  }
});

//Click sur le bouton d'ajout de nourriture
//Switch sur la page du formulaire d'ajout
$('.removeFood').mousedown(function(){
  removeAliment(this.id);
});

//Soumet le formulaire d'ajout d'aliment
$('.foodSubmit').mousedown(function(){
  var $fname = $('.foodAdder input[name=foodname]');
  var $fqte = $('.foodAdder input[name=foodqte]');

  if($fname.val() == ""){
    $fname.css('background-color','yellow');
    $fname.focus();
  } else {
    $fname.css('background-color','');
  }

  if($fqte.val() == ""){
    $fqte.css('background-color','yellow');
    $fname.focus();
  } else {
    $fqte.css('background-color','');
  }
  if($fqte.val() != "" && $fname.val() != ""){
    addAliment($fname.val(), $fqte.val(), new Date());
    document.location = './index.html';
  }
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
