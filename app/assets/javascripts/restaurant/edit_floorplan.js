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
    this.drawing = SVG('edit_floorplan').size('100%','100%')
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
  if($('#edit_floorplan').length){
    loadTables.update()
    FloorPlan.init()
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

