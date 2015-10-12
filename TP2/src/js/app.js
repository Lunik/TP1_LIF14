var PANIER = new Panier();
var PROMO = new Promo();

function Panier () {
	this.nb = 0;
	this.produits = [];

	function addProduit(p){
		this.produits.push(p);
		this.nb++;
	}

	function removeProduit(key){
		this.produits.slice(key,1);
		this.nb--;
	}

	function getPrixTotal(){
		var total = 0;
		for (var i = 0; i < this.nb; i++) {
			total += this.produits[i].getPrixTotal();
		}
		return total;
	}
}

function Produit (nom, quantite, prix){
	this.nom = nom;
	this.quantite = quantite;
	this.prix = prix;

	function getPrixTotal(){
		return this.prix * this.quantite;
	}
}

function Promo(){
	
}