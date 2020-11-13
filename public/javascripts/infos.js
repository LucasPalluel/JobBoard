function myFunction(clicked) {
  var popup = clicked.parent().find(".popuptext");
  popup.toggleClass("show");
  if(popup.hasClass("show")){
    setTimeout(function(){
      popup.removeClass("show");
    }, 10000);
  }
}

$(document).ready(function(){
  $(".nom_entreprise").click(function(){
    myFunction($(this));
  });
});
