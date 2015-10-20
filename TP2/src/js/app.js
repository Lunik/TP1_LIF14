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
var AllPromos = new AllPromos();
init();
/////////////////
//  Class
/////////////////


function myDateFormatter (da) {
        var d = new Date(da);
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        var date = day + "/" + month + "/" + year;

        return date;
    }; 


function AllPromos() {
	this.nb = 0;
	this.promotions = [];

	this.addPromotion = function (p){
		if(p){
			this.promotions.push(p);
			this.nb++;
		}
	}

	}


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
		/*var total = 0;
		var totalPromo = 0;
		for(var i = 0; i < PANIER.nb; i++){
			var p = PANIER.produits[i];
			var prix = p.getPrixTotal();
			if(p.quantite >= this.minQuantite){
				if(this.type === '%'){
					var euro = ((prix * this.value) / 100);
					prix -= euro;
					totalPromo += euro;
				} else if(this.type === '€'){
					prix -= this.value;
					totalPromo += this.value;
				}
			}
			total += prix;
		}
		$('.promotionVal').text(Math.floor(totalPromo*100)/100+" €");
		total = Math.floor(total*100)/100;
		$('.totalVal').text(total+" €");
		return total;*/
		var total = 0;
		var totalpostreduction = 0;
		var reduction = 0;

		for(var i = 0; i < PANIER.nb; i++){
			var p = PANIER.produits[i];
			var prix = p.getPrixTotal();
			total+= prix;
		}
		if(this.type === '%'){
			reduction = Math.floor((total/100)*this.value);
		} else if(this.type === '€'){
			reduction = this.value;
		}
		totalpostreduction = total - reduction;
		$('.promotionVal').text(reduction + " €");
		$('.totalVal').text(totalpostreduction+" €");
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
  		//$('.editPromotionList').append('<option value="'+p.id+'">REDUC n°'+p.id+'\n'+p.description+'</option>');
  		/*prom = new Promo(p.id, '','',p.type,p.value,p.min);
  		AllPromos.addPromotion(prom);*/
	});
	getPanier();
	reload();
}

function reload(){
	PANIER.print();
	var tot = PROMO.applyPromo();
	$('.sousTotalVal').text(PANIER.getPrixTotal()+" €");
	storeData('panier',PANIER);
	storeData('promo', PROMO);
	storeData('allpromos', AllPromos);
	$('.editPromotionList').html(' ');
	$('.editPromotionList').append('<option>Aucune réductions</option>');
	var aproms = readData('allpromos');
	if(aproms){
		for(var i = 0; i < aproms.nb; i++){
			var promo = aproms.promotions[i];
			if (tot >= promo.minQuantite){
			var rendate1 = myDateFormatter(promo.debut);
			var rendate2 = myDateFormatter(promo.fin);
			$('.editPromotionList').append('<option value="'+promo.id+'">'+promo.id+' - Du '+rendate1+' au '+rendate2+' de '+promo.value+' '+promo.type+' dés '+promo.minQuantite+' € d\'achat </option>');
			}
		}
		$('.editPromotionList').val(PROMO.id);
	}
}

function getPanier(){
	var pn = readData('panier');
	if(pn){
		for(var i = 0; i < pn.nb; i++){
			var p = pn.produits[i];
			p = new Produit (p.id, p.nom, p.quantite, p.prix);
			PANIER.addProduit(p);
		}
	}
	var promo = readData('promo');
	if(promo){
		PROMO = new Promo(promo.id, promo.debut,promo.fin,promo.type,promo.value,promo.min);
		$('.editPromotionList').val(promo.id);

		PANIER.promo = PROMO;
	}
	var aproms = readData('allpromos');
	if(aproms){
		for(var i = 0; i < aproms.nb; i++){
			var promo = aproms.promotions[i];
			p = new Promo (promo.id, promo.debut,promo.fin,promo.type,promo.value,promo.minQuantite);
			//$('.editPromotionList').append('<option value="'+promo.id+'">'+promo.id+' - Du '+promo.debut+' au '+promo.fin+' de '+promo.value+' '+promo.type+' dés '+promo.minQuantite+' € d\'achat </option>');
			AllPromos.addPromotion(p);
		}
	}
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
	var $html = $('</br><div class="addProduit">');
	var $nom = $('<select>').css('width', '170px');
	Object.keys(PRODUIT).forEach(function(key) {
		var p =PRODUIT[key];
  		$nom.append('<option value="'+p.nom+'">'+p.nom+'</option>');
	});
	var $quantite = $('<input>').attr('type', 'number').attr('name','quantite').css('width', '170px');
	var $valid = $('<button>').addClass('actionB').text('Valider');

	$html.append('<label>&nbspNom: &nbsp &nbsp</label>').append($nom)
		.append('</br></br><label>Quantité: </label>').append($quantite).append('</br></br>')
		.append($valid)
		.append('</br></br>');
	pop.init(null,null,null,null,"Ajouter un produit",$html, true);
	pop.draw();
});



