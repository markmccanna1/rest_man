function drawTable(positionX, positionY, height, width, htmlId) {
  this.positionX = positionX
  this.positionY = positionY
  this.height = height
  this.width = width
  this.htmlId = htmlId
  this.draw()
}

drawTable.prototype = {

  draw: function() {
    var nested = loadTables.drawing.nested()
    this.drawing = nested.circle(this.width,this.height).attr({fill: 'white', class: 'table', id: this.htmlId})
    this.drawing.stroke({color: 'black', width: 2})
    this.drawing.center(this.positionX, this.positionY)
  }
}

function drawChair(positionX, positionY, height, width, htmlId) {
  this.positionX = positionX
  this.positionY = positionY
  this.height = height
  this.width = width
  this.htmlId = htmlId
  this.draw()
}

drawChair.prototype = {

  draw: function() {
  var nested = loadTables.drawing.nested()
  this.drawing = nested.rect(this.width, this.height).attr({class: 'seat', id: this.htmlId})
  this.drawing.move(this.positionX, this.positionY)
  }
}

var loadTables = {

  init: function(){
    window.setInterval(this.update, 5000)
  },

  update: function(){
    this.floorPlan = null
  var url_id = window.location.pathname.split('/').reverse()[0];

    $.ajax({
      type: "GET",
      url: "/get_floor_plan",
      data: {id: url_id},
      async: false,
      success: function(data){
        loadTables.floorPlan = data
      }
    })
    this.drawPlan()
  },

  drawPlan: function(){
    this.drawing = SVG('get_floorplan').size('100%','100%')
    this.drawing.attr({id: 'floor'})
    this.drawing.stroke({color: 'black', width: 2})

    $.each(this.floorPlan, function(key, value) {
      $.each(value, function(tableId, tableValues){
        var id = tableId
        new drawTable(tableValues.positionX, tableValues.positionY, tableValues.width, tableValues.height, id)
        $.each(tableValues.seats, function(seatId, seatValues){
          new drawChair(seatValues.positionX, seatValues.positionY, seatValues.width, seatValues.height, seatId)
        })
      })
    })
    var chair = new drawChair(0,0,0,0,0)
    var table = new drawTable(0,0,0,0,0)
  }
}

$('document').ready(function() {
  if ($('#customer-floor-plan').length) {
    loadTables.update();
  }
});
