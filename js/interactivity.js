jQuery("#credits").on("click",function(){
  jQuery("#content").empty();
  var message = "game created by me";
  jQuery("#content").append("<p>" + message + "</p>");
});
jQuery("#scores").on("click",function(){
  jQuery("#content").empty();
  var message = "<p> coming soon </p>";
  jQuery("#content").append("<p>" + message + "</p>");
});
jQuery("#help").on("click",function(){
  jQuery("#content").empty();
  var message = "How to play below game";
  jQuery("#content").append("<p>" + message + "</p>");
});


function registerscore(score){

  }
