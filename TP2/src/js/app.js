var PRODUIT = {
	'Chips': {'nom':'Chips', 'id':1, 'prix': 1},
	'Tomate': {'nom':'Tomate', 'id':2, 'prix': 2},
	'Riz': {'nom':'Riz', 'id': 3, 'prix': 0.5}
}
var PROMOS = {
	'1': {'id': '1', 'description': '-10% sur deux produits identiques achetés.', 'type':'%', 'value': 10, 'min': 2 },
	'2': {'id': '2', 'description': '-5€ sur 5 mêmes articles', 'type':'-', 'value': 5, 'min': 5 }
}
var PANIER = new Panier();
var PROMO = new Promo();
init();
/////////////////
//  Class
/////////////////

function Panier () {
	this.nb = 0;
	this.produits = [];
	this.promo = new Promo();

	this.addProduit = function (p){
		if(p){
			this.produits.push(p);
			this.nb++;
		}
		this.print();
	}

	this.removeProduit = function(key){
		if(key >= 0 && key < this.nb){
			this.produits.slice(key,1);
			this.nb--;
		}	
		this.print();
	}

	this.getPrixTotal = function(){
		var total = 0;
		for (var i = 0; i < this.nb; i++) {
			total += this.produits[i].getPrixTotal();
		}
		return total;
	}

	this.print = function(){
		$tbody = $('.tabProduitBody').html("");
		for(var i=0; i < this.nb; i++){
			var p = this.produits[i];
			$butModif = $('<button>').addClass('actionB modif').attr('id',i).text('Modifier...');
			$butRemove = $('<button>').addClass('actionB remove').attr('id',i).text('Supprimer...');
			$buttons = $('<td>').append($butModif).append($butRemove);
			$tr = $('<tr>').addClass('unProduit')
				.append('<td>'+p.id+'</td>')
				.append('<td>'+p.nom+'</td>')
				.append('<td>'+p.quantite+'</td>')
				.append('<td>'+p.getPrixTotal()+' €</td>')
				.append($buttons);
			$tbody.append($tr);
		}	
	}
}

function Produit (id, nom, quantite, prix){
	this.id = id;
	this.nom = nom;
	this.quantite = quantite;
	this.prix = prix;

	this.getPrixTotal = function(){
		return this.prix * this.quantite;
	}
}


//Type % ou -
function Promo(id, debut,fin,type,value,min){
	this.id = id;
	this.debut = debut;
	this.fin = fin;
	this.type = type;
	this.value = value;
	this.minQuantite = min;

	this.applyPromo = function(){
		var total = 0;
		var totalPromo = 0;
		for(var i = 0; i < PANIER.nb; i++){
			var p = PANIER.produits[i];
			var prix = p.getPrixTotal();
			if(p.quantite >= this.minQuantite){
				if(this.type === '%'){
					var euro = ((prix * this.value) / 100);
					prix -= euro;
					totalPromo += euro;
				} else if(this.type === '-'){
					prix -= this.value;
					totalPromo += this.value;
				}
			}
			total += prix;
		}
		$('.promotionVal').text(Math.floor(totalPromo*100)/100+" €");
		total = Math.floor(total*100)/100;
		$('.totalVal').text(total+" €");
		return total;
	}
}

/////////////////
//  function
/////////////////

function init(){
	$('.editPromotionList').append('<option>Aucune réductions</option>');
	Object.keys(PROMOS).forEach(function(key) {
		var p = PROMOS[key];
  		$('.editPromotionList').append('<option value="'+p.id+'">REDUC n°'+p.id+'\n'+p.description+'</option>');
	});
	getPanier();
	reload();
}

function reload(){
	PANIER.print();
	PROMO.applyPromo();
	$('.sousTotalVal').text(PANIER.getPrixTotal()+" €");
	storeData('panier',PANIER);
	storeData('promo', PROMO);
}

function getPanier(){
	var pn = readData('panier');
	for(var i = 0; i < pn.nb; i++){
		var p = pn.produits[i];
		p = new Produit (p.id, p.nom, p.quantite, p.prix);
		PANIER.addProduit(p);
	}
	var promo = readData('promo');
	PROMO = new Promo(promo.id, promo.debut,promo.fin,promo.type,promo.value,promo.min);
	$('.editPromotionList').val(promo.id);

	PANIER.promo = PROMO;
}
/////////////////
//  Event
/////////////////
$('body').on('click','.actionB.remove',function(){
	var id = $(this).attr('id');
	if(confirm("Confirmer la suppression de "+PANIER.produits[id].quantite+" de "+PANIER.produits[id].nom)){
		PANIER.removeProduit(id);
	}
	reload();
});

$('body').on('click','.actionB.modif',function(){
	var id = $(this).attr('id');
	PANIER.produits[id].quantite = prompt('Modifier la quantite de '+PANIER.produits[id].nom, PANIER.produits[id].quantite);
	reload();
});

$('body').on('click','.actionB.ajouter',function(){
	var pop = new Popup();
	var $html = $('<div class="addProduit">');
	var $nom = $('<select>');
	Object.keys(PRODUIT).forEach(function(key) {
		var p =PRODUIT[key];
  		$nom.append('<option value="'+p.nom+'">'+p.nom+'</option>');
	});
	var $quantite = $('<input>').attr('type', 'number').attr('name','quantite');
	var $valid = $('<button>').addClass('actionB').text('Valider');

	$html.append('<label>Nom: </label>').append($nom)
		.append('<label>Quantite: </label>').append($quantite)
		.append($valid);
	pop.init(null,null,null,null,"Ajouter un produit.",$html, true);
	pop.draw();
});

$('body').on('click','.addProduit .actionB',function(){
	var produit = $('.addProduit select').val();
	var quantite = $('.addProduit input[name=quantite]').val();
	if(quantite <= 0){
		$('.addProduit input[name=quantite]').css('background-color','red');
	} else {
		var p = new Produit(PRODUIT[produit].id, produit, quantite, PRODUIT[produit].prix);
		PANIER.addProduit(p);
	}
	popupClose();
	reload();
});

$('body').on('change', '.editPromotionList', function(){
	var p = PROMOS[$(this).val()];
	if(p){
		PROMO = new Promo(p.id, '','',p.type,p.value,p.min);
	} else {
		PROMO = new Promo(0);
	}
	reload();
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
