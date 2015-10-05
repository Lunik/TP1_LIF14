
setInterval(function(){
	$('#homeimg').css('margin-left', Math.random()*2000 - 1000);
}, 1000); 

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function randomColor(){
	$('.menu').css('background-color', getRandomColor());
  $('body').css('background-color', getRandomColor());
  $('.menu h1').css('color', getRandomColor());
}

$('body').mousedown(function(){
	if(Math.random() > 0.8)
		alert("Que s'est-il passé ? Impossible de créer le fichier /nouveau_repas/xxqudsyiuè§876587 ou de l'ouvrir en écriture. La dernière réponse du serveur est : 200 Switching to Binary mode. 200 PORT command successful. Consider using PASV. Code erreur : 100016 Niveau : erreur non fatale (EL_ONRETURN) Code d'erreur système : 12002 Dump de l'erreur du module 'WD150COM.DLL' (15.00Gst). Informations de débogage : Fonction (10,1) Informations supplémentaires :...");
});

setTimeout(function(){
	$('.chargement').hide();
}, 1000);