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
}

function Produit (nom, quantite, prix){
	this.nom = nom;
	this.quantite = quantite;
	this.prix = prix;
}