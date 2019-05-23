function debugMode() {
  this.now = LocalDate.now();
  this.today = LocalDate.today();
}

var table = new debugMode();


console.table(table);