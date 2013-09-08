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
//
//= require_tree .


//change the function of this, you want to make it like abis,
//you click a table and you add the number of seats you want at a table
var FloorPlan = {
  init: function(){
    this.drawing = SVG('floorplan').size('100%','100%')
    this.tables = new Array()
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

  getTableById: function(id){
    var table = FloorPlan.tables.filter(function(element) {return element.drawing.attr('id') === id
    })
    return table[0]
  }

}

function Form(tableId) {
  this.tableId = tableId
  this.addDomElements()
}

Form.prototype = {
  addDomElements: function(){
    // console.log(this.tableId)

    var table = AddTableButton.getTableById(this.tableId)
    console.log(table)
    var foreignObject = document.createElementNS( 'http://www.w3.org/2000/svg','foreignObject' );
    foreignObject.setAttribute('x', 0)
    foreignObject.setAttribute('y', 0)
    foreignObject.setAttribute('width', table.width)
    foreignObject.setAttribute('height', table.height)
    var body = document.createElement('body')
    $(body).append(this.form  )
    $(foreignObject).append(body)
    document.getElementById('svg_' + this.tableId ).appendChild( foreignObject )
  },

  form: function(tableId){
    var chairForm = '<form><input type="text"><input type="submit"></form>'
    return chairForm
  }


}

function Table(id) {
  var nested = FloorPlan.drawing.nested()
  nested.attr({id: 'svg_table' + id})
  this.width = 100
  this.height = 100
  this.drawing = nested.circle(this.width,this.height).attr({fill: 'white', class: 'table', id: 'table' + id})
  this.drawing.stroke({color: 'black', width: 2})
  this.drawing.draggable()
  //i dont like these positions
  this.drawing.center('5%', '45%')
  this.drawing.click(this.addClickEvent)
  this.chairCounter = 0
  this.chairs = new Array()
}

Table.prototype = {
  addClickEvent: function(){




    //in this click event, popup a form for this particular table...
    // console.log(this)
    // console.log(this.attr('id'))

    var tableId = this.attr('id')

    var form = new Form(tableId)
    //in this click event, the this is the svg element....
    //how do you access its actual dom element...
    //you need to be able to access the js elements chairs array
    //create an event where you can edit the number of chairs per table
    //do i need to put the counter on another object?
    // addForeignObject
    
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
  }
}


$('document').ready(function() {
  if($('#floorplan').length){
    FloorPlan.init()
    AddTableButton.init()
    // table = new Table(1)
    //returns an array of chairs
    // console.log(table.returnChairs())
    // Buttons.init()
  }
});
