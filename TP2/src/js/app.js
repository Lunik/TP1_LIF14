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
function Promo(debut,fin,type,value,min){
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
	var p = new Produit(1, 'Chips', 10, 1);
	PANIER.addProduit(p);
	p = new Produit(2, 'Tomate', 1, 2);
	PANIER.addProduit(p);
	p = new Produit(3, 'Riz', 2, 0.5);
	PANIER.addProduit(p);

	PANIER.print();

	PROMO = new Promo("01-12-2015","25-12-2015","%",10,1);
	PROMO.applyPromo();
	$('.sousTotalVal').text(PANIER.getPrixTotal()+" €");

}

/////////////////
//  Event
/////////////////
$('body').on('click','.actionB.remove',function(){
	var id = $(this).attr('id');
	if(confirm("Confirmer la suppression de "+PANIER.produits[id].quantite+" de "+PANIER.produits[id].nom)){
		PANIER.removeProduit(id);
	}
});

$('body').on('click','.actionB.modif',function(){
	var id = $(this).attr('id');
	PANIER.produits[id].quantite = prompt('Modifier la quantité de '+PANIER.produits[id].nom, PANIER.produits[id].quantite);
	PANIER.print();
});

$('body').on('click','.actionB.ajouter',function(){
	var pop = new Popup();
	var html = '<button>';
	pop.init(null,null,null,null,"Ajouter un produit.",html, true);
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