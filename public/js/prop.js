


function AppViewModel() {
  this.objName= ko.observable();
}
$('document').ready(function(){
  ko.applyBindings(new AppViewModel());
  $('.properties').hide();
  $('.nextStep').click(function(){
    $('.properties').show();
  });
  var properties =1;
  $('.addPropButton').click(function(){
    properties+=1;
    $('.property').append("<div class='prop'><label class='objText'>Property Name:</label><input class='input input-lg' type='text' name='property"+properties+"'/><select class= 'input input-lg' name= typeOfProp"+properties+" form='addProperties'><option value='unique'>Unique</option><option value='shared'>Shared</option></select><br></div>");
  });

});
