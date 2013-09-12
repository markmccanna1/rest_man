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
//maybe you want a list of tables that lets you select the one you click on the list
//can you make it so that the item is only draggable if its inside the box?

var FloorPlan = {
  init: function(){
    this.drawing = SVG('floorplan').size('100%','100%')
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

function Chair(id, tableId, size) {
  this.id = id
  this.tableId = tableId
  this.width = size
  this.height = size
  var table = FloorPlan.getTableById(this.tableId)
  this.drawing = nested.rect(50,50).attr({class: 'chair', id: tableId + 'chair' + id})
  this.drawing.draggable()
  this.drawing = FloorPlan.drawing.rect(this.width,this.height).attr({class: 'chair', id: tableId + 'chair' + id})
  this.drawing.fill({color: 'black', opacity: 0.7})
  table.group.add(this.drawing)
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
  FloorPlan.tableGroups.push(this.group)
  this.addToList()
}

Table.prototype = {

  //method for adding forms to the sidebar
  clickEvent: function(){
    this.appendAddChairsButton()
    this.appendTableSizeButtons()
    this.appendChairSizeButtons()
    this.appendDeleteButton()
  },

  addToList: function(){
    console.log(this)
    $('#tables').append('<button data-id="'+ this.id +'" id="button' + this.id + '"class="list">' + this.id + '</button>')
  },

  appendTableSizeButtons: function(){
    $('#form' + this.id).append('Size of Table <button id="increase_t"> Increase </button> <button id="decrease_t"> Decrease </button>')
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
        table.placeChairs(table)
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
        table.placeChairs(table)
      }
    })
  },

  appendAddChairsButton: function(){
    $('#input_forms').append('<div id="form'+ this.id + '">' + this.id + '<form id="chairsForm"> Number of Chairs <input id="numChairs" type="text"><input type="submit"></form></div>')
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
    $('#form' + this.id).append('Size of Chairs <button id="increase_c"> Increase </button> <button id="decrease_c"> Decrease </button>')
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
      table.placeChairs(table)
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
      table.placeChairs(table)
    })

  },

  appendDeleteButton: function(){
    $('#form' + this.id).append('<button id="delete"> Delete Table </button>')
    this.deleteButtonEvent()
  },

  deleteButtonEvent: function(){
    var id = this.id
    $('#delete').on('click', function(event) {
      $('#group' + id).remove()
      $('#form' + id).remove()
      $('#button' + id).remove()
    })
<<<<<<< HEAD
  }
}

function Table(id) {
  var nested = FloorPlan.drawing.nested()
  nested.attr({id: 'svg_table' + id})
  // var nested = FloorPlan.drawing.nested()
  // nested.attr({id: 'svg_table' + id})
  this.width = 100
  this.height = 100
  this.drawing = FloorPlan.drawing.circle(this.width,this.height).attr({fill: 'white', class: 'table', id: 'table' + id})
  this.drawing.stroke({color: 'black', width: 2})
  this.drawing.center(100, 150)
  this.group = FloorPlan.drawing.group()
  this.group.attr({id: 'groupTable' + id})
  this.group.add(this.drawing)
  // this.group.draggable()
  console.log(this.group)
  this.chairSize = 28
  FloorPlan.tableGroups.push(this.group)
  this.drawing.click(this.ClickEvent)
}

