function AppViewModel(schem, values) {
  var self=this;
  self.properties = decodeURIComponent(schem.split(',')).split(',');
  self.values = decodeURIComponent(values).split('],').map(function(e){return e.split(',')});
  self.property= ko.observable();
  self.propType = ko.observable();
  self.valValue = ko.observable();
  self.possibleValues = ko.computed(function(){
    var temp = self.values[self.properties.indexOf(self.property())];
    self.propType(temp ? temp[0] === "Shared Value" ? temp.slice(0,1) : ["This is a unique value"] : ["No Properties Selected"]);
    self.valValue("");
    return temp ? temp[0] !== "Unique Value" ? temp.slice(1) : [] : []
  })
  self.objs = ko.observableArray();
  self.getData = function(){
    $.post("/search", $('#form').serialize(), function(returnedData) {
      self.objs(returnedData);
    });
  };

  self.getDataFromClick= function(val, name){
    self.property(name);
    self.valValue(val);
    self.getData();
  };

}