$('body').on('click','.actionB.ajouterReduction',function(){
	var pop = new Popup();
	var today = new Date();
	var dd = today.getDate();
    var mm = today.getMonth()+1;
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
	var mindate = (''+today.getFullYear()+'-'+mm+'-'+dd);
	console.log(mindate);
	var $reduction = $('<input>').attr('type', 'number').attr('name','reductionPourcentage').css('width', '170px').val(0);
	var $reduction1 = $('<input>').attr('type', 'number').attr('name','reductionFixe').css('width', '170px').val(0);
	var $labelreduc1 = $('<div class="reductionField1" ><label>Réduction (€): </label>').append($reduction1).append('</div>');
	var $labelreduc2 = $('<div class="reductionField2" ><label>Réduction (%): </label>').append($reduction).append('</div>');
	var $html = $('</br><div class="addReduction">');
	var $debutpromotion = $('<input required>').attr('type', 'date').attr('name','datedebutpromotion').css('width', '170px').attr('id', 'debutPromo').attr('value',mindate);
	var $finpromotion = $('<input required>').attr('type', 'date').attr('name','datefinpromotion').css('width', '170px').attr('id', 'finPromo').attr('value',mindate);
	var $typepromotion1 = $('<input checked>').attr('type', 'radio').attr('name','typepromotion').attr('value','promotion').addClass('actionRadio')
		.on('click', function(){
			$(".reductionField2").hide();
    		$(".reductionField1").show();
		});
	var $typepromotion2 = $('<input>').attr('type', 'radio').attr('name','typepromotion').attr('value','pourcentage').addClass('actionRadio')
		.on('click', function(){
			$(".reductionField1").hide();
    		$(".reductionField2").show();
		});
	var $minimum = $('<input required>').attr('type', 'number').attr('name','minimum').css('width', '170px').attr('id', 'minimumPromo').val(0);
	var $valid = $('<button>').addClass('actionB').text('Valider').attr('id', 'addPromo');

	$html.append('<label>&nbspDate début : &nbsp</label>').append($debutpromotion)
		.append('</br></br><label>&nbspDate fin : &nbsp</label>').append($finpromotion).append('</br></br>')
		.append($typepromotion1).append('  réduction fixe').append('</br>').append($typepromotion2).append(' pourcentage')
		.append('</br></br>').append($labelreduc2).append($labelreduc1)
		.append('</br><label>Minimum d\'achat requis (€): </label>').append($minimum).append('</br></br>')
		.append($valid)
		.append('</br></br>');
	pop.init(null,null,null,null,"Ajouter une promotion",$html, true);
	pop.draw();
	$(".reductionField2").hide();
});


$('body').on('click', '#addPromo',function(){
	var datedebut = $(".addReduction input[name=datedebutpromotion]").val();
	var datefin = $(".addReduction input[name=datefinpromotion]").val();
	var minimum = $(".addReduction input[name=minimum]").val();
	var type;
	var valreduction;
	var reduction = $('input[name=typepromotion]:checked', '.addReduction').val();
	if (reduction == 'promotion'){
		console.log("reduc normale");
		type ='€';
		valreduction = $(".addReduction input[name=reductionFixe]").val();
	}else{
		console.log("reduc %");
		type ='%';
		valreduction = $(".addReduction input[name=reductionPourcentage]").val();
	}

	var red = new Promo((AllPromos.nb+1), datedebut, datefin, type, valreduction, minimum);
	console.log(datefin);
	console.log(minimum);
	AllPromos.addPromotion(red);

	popupClose();
	reload();

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
	console.log(AllPromos.promotions[($(this).val()-1)].type);
	var p = AllPromos.promotions[($(this).val()-1)];
	if(p){
		PROMO = p;
	} else {
		PROMO = new Promo(0);
	}
	PROMO.applyPromo();
	storeData('promo', PROMO);
	//reload();
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
