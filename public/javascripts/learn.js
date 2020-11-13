let toggle = {};
function isToggle(jobId){
  let result = toggle[jobId];
  if(result === undefined){
    result = false;
    toggle[jobId] = result;
  }
  toggle[jobId] = !result;
  return !result;
}

const animDuration = 300;

function openDescription(button, description, descriptionWindow){

  const windowHeight = description.outerHeight(true);
  description.css("top", -windowHeight + "px");
  descriptionWindow.animate({
    height: windowHeight,
    opacity: 1
  }, {
    duration: animDuration
  });
  description.animate({
    top: 0
  }, {
    duration: animDuration,
    complete: function(){
      button.text('Show less')
    }
  });
}

$('.learn').on('click', (e) => {
  let button = $(e.target);
  const description = button.parent().find('.description_entreprise');
  const descriptionWindow = button.parent().find('.description-window');
  let id = button.attr('data-jobid');
  if(isToggle(id)){
    if(description.text() === ""){
      $.ajax({
        method: 'GET',
        url: '/'+id,
        success: function(xhr){
          description.text(xhr.description_full);
          openDescription(button, description, descriptionWindow);
        }
      });
    }else{
      openDescription(button, description, descriptionWindow);
    }
  }else{
    const windowHeight = description.outerHeight(true);
    descriptionWindow.animate({
      height: 0,
      opacity: 0
    }, {
      duration: animDuration
    });
    description.animate({
      top: -windowHeight
    }, {
      duration: animDuration,
      complete: function(){
        button.text('Learn more')
      }
    });
  }
});
