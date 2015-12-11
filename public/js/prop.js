var app = angular.module("skadoosh",[]);
app.controller("ObjController",['$scope', function($scope){
  $scope.objName="";
  
}]);
$('document').ready(function(){
  $('.properties').hide();
  $('.nextStep').click(function(){
    $('.properties').show();
  });
  var properties =1;
  $('.addPropButton').click(function(){
    properties+=1;
    $('.property').append("<label class='objText'>Property Name:</label><input type='text' name='property"+properties+"'/></div><select name= typeOfProp"+properties+" form='addProperties'><option value='unique'>Unique</option><option value='shared'>Shared</option></select>");
  });

});
