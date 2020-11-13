$(document).ready(function(){
  $('.signup-container form').submit(function(event){
    event.preventDefault();
    $.post({
      url: "/entermail",
      data: $(this).serialize(),
      success: function(data){
        if(data.redirect){
          window.location.replace(data.redirectTo);
        }
        else{
          alert(data.message);
        }
      }
    });
  });
});
