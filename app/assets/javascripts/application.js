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
//= require jquery.mobile
//
//= require_tree .
var FloorPlan = {
  init: function(){
    this.draw = SVG('floorplan').size('100%','100%')
  }
}

var AddItem = {
  init: function(){
    this.chairItem()
    this.tableItem()
    this.chairCounter = 1
    this.tableCounter = 1
  },

  chairItem: function(){
    this.createChair = FloorPlan.draw.rect(80, 80).attr({fill: 'black', id: 'create_chair'})
    this.createChair.stroke({color: 'black', width: 2})
    this.createChair.move("90%", '5%')
    this.createChair.click(this.addChair)
  },

  addChair: function (){
    console.log(AddItem.chairCounter)
    Chair.init(AddItem.chairCounter)
    AddItem.chairCounter += 1
  },

  tableItem: function(){
    this.createTable = FloorPlan.draw.circle(120, 120).attr({fill: 'black', id: 'create_table'})
    this.createTable.stroke({color: 'black', width: 2})
    this.createTable.center('5%', '15%')
    this.createTable.click(this.addTable)
  },

  addTable: function (){
    console.log(AddItem.tableCounter)
    Table.init(AddItem.tableCounter)
    AddItem.tableCounter += 1
  }
}

var Chair = {
  init: function(id){
    this.chair = FloorPlan.draw.rect(40,40).attr({fill: 'white', class: 'chair', id: 'chair' + id})
    this.chair.stroke({color: 'black', width: 2})
    this.chair.draggable()
    this.chair.move('90%', '25%')
    console.log(SVG.get(this.chair))
  }
}

var Table = {
  init: function(id){
    this.table = FloorPlan.draw.circle(80,80).attr({fill: 'white', class: 'table', id: 'table' + id})
    this.table.stroke({color: 'black', width: 2})
    this.table.draggable()
    this.table.center('5%', '40%')
  }
}




$('document').ready(function() {
  if($('#floorplan').length){
    console.log("element exists");


    FloorPlan.init()
    AddItem.init()
    // Chair.init()

    // var draw = SVG('floorplan').size('100%','100%')
    // var rect = draw.rect(100,100).attr({fill: 'pink', id: 'square'})
    // rect.stroke({color: 'black', width: 2})


    //we only want the items to be draggable on the page where the restaurant is
    //creating the floorplan
    // rect.draggable()




    // $('body').on('tap', '#square', function() {
    //   $(this)

    // })


  }
});
