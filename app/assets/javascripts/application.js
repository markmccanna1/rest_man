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
<<<<<<< HEAD
//= require ./customer/customer
//= require ./restaurant/restaurant
=======

var Chair = {
=======
=======

<<<<<<< HEAD

//change the function of this, you want to make it like abis,
//you click a table and you add the number of seats you want at a table
>>>>>>> repurpising chair creation to via table, you get the right table when you click the object
=======
>>>>>>> the chairs now log their correct js objects when their images are clicked
=======


//maybe you want a list of tables that lets you select the one you click on the list
//can you make it so that the item is only draggable if its inside the box?
>>>>>>> working on grouping chairs
var FloorPlan = {
>>>>>>> added a js panel object that lets you create tables and chairs with the proper id
  init: function(){
    //this cuts off items if theyre below the pixel line, you have to dynamically resize the 
    //svg drawing area as the size of the parent changes
    this.drawing = SVG('floorplan').size('100%','100%')
    this.drawing.attr({id: 'floor'})
    this.drawing.stroke({color: 'black', width: 2})
    this.tables = new Array()
    this.tableGroups = new Array()
  },

  getTableById: function(id){
    var table = FloorPlan.tables.filter(function(element) {return element.drawing.attr('id') === id
    })
    return table[0]
  }, 

  getChairById: function(id){
    console.log(id)
    var chairs = new Array()
    $.each(this.tables, function(index, value) {
      $.each(value.chairs, function(index, value) {
        chairs.push(value)
      })
    })
    var chair = chairs.filter(function(element) {return element.drawing.attr('id') === id})
    console.log(chair[0])
    return chair[0]
  }
}

function Chair(id, tableId) {
  this.id = id
  this.tableId = tableId
  var nested = FloorPlan.drawing.nested()
  nested.attr({id: 'svg_' + tableId + 'chair' + id})
  var table = FloorPlan.getTableById(this.tableId)
  this.drawing = nested.rect(50,50).attr({class: 'chair', id: tableId + 'chair' + id})
  this.drawing.draggable()
  // table.group.add(this.drawing)
    // this.group.add(this.drawing)
  // table.group.add(this.drawing)
}

Chair.prototype = {
  clickEvent: function(){
    
  }
}

var AddTableButton = {
  init: function(){
    var nested = FloorPlan.drawing.nested()
    nested.attr({id: 'createTable'})
    this.width = 120
    this.height = 120
    this.drawing = nested.circle(120, 120).attr({fill: 'white'})
    this.drawing.stroke({color: 'black', width: 2})
    this.addForeignObject()
    this.drawing.center(100, 100)
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
    foreignObject.setAttribute('height', '100%')
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
    foreignObject.setAttribute('x', 800)
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
      table.createChairs(numChairs)
    })
  }
}

function Table(id) {
  var nested = FloorPlan.drawing.nested()
  nested.attr({id: 'svg_table' + id})
  console.log(nested)
  this.width = 100
  this.height = 100
  this.drawing = nested.circle(this.width,this.height).attr({fill: 'white', class: 'table', id: 'table' + id})
  this.drawing.stroke({color: 'black', width: 2})
  this.drawing.draggable()
  this.drawing.center('5%', '45%')
  this.group = FloorPlan.drawing.group()
  this.group.attr({id: 'groupTable' + id})
  this.group.add(this.drawing)
  this.drawing.click(this.ClickEvent)
}

Table.prototype = {
  
  clickEvent: function(){
    var tableId = this.drawing.attr('id')
    var form = new Form(tableId)
  },

  returnChairs: function(){
    return this.chairs
  },

  createChairs: function(numChairs){
    var tableId = this.drawing.attr('id')
    this.chairs = null
    this.chairs = new Array()
    for (var i = 0; i < numChairs; i++){
      chair = new Chair(i,tableId)
      this.chairs.push(chair)
    }
    console.log(this.chairs)
    this.placeChairs(this)
  },

  placeChairs: function(table){
    var tableX= table.drawing.attr('cx')
    var tableY= table.drawing.attr('cy')
    var counter = 1
    $.each(this.chairs, function(index, value) {
      console.log(value.drawing)
      value.drawing.move(tableX, tableY + (75 * counter))
      counter += 1
    })
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
        console.log(this.id) //ellipse id
        console.log(table) //js table object
        table.clickEvent()
        $('#foreign' + selectedItem).remove()
        selectedItem = this.id
      } 
    })
     $('body').on("click", ".chair", function(e){
      console.log(this)
      if(this.id != selectedItem){
        var chair = FloorPlan.getChairById(this.id)
        chair.clickEvent()
      } 
    })
  }
});
>>>>>>> example square is draggable and clickable