Table.prototype = {

  clickEvent: function(){
    var tableId = this.drawing.attr('id')
    var tableMenu = new Form(tableId)
=======
  },

  removeForms: function(){
<<<<<<< HEAD
    //triggered when the item is deselected
>>>>>>> enchanced OO, forms are now part of the table class
=======
    $('#form' + this.id).remove()
>>>>>>> added the ability to select chairs via a list
  },

  returnChairs: function(){
    return this.chairs
  },

<<<<<<< HEAD
  //you have to make sure you remove the old chair svg squares, fool
=======
>>>>>>> added the ability to select chairs via a list
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
    this.placeChairs(this)
  },

  placeChairs: function(table){
    var tableX = table.drawing.attr('cx')
    var tableY = table.drawing.attr('cy')
    var counter = 1
    $.each(this.chairs, function(index, value) {
      value.drawing.move(tableX, tableY + (75 * counter))
    var scalar = table.chairs.length
    var tableX= table.drawing.attr('cx')
    var tableY= table.drawing.attr('cy')
    var counter = 0
    var hypotSide = (table.width / 2.0) * 1.5
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

  getSin: function(degrees){
    return Math.sin(degrees * (Math.PI / 180))
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
    // var nested = FloorPlan.drawing.nested()
    $('body').on('click', 'ellipse', function(e){
      if(this.id != selectedItem){
        var table = FloorPlan.getTableById(this.id)
<<<<<<< HEAD
=======
        if (selectedItem != null) {
          var lastItem = FloorPlan.getTableById(selectedItem)
          lastItem.removeForms()
          lastItem.drawing.fill({color: 'white'})
          // lastItem.group.fill({color: 'black'})
        }
>>>>>>> added the ability to select chairs via a list
        table.clickEvent()
        selectedItem = this.id
<<<<<<< HEAD
<<<<<<< HEAD
=======

        var id = table.group.attr('id')

        var draggee = document.getElementById(id)
        // $(draggee).draggable(


        $(draggee).draggable({containment: '#floor', drag: function(event, ui) {
          var left = ui.position.left
          var top = ui.position.top
          var id = table.group.attr('id')

          var draggee = document.getElementById(id)

          var floorSize = FloorPlan.drawing.rbox()
          var width = floorSize.width
          var height = floorSize.height

        $(draggee).draggable({containment: '#floor', cursorAt: { left: 0, top: 0 },
          drag: function(event, ui) {
          // var position = table.group.node.attributes[1].value
          // console.log(ui.position.left)
          // console.log(ui.position.top)
          // console.log(event.target.attributes)
          var position = table.group.node.attributes[1].value
          // console.log(position)

          // var regex = /(\d+)/
          // var result
          // console.log(regex.exec(positio)

          table.group.center({x: ui.position.left, y: ui.position.top})

          // if (ui.position.left >= width) {
          //   table.group.center({x: width, y: ui.position.top})
          // }

          // if (ui.position.top >= height) {
          //   table.group.center({x: ui.position.left, y: height})
          // }
          // table.group.transform({x: ui.position.left, y: ui.position.top})

          } 
        })

        $(draggee).on('dragstop', function(event, ui) {
          var left = ui.position.left
          var top = ui.position.top
          console.log(left)
          console.log(top)
          
          // table.group.center(ui.position.left, ui.position.top)
        })
          }
        }) 
>>>>>>> using regex to get dragged position
      }
    })
    // alert('body')
    $('body').on("click", ".chair", function(e){
      alert('wtf')
    $('body').on("click", "rect", function(e){
      if(this.id != selectedItem){
        var chair = FloorPlan.getChairById(this.id)
        chair.clickEvent()
      }
=======
        // var groupId = table.group.attr('id')

        //svg command for making things draggable
        table.group.draggable()
        table.drawing.fill({color: 'blue', opacity: 0.7})
        // table.group.fill({color: 'blue', opacity: 0.7})
        // var draggee = document.getElementById(groupId)

        // $(draggee).draggable({containment: '#floor', 
        //   drag: function(event, ui) {
        //     var left = ui.position.left
        //     var top = ui.position.top
        //     var id = table.group.attr('id')
        //     var draggee = document.getElementById(id)
        //     var floorSize = FloorPlan.drawing.rbox()
        //     var width = floorSize.width
        //     var height = floorSize.height

        //     table.group.transform({x: ui.position.left, y: ui.position.top})
        //   }
        // })
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
      // selectedItem = this.data(id)
      // console.log(selectedItem)
      // console.log(this)
>>>>>>> added the ability to select chairs via a list
    })
  } 
});
