function AppViewModel() {
    this.properties = this.schem.map(function(e){return e.name ;});
    this.property= "";
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());
