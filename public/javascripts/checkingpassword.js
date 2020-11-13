$(document).ready(function(){
  $("#password, #confirmpassword").on('input', function(){
    checkPass();
  });
  $("#mail, #confirmemail").on('input', function(){
    checkMail();
  });
});

function checkPass()
{
    var password = document.getElementById('password');
    var confirm  = document.getElementById('confirmpassword');

    var message = document.getElementById('confirm-message2');

    var good_color = "#66cc66";
    var bad_color  = "#ff6666";

    if(password.value == confirm.value){

        confirm.style.backgroundColor = good_color;
        message.style.color           = good_color;
        message.innerHTML             = '<label>Passwords match !</label>';
    }else{

        confirm.style.backgroundColor = bad_color;
        message.style.color           = bad_color;
        message.innerHTML             = '<label>Passwords do not match !</label>';
    }
}
function checkMail()
{
    var password = document.getElementById('mail');
    var confirm  = document.getElementById('confirmemail');

    var message = document.getElementById('confirm-message1');

    var good_color = "#66cc66";
    var bad_color  = "#ff6666";

    if(password.value == confirm.value){

        confirm.style.backgroundColor = good_color;
        message.style.color           = good_color;
        message.innerHTML             = '<label>Emails match !</label>';
    }else{

        confirm.style.backgroundColor = bad_color;
        message.style.color           = bad_color;
        message.innerHTML             = '<label>Emails do not match !</label>';
    }
}
