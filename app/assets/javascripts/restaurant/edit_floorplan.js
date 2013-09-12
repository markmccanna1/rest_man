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
        // console.log(LoadTables.floorPlan)
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
          console.log(seatValues)
          new LoadChair(seatValues.positionX, seatValues.positionY, seatValues.width, seatValues.height, seatId, table)
        })
      })
      // console.log(loadTable)
    })
    console.log(FloorPlan.tables)
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

  //html id goes in, it uses the drawing id, not the 
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

// function Table(id) {
//   this.width = 100
//   this.height = 100
//   // console.log(FloorPlan.drawing)
//   this.drawing = FloorPlan.drawing.circle(this.width,this.height).attr({fill: 'white', class: 'table', id: 'table' + id})
//   this.drawing.stroke({color: 'black', width: 2})
//   this.drawing.center(100, 150)
//   this.group = FloorPlan.drawing.group()
//   // console.log(this.group)
//   this.group.attr({id: 'grouptable' + id})
//   this.group.add(this.drawing)
//   this.id = 'table' + id
//   this.chairSize = 28
//   this.counter = id
//   this.seatDistance = 1.5
//   FloorPlan.tableGroups.push(this.group)
//   // this.addToList()
// }

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

// function Chair(id, tableId, size) {
//   this.id = id
//   this.tableId = tableId
//   this.width = size
//   this.height = size
//   var table = FloorPlan.getTableById(this.tableId)
//   this.drawing = FloorPlan.drawing.rect(this.width,this.height).attr({class: 'chair', id: tableId + 'chair' + id})
//   this.drawing.fill({color: 'black', opacity: 0.7})
//   table.group.add(this.drawing)
// }

function LoadChair(positionX, positionY, width, height, htmlId, table) {
  this.positionX = parseFloat(positionX)
  console.log(this.positionX)
  this.positionY = parseFloat(positionY)
  console.log(this.positionY)
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
  console.log(positionX)
  console.log(positionY)
  this.positionX = positionX
  this.positionY = positionY
  this.height = height
  this.width = width
  this.htmlId = htmlId
  this.table = new Table()
  // this.chairs = new Array
  this.table.drawing.attr({fill: 'white', class: 'table', id: this.htmlId})
  this.table.group.attr({id: 'group' + this.htmlId})
  this.table.drawing.size(width, height)
  console.log(positionX, positionY)
  this.table.drawing.center(positionX, positionY)
  this.table.id = this.htmlId
  FloorPlan.tables.push(this.table)
}

$('document').ready(function() {
  if ($('#edit_floorplan').length){
    LoadTables.update('edit_floorplan')
    LoadController.init()
    // EditFloorPlan.init()
    AddTableButton.init()
    SaveButton.init()

    var selectedItem = null
    $('body').on('click', 'ellipse', function(e){
      if(this.id != selectedItem){
        var table = FloorPlan.getTableById(this.id)
        if (selectedItem != null) {
          var lastItem = EditFloorPlan.getTableById(selectedItem)
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

