jQuery(document).ready(function(){
  if( typeof mrm_timelineFeature_class === 'undefined'){
    console.log('no timeline class');
    return;
  }
  var timelineRows = document.getElementsByClassName(mrm_timelineFeature_class);
  var timelineRowsCount = timelineRows.length;

  for(var i = 1; i <= timelineRowsCount; i++){

    var timeline_item = timelineRows[i-1];

    // Add count
    var count = document.createElement('span');
    count.classList.add('mrm-timeline-feature__count');
    count.innerHTML = i;
    timeline_item.appendChild(count);

    // Add class
    timeline_item.className += " mrm-timeline-feature__item";

    if( i === timelineRowsCount ){
      timeline_item.className += " mrm-timeline-feature__item--last";
    }

    // Create dummy for timeline
    var timeline_dummy = document.createElement('div');
    timeline_dummy.className += "mrm-timeline-feature__dummy";
    timeline_dummy.offsetHeight = timeline_item.offsetHeight;
    timeline_item.appendChild( timeline_dummy );

    // Add special class to wrapper
    // We only look up 5 levels, then we quit
    var parent = timeline_item.parentElement;

    for (var j = 0; j<5; j++) {
      if( parent.className.indexOf('panel-grid') > -1 ) {
        parent.className += " mrm-timeline-feature__wrapper";
        break;
      }
    }// End inner for

  }//End outer for

  window.addEventListener("scroll", function(){
    var center = window.innerHeight / 2;
    for( j = 0; j < timelineRows.length; j++ ){

      var element = timelineRows[j]
      var position = element.getBoundingClientRect();
      var previousElement = false;
      if( j > 0 ){
        var previousElement = timelineRows[j-1];
      }
      // Above the center line
      if( position.top - center < -20 )  {
        // If not already glowing
        if( ! hasClass(element, 'glowing') ){
          element.className += ' glowing';
        }
        // Check if we are already past an element
        if( previousElement ){
          if( hasClass(previousElement,'glowing') ){
            if( ! hasClass(previousElement,'passed') ){
              previousElement.className += ' passed';
            }
          }
        }
      // Below the center line
      }else{
        if( hasClass(element, 'glowing') ){
          removeClass(element, 'glowing');
        }
        if( previousElement ){
          if( hasClass(previousElement,'passed') ){
            removeClass(previousElement, 'passed');
          }
        }
      }
    }
  });

  function removeClass(element, className)
  {
    element.className = element.className.replace(new RegExp('(?:^|\\s)'+ className + '(?:\\s|$)'), ' ').trim();
  };

  function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
  };

})// End document ready
