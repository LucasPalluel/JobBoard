$('.modify-password-form').submit(function(event){
  event.preventDefault();
  $.ajax({
    url: '/changepasswordadmin',
    type: 'PUT',
    data: $(this).serialize(),
    success: function(data){
      if(data == true){
        window.location.replace('/administration')
      }
      else {
        alert('Aidez moi');
      }
    }
  })
})
