function UserException(message){
  
  this.message = message
  this.name = "UserException"
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

function Chair(id, tableId, size) {
  
  this.id = id
  this.tableId = tableId
  this.width = size
  this.height = size
  var table = FloorPlan.getTableById(this.tableId)
  this.drawing = FloorPlan.drawing.rect(this.width,this.height).attr({class: 'chair', id: tableId + 'chair' + id})
  this.drawing.fill({color: 'black', opacity: 0.7})
  table.group.add(this.drawing)
}

function Table(id) {
  
  this.width = 100
  this.height = 100
  this.drawing = FloorPlan.drawing.circle(this.width,this.height).attr({fill: 'white', class: 'table', id: 'table' + id})
  this.drawing.stroke({color: 'black', width: 2})
  this.drawing.center(100, 150)
  this.group = FloorPlan.drawing.group()
  this.group.attr({id: 'grouptable' + id})
  this.group.add(this.drawing)
  this.id = 'table' + id
  this.chairSize = 28
  this.counter = id
  this.chairs = new Array
  this.seatDistance = 1.5
  FloorPlan.tableGroups.push(this.group)
  if (typeof htmlId === 'undefined'){
    this.addToList()
  }
}

Table.prototype = {

  clickEvent: function(){
    this.appendAddChairsButton()
    this.appendTableSizeButtons()
    this.appendChairSizeButtons()
    this.appendDeleteButton()
    this.appendSeatDistanceButtons()
  },

  createChairs: function(numChairs){
    var tableId = this.drawing.attr('id')
    if (this.chairs != null) {
      $.each(this.chairs, function(key, chair) {
        $('#' + chair.drawing.attr('id')).remove()
      })
    }
    this.chairs = null
    this.chairs = new Array()
    for (var i = 0; i < numChairs; i++){
      chair = new Chair(i,tableId, this.chairSize)
      this.chairs.push(chair)
    }
    this.placeChairs()
  },

  placeChairs: function(){
    var table = this
    var seatDistance = this.seatDistance
    var tableX= this.drawing.attr('cx')
    var tableY= this.drawing.attr('cy')
    var counter = 0
    var hypotSide = (this.width / 2.0) * seatDistance
    var degreeSpacing = 360.0 / this.chairs.length
    $.each(this.chairs, function(index, value) {
      var circleDegree = degreeSpacing * counter
      var insideAngle = circleDegree % 90.0
      var oppositeSide = (hypotSide * table.getSin(insideAngle) ) / table.getSin(90)
      var otherAngle = 90 - insideAngle
      var otherSide = (hypotSide * table.getSin(otherAngle) ) / table.getSin(90)
      if (circleDegree >= 270){
        value.drawing.center(tableX - otherSide, tableY - oppositeSide)
      } else if (circleDegree >= 180) {
        value.drawing.center(tableX - oppositeSide, tableY + otherSide)
      } else if (circleDegree >= 90) {
        value.drawing.center(tableX + otherSide, tableY + oppositeSide)
      } else if (circleDegree > 0) {
        value.drawing.center(tableX + oppositeSide, tableY - otherSide)
      } else if (circleDegree === 0) {
        value.drawing.center(tableX + oppositeSide, tableY - otherSide)
      } else {
        value.drawing.center(tableX + oppositeSide, tableY + otherSide)
      }
      counter += 1
    })
  },

  seatDistanceIncreaseEvent: function(){
    var table = this
    $('#increase_d').on('click', function(event) {
      table.seatDistance += 0.1
      if (table.chairs != null) {
        table.placeChairs()
      }
    })
  },

  seatDistanceDecreaseEvent: function(){
    var table = this
    $('#decrease_d').on('click', function(event) {
      table.seatDistance -= 0.1
      if (table.chairs != null) {
        table.placeChairs()
      }
    })
  },

  appendSeatDistanceButtons: function(){
    $('#form' + this.id).append('Seat Distance From Table <button class="button" id="increase_d"> Increase </button> <button class="button" id="decrease_d"> Decrease </button>').trigger("create")
    this.seatDistanceIncreaseEvent()
    this.seatDistanceDecreaseEvent()
  },

  getSin: function(degrees){
    return Math.sin(degrees * (Math.PI / 180))
  },

  removeForms: function(){
    $('#form' + this.id).remove()
  },

  addToList: function(htmlId){
    $('#tables').append('<button class="button" data-id="'+ this.id +'" id="button' + this.id + '"class="list"> Table ' + this.counter + '</button>')
  },

  appendTableSizeButtons: function(){
    $('#form' + this.id).append('Size of Table <button class="button" id="increase_t"> Increase </button> <button class="button" id="decrease_t"> Decrease </button>')
    this.tableSizeIncreaseEvent()
    this.tableSizeDecreaseEvent()
  },

  tableSizeIncreaseEvent: function(){
    var table = this
    $('#increase_t').on('click', function(event) {
      var width = table.width
      var height = table.height
      table.drawing.size(width + 10, height + 10)
      table.width += 10
      table.height += 10
      if (table.chairs != null) {
        table.placeChairs()
      }
    })
  },

  tableSizeDecreaseEvent: function(){
    var table = this
    $('#decrease_t').on('click', function(event) {
      var width = table.width
      var height = table.height
      table.drawing.size(width - 10, height - 10)
      table.width -= 10
      table.height -= 10
      if (table.chairs != null) {
        table.placeChairs()
      }
    })
  },

  appendAddChairsButton: function(){
    $('#input_forms').append('<div id="form'+ this.id + '"> Table ' + this.counter + '<form id="chairsForm"> Number of Chairs <input id="numChairs" type="text"><input type="submit"></form></div>')
    this.addChairsEvent()
  },

  addChairsEvent: function(){
    var table = this
    $('#chairsForm').submit(function(event){
      event.preventDefault()
      numChairs = $('#numChairs').val()
      table.createChairs(numChairs)
    })
  },

  appendChairSizeButtons: function(){
    $('#form' + this.id).append('Size of Chairs <button class="button" id="increase_c"> Increase </button> <button class="button" id="decrease_c"> Decrease </button>')
    this.chairSizeIncreaseEvent()
    this.chairSizeDecreaseEvent()
  },

  chairSizeDecreaseEvent: function(){
    var table = this
    $('#decrease_c').on('click', function(event) {
      var width = table.chairSize
      var height = table.chairSize
      if (table.chairs != null) {
        $.each(table.chairs, function(key, chair) {
          chair.drawing.size(width - 2, height - 2)
        })
      }
      table.chairSize -= 2
      table.placeChairs()
    })
  },

  chairSizeIncreaseEvent: function(){
    var table = this
    $('#increase_c').on('click', function(event) {
      var width = table.chairSize
      var height = table.chairSize
      if (table.chairs != null) {
        $.each(table.chairs, function(key, chair) {
          chair.drawing.size(width + 2, height + 2)
        })
      }
      table.chairSize += 2
      table.placeChairs()
    })
  },

  appendDeleteButton: function(){
    $('#form' + this.id).append('<button class="button" id="delete"> Delete Table </button>')
    this.deleteButtonEvent()
  },

  deleteButtonEvent: function(){
    var id = this.id
    $('#delete').on('click', function(event) {
      $('#group' + id).remove()
      $('#form' + id).remove()
      $('#button' + id).remove()
    })
  }
}

var SaveButton = {
  init: function(){
    $('body').on('click', '#save', function(e){
      SaveButton.tablesHash = {}
      SaveButton.groupTransformValues = {}
      $.each(FloorPlan.tables, function(Tableindex, table){
        SaveButton.tablesHash[table.drawing.attr('id')] = {positionX: table.drawing.attr('cx'), positionY: table.drawing.attr('cy'), width: table.width, height: table.height, chairs: {}}
        SaveButton.groupTransformValues[table.drawing.attr('id')] = {xOffset: table.group.trans.x, yOffset: table.group.trans.y}
        $.each(table.chairs, function(index, chair) {
          SaveButton.tablesHash[table.drawing.attr('id')].chairs[chair.drawing.attr('id')] = {positionX: chair.drawing.attr('x'), positionY: chair.drawing.attr('y'), width: chair.drawing.attr('width'), height: chair.drawing.attr('height')}
        })
      })
      var token = $('meta[name="csrf-token"]').attr('content')
      $.post('/save_floorplan', {authenticity_token: token, floorplan: SaveButton.tablesHash, offsets: SaveButton.groupTransformValues})
    })
  }
}

$('document').ready(function() {
  if($('#create_floorplan').length){
    FloorPlan.init('create_floorplan')
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
        $('#form').trigger('create')
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

