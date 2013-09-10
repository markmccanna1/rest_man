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
//= require_tree .
//= require ./customer/customer
//= require ./restaurant/restaurant

function UserException(message){
  this.message = message
  this.name = "UserException"
}

var FloorPlan = {
  init: function(){
    this.drawing = SVG('floorplan').size('100%','100%')
    this.drawing.attr({id: 'floor'})
    this.drawing.stroke({color: 'black', width: 2})
    this.tables = new Array()
  },

  getTableById: function(id){
    var table = FloorPlan.tables.filter(function(element) {
      return element.drawing.attr('id') === id
    })
    return table[0]
  }, 

  getChairById: function(id){
    var chairs = new Array()
    $.each(this.tables, function(index, value) {
      $.each(value.chairs, function(index, value) {
        chairs.push(value)
      })
    })
    var chair = chairs.filter(function(element) {return element.drawing.attr('id') === id})
    if (chair.length > 0) {
    return chair[0]
    } else {
      throw new UserException("ChairNotFound");
    }
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
}

Chair.prototype = {
  clickEvent: function(){
    
  }
}

var AddTableButton = {
  init: function(){
    $('#create_table').click(function(event){
      AddTableButton.addClickEvent()
    })
    this.tableCounter = 1
  },

  addClickEvent: function(){
    var table = new Table(AddTableButton.tableCounter)
    AddTableButton.tableCounter += 1
    FloorPlan.tables.push(table)
  },

  getTableById: function(id){
    var table = FloorPlan.tables.filter(function(element) {
      return element.drawing.attr('id') === id
    })
    return table[0]
  }
}

function Form(tableId) {
  this.tableId = tableId
  this.addForeignObject()
}

Form.prototype = {
  addForeignObject: function(){
    var table = FloorPlan.getTableById(this.tableId)
    $('#input_forms').append(this.form())
    this.submitEvent(this.tableId)
  },

  form: function(tableId){
    var chairForm = '<div id="form'+ this.tableId + '">' + this.tableId + '<form> Number of Chairs <input id="numChairs" type="text"><input type="submit"></form></div>'
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
  this.width = 100
  this.height = 100
  this.drawing = nested.circle(this.width,this.height).attr({fill: 'white', class: 'table', id: 'table' + id})
  this.drawing.stroke({color: 'black', width: 2})
  this.drawing.draggable()
  this.drawing.center(100, 150)
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
    this.placeChairs(this)
  },

  placeChairs: function(table){
    var tableX = table.drawing.attr('cx')
    var tableY = table.drawing.attr('cy')
    var counter = 1
    $.each(this.chairs, function(index, value) {
      value.drawing.move(tableX, tableY + (75 * counter))
      counter += 1
    })
  }
}

var SaveButton = {
  init: function(){
    $('body').on('click', '#save', function(e){
      SaveButton.tablesHash = {}
      $.each(FloorPlan.tables, function(Tableindex, table){
        SaveButton.tablesHash[table.drawing.attr('id')] = {positionX: table.drawing.attr('cx'), positionY: table.drawing.attr('cy'), width: table.width, height: table.height, chairs: {}}
          $.each(table.chairs, function(index, chair) {
            SaveButton.tablesHash[table.drawing.attr('id')].chairs[chair.drawing.attr('id')] = {positionX: chair.drawing.attr('x'), positionY: chair.drawing.attr('y'), width: chair.drawing.attr('width'), height: chair.drawing.attr('height')}
          })
      })
      var token = $('meta[name="csrf-token"]').attr('content')
      $.post('/test', {authenticity_token: token, floorplan: SaveButton.tablesHash}
      ) 
    })
  }
}


$('document').ready(function() {
  if($('#floorplan').length){
    FloorPlan.init()
    AddTableButton.init()
    SaveButton.init()
    var selectedItem = null
    var nested = FloorPlan.drawing.nested()
    $('body').on('click', 'ellipse', function(e){
      if(this.id != selectedItem){
        var table = FloorPlan.getTableById(this.id)
        // console.log(this.id) //ellipse id
        // console.log(table) //js table object
        table.clickEvent()
        $('#form' + selectedItem).remove()
        selectedItem = this.id
      } 
    })
    // alert('body')
    $('body').on("click", ".chair", function(e){
      alert('wtf')
      // console.log(this)
      if(this.id != selectedItem){
        var chair = FloorPlan.getChairById(this.id)
        chair.clickEvent()
      } 
    })
  }
});
