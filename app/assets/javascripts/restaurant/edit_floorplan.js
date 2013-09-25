var LoadTables = {

  update: function(svgDiv){
    this.floorPlan = null
    var url_id = window.location.pathname.split('/').reverse()[1];
    $.ajax({
      type: "GET",
      url: "/get_floor_plan",
      data: {id: url_id},
      async: false,
      success: function(data){
        LoadTables.floorPlan = data
      }
    })
    this.drawPlan(svgDiv)
  },

  drawPlan: function(svgDiv){
    FloorPlan.init('edit_floorplan')
    FloorPlan.drawing.attr({id: 'floor'})
    FloorPlan.drawing.stroke({color: 'black', width: 2})
    LoadController.init()
    $.each(this.floorPlan, function(key, value) {
      $.each(value, function(tableId, tableValues){
        var id = tableId
        var loadTable = new LoadTable(tableValues.positionX, tableValues.positionY, tableValues.width, tableValues.height, id)
        table = loadTable.table
        $.each(tableValues.seats, function(seatId, seatValues){
          new LoadChair(seatValues.positionX, seatValues.positionY, seatValues.width, seatValues.height, seatId, table)
        })
      })
    })
    $.each(FloorPlan.tables, function(key, table){
      table.placeChairs()
    })
  }
}


var FloorPlan = {

  init: function(svgDiv){
    this.drawing = SVG(svgDiv).size('100%','100%')
    this.drawing.attr({id: 'floor'})
    this.drawing.stroke({color: 'black', width: 2})
    this.tables = new Array()
    this.tableGroups = new Array()
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

var LoadController = {
  
  init: function(){
    this.takenIds = []
    $.each(LoadTables.floorPlan, function(key,value) {
      $.each(value, function(tableId, tableValues){
        LoadController.takenIds.push(tableId)
        $.each(tableValues.seats, function(seatId, seatValues){
          LoadController.takenIds.push(seatId)
        })
      })
    })
  }
}

function LoadChair(positionX, positionY, width, height, htmlId, table) {
  
  this.positionX = parseFloat(positionX)
  this.positionY = parseFloat(positionY)
  this.height = parseFloat(height)
  this.width = parseFloat(width)
  this.htmlId = htmlId
  this.chair = new Chair(1, table.id, table.chairSize)
  this.chair.drawing.attr({class: 'chair', id: htmlId})
  this.chair.drawing.size(this.width, this.height)
  this.chair.drawing.center(this.positionX, this.positionY)
  table.chairs.push(this.chair)
  table.group.add(this.chair.drawing) 
}

function LoadTable(positionX, positionY, height, width, htmlId) {
  
  this.positionX = positionX
  this.positionY = positionY
  this.height = height
  this.width = width
  this.htmlId = htmlId
  this.table = new Table()
  regex = /\d/
  this.table.counter = regex.exec(htmlId)[0]
  this.table.drawing.attr({fill: 'white', class: 'table', id: this.htmlId})
  this.table.group.attr({id: 'group' + this.htmlId})
  this.table.drawing.size(width, height)
  this.table.drawing.center(positionX, positionY)
  this.table.id = this.htmlId
  this.table.addToList(htmlId)
  FloorPlan.tables.push(this.table)
}

$('document').ready(function() {
  if ($('#edit_floorplan').length){
    LoadTables.update('edit_floorplan')
    LoadController.init()
    AddTableButton.init()
    SaveButton.init()
    var selectedItem = null
    $('body').on('click', 'ellipse', function(e){
      if(this.id != selectedItem){
        var table = FloorPlan.getTableById(this.id)
        if (selectedItem != null) {
          var lastItem = FloorPlan.getTableById(selectedItem)
          lastItem.removeForms()
          lastItem.drawing.fill({color: 'white'})
        }
        table.clickEvent()
        selectedItem = this.id
        table.group.draggable()
        table.drawing.fill({color: 'blue', opacity: 0.7})
      }
    })
    $('body').on('click', '.list', function(event){
      if(this.id != selectedItem){
        var id = $(this).data('id')
        var table = FloorPlan.getTableById(id)
        if (selectedItem != null) {
          FloorPlan.getTableById(selectedItem).removeForms()
        }
        table.clickEvent()
        selectedItem = id
        table.group.draggable()
      }
    })
  } 
});

