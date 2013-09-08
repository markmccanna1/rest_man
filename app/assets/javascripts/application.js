// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require svg
//= require svg.draggable
//= require jquery
//= require jquery_ujs
<<<<<<< HEAD
=======
//
>>>>>>> fixed view errors
//= require_tree .
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
//= require ./customer/customer
//= require ./restaurant/restaurant
=======

var Chair = {
=======
=======


//change the function of this, you want to make it like abis,
//you click a table and you add the number of seats you want at a table
>>>>>>> repurpising chair creation to via table, you get the right table when you click the object
var FloorPlan = {
>>>>>>> added a js panel object that lets you create tables and chairs with the proper id
  init: function(){
    this.drawing = SVG('floorplan').size('100%','100%')
    this.tables = new Array()
  },

  getTableById: function(id){
    var table = FloorPlan.tables.filter(function(element) {return element.drawing.attr('id') === id
      })
    return table[0]
  }
}

//how the fuck do you want to implement chairs you dumbfuck, sleep on it
function Chair(id) {
  //what properties do you want it to have?
}


var AddTableButton = {
  init: function(){
    var nested = FloorPlan.drawing.nested()

    //set the svg element id
    nested.attr({id: 'createTable'})
    // console.log(nested)

    this.width = 120
    this.height = 120
    this.drawing = nested.circle(120, 120).attr({fill: 'white'})


    // console.log(this.drawing)
    // , id: 'create_table'
    this.drawing.stroke({color: 'black', width: 2})
    this.addForeignObject()

    //i dont like these positions
    this.drawing.center('5%', '15%')
    this.drawing.click(this.addClickEvent)
    this.tableCounter = 1
  },

  addClickEvent: function(){
    var table = new Table(AddTableButton.tableCounter)
    AddTableButton.tableCounter += 1
    FloorPlan.tables.push(table)
  },

  addForeignObject: function(){
<<<<<<< HEAD
    var foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject' );
=======
    var foreignObject = document.createElementNS( 'http://www.w3.org/2000/svg','foreignObject' );
>>>>>>> updated namespacing
    foreignObject.setAttribute('x', 0)
    foreignObject.setAttribute('y', 0)
    foreignObject.setAttribute('width', '100%')
    foreignObject.setAttribute('height', this.height)
    var body = document.createElement('body')
<<<<<<< HEAD
<<<<<<< HEAD
    $(body).append('<div> hi </div>')
    $(foreignObject).append(body)
    document.getElementById( 'createTable' ).appendChild( foreignObject );
=======
    $(foreignObject).append(body)
    $(body).append('<div> Click to Create a Table</div>')
    document.getElementById( 'create_table' ).appendChild( foreignObject );
>>>>>>> updated namespacing
  },

  getTableById: function(id){
    var table = FloorPlan.tables.filter(function(element) {return element.drawing.attr('id') === id
    })
    return table[0]
=======
    $(body).append('<div> Click here to create a table </div>')
    $(foreignObject).append(body)
    document.getElementById( 'createTable' ).appendChild( foreignObject );
>>>>>>> added a form that takes a value for num chairs per table
  }
}

function Form(tableId) {
  this.tableId = tableId
  this.addForeignObject()
}

Form.prototype = {
  addForeignObject: function(){
    var table = FloorPlan.getTableById(this.tableId)
    var foreignObject = document.createElementNS( 'http://www.w3.org/2000/svg','foreignObject' );
    foreignObject.setAttribute('x', '80%')
    foreignObject.setAttribute('y', 0)
    foreignObject.setAttribute('width', '100%')
    foreignObject.setAttribute('height', '100%')
    foreignObject.setAttribute('id', 'foreign' + this.tableId)
    var body = document.createElement('body')
    $(body).append(this.form())
    console.log('#form' + this.tableId)
    $(foreignObject).append(body)
    document.getElementById('svg_' + this.tableId ).appendChild( foreignObject )
    this.submitEvent(this.tableId)
  },

  form: function(tableId){
    console.log(this.tableId)
    var chairForm = this.tableId + '<form id="form'+ this.tableId +'"> Number of Chairs <input id="numChairs" type="text"><input type="submit"></form>'
    return chairForm
  },

  submitEvent: function(tableId){
    $('#form' + this.tableId).submit(function(event){
      event.preventDefault()
      numChairs = $('#numChairs').val()
      var table = FloorPlan.getTableById(tableId)
      table.setChairs(numChairs)
    })
  }


}

function Table(id) {
  var nested = FloorPlan.drawing.nested()
  nested.attr({id: 'svg_table' + id})
  // this.id = 'table' + id
  this.width = 100
  this.height = 100
  this.drawing = nested.circle(this.width,this.height).attr({fill: 'white', class: 'table', id: 'table' + id})
  this.drawing.stroke({color: 'black', width: 2})
  this.drawing.draggable()
  //i dont like these positions
  this.drawing.center('5%', '45%')
  // this.drawing.click(this.addClickEvent)
  this.chairs = new Array()
}

Table.prototype = {
  

  clickEvent: function(){
    var tableId = this.drawing.attr('id')
    var form = new Form(tableId)
  },

  returnChairs: function(){
    return this.chairs
  },
  //when you add chairs you want to increment the chair counter on the object
  //what happens if they remove chairs?
  //you have to make the 'chairs' variable dependend on their form submission... kinky
  addForeignObject: function(){
    var foreignObject = document.createElementNS( 'http://www.w3.org/2000/svg','foreignObject' );
    foreignObject.setAttribute('x', 0)
    foreignObject.setAttribute('y', 0)
    foreignObject.setAttribute('width', this.width)
    foreignObject.setAttribute('height', this.height)
    var body = document.createElement('body')
    $(body).append('<div> hi </div>')
    $(foreignObject).append(body)
    document.getElementById( 'createTable' ).appendChild( foreignObject );
  },

  setChairs: function(numChairs){
    console.log(numChairs)
    for (var i = 0; i < numChairs; i++){
      
    } 
  }
}

$('document').ready(function() {
  if($('#floorplan').length){
    FloorPlan.init()
    AddTableButton.init()
    var selectedItem = null
    $('body').on("click", ".table", function(e){
      if(this.id != selectedItem){
        var table = FloorPlan.getTableById(this.id)
        table.clickEvent()
        $('#foreign' + selectedItem).remove()
        selectedItem = this.id
      } 
    })
    // table = new Table(1)
    //returns an array of chairs
    // console.log(table.returnChairs())
    // Buttons.init()
  }
});
>>>>>>> example square is draggable and clickable
