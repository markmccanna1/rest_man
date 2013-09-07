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
    this.draw = SVG('floorplan').size('100%','100%')
    this.tables = new Array()
  }
}

var Buttons = {
  init: function(){
    this.chairButton()
    this.tableButton()
    //do we want the chair counter on the table object?
    this.chairCounter = 1
    this.tableCounter = 1
  },

  chairButton: function(){
    this.createChair = FloorPlan.draw.rect(80, 80).attr({fill: 'black', id: 'create_chair'})
    this.createChair.stroke({color: 'black', width: 2})
    this.createChair.move("90%", '5%')
    this.createChair.click(this.addChair)
  },

  addChair: function (){
    console.log(Buttons.chairCounter)
    Chair.init(Buttons.chairCounter)
    Buttons.chairCounter += 1
  },

  tableButton: function(){
    this.createTable = FloorPlan.draw.circle(120, 120).attr({fill: 'black', id: 'create_table'})
    this.createTable.stroke({color: 'black', width: 2})
    this.createTable.center('5%', '15%')
    this.createTable.click(this.addTable)
  },

  addTable: function (){
    table = Table.init(Buttons.tableCounter)
    FloorPlan.tables.push(table)
    Buttons.tableCounter += 1
  }
}

var Chair = {
  init: function(id){
    this.chair = FloorPlan.draw.rect(40,40).attr({fill: 'white', class: 'chair', id: 'chair' + id})
    this.chair.stroke({color: 'black', width: 2})
    this.chair.draggable()
    this.chair.move('90%', '25%')
    this.chair.click(this.addClickEvent)
    return this
  },

  addClickEvent: function(){
    console.log("chair")

  }



}

//this appends a button to the header, and then triggers the styling
// $('#header').append('<button> Check in </button>').trigger('create')


//should i extract out this object into 2 methods, the uber object which holds the array,
//and a smaller object that contains the information of a single table

function Table(id) {
  this.drawing = FloorPlan.draw.circle(100,100).attr({fill: 'white', })
}

var Table = {
  init: function(id){
    this.table = FloorPlan.draw.circle(100,100).attr({fill: 'white', class: 'table', id: 'table' + id})
    this.table.stroke({color: 'black', width: 2})
    this.table.draggable()
    this.table.center('5%', '35%')
    this.table.click(this.addClickEvent)
    this.chairs = new Array()
    return this
  },

  addClickEvent: function(){
    elementId = this.attr('id')
    console.log(elementId)
    table = Table.getTableById(elementId)
    console.log(table)
      // $('#header').append('<form data-' + this.table.id'> ').trigger('create')


  },

  getTableById: function(id){
    // console.log(id)
    // console.log(FloorPlan.tables)
    // console.log(FloorPlan.tables[0].table.attr('id'))
    table = FloorPlan.tables.filter(function(element) {return element.table.attr('id') === id
    })
    // console.log(table[0].table.attr('id'))
    // console.log(table[0])
    return table[0]
  }
}

$('document').ready(function() {
  if($('#floorplan').length){
    FloorPlan.init()
    Buttons.init()
  }
});
>>>>>>> example square is draggable and clickable
