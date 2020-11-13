$(document).ready(function(){
  $('.delete-button-company').click(function(){
    const button = $(this);
    const companyInput = button.parent().parent().find('input[name="companyId"]')
    const companyId = companyInput.eq(0).attr('value');
    $.post({
      url:'/deletecompany',
      type: 'DELETE',
      data:{companyId: companyId},
      success:function(data){
        window.location.replace(data.redirectTo)
      }
    })
  })
  $('.delete-button-user').click(function(){
    const button = $(this);
    const userInput = button.parent().parent().find('input[name="userId"]')
    const userId = userInput.eq(0).attr('value');
    $.post({
      url:'/deleteuser',
      type: 'DELETE',
      data:{userId: userId},
      success:function(data){
        window.location.replace(data.redirectTo)
      }
    })
  })
  $('.delete-button-offer').click(function(){
    const button = $(this);
    const offerInput = button.parent().parent().find('input[name="offerId"]')
    const offerId = offerInput.eq(0).attr('value');
    $.post({
      url:'/deleteoffer',
      type: 'DELETE',
      data:{offerId: offerId},
      success:function(data){
        window.location.replace(data.redirectTo)
      }
    })
  })
  $('.modify-user-form').submit(function(event){
    event.preventDefault();
    $.ajax({
      url: '/modifyuseradmin',
      type: 'PUT',
      data: $(this).serialize(),
      success: function(data){
        window.location.replace('')
      }
    })
  })
  $('.modify-company-form').submit(function(event){
    event.preventDefault();
    $.ajax({
      url: '/modifycompanyadmin',
      type: 'PUT',
      data: $(this).serialize(),
      success: function(data){
        window.location.replace('')
      }
    })
  })
  $('.modify-offer-form').submit(function(event){
    event.preventDefault();
    $.ajax({
      url: '/modifyofferadmin',
      type: 'PUT',
      data: $(this).serialize(),
      success: function(data){
        window.location.replace('')
      }
    })
  })
});
