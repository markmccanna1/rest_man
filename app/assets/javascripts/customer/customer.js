var FloorPlan = {
  init: function(){
    this.draw = SVG('floorplan').size('100%','100%')
    this.tables = new Array()
  }
}

//should i extract out this object into 2 methods, the uber object which holds the array,
//and a smaller object that contains the information of a single table
var Table = {
  init: function(id){
    this.table = FloorPlan.draw.circle(100,100).attr({fill: 'white', class: 'table', id: 'table' + id})
    this.table.stroke({color: 'black', width: 2})
    this.table.draggable()
    this.table.center('5%', '35%')
    this.table.click(this.addClickEvent)

    //dummy code to make it clickable
    FloorPlan.tables.push(this)


    this.chairs = new Array()
    return this
  },

  addClickEvent: function(){
    elementId = this.attr('id')

    table = Table.getTableById(elementId)
    //this appends a button to the header, and then triggers the styling
    $('#header').append('<button> Check in </button>').trigger('create')
    table.table.fill('black')


    // $('#header').append('<form data-' + table.id + '> <input type="submit" value="check in"></form>').trigger('create')


  },

  getTableById: function(id){
    // console.log(id)
    // console.log(FloorPlan.tables)
    // console.log(FloorPlan.tables[0].table.attr('id'))
    console.log(FloorPlan.tables)
    table = FloorPlan.tables.filter(function(element) {return element.table.attr('id') === id
    })
    console.log(table[0].table.attr('id'))
    // console.log(table[0])
    return table[0]
  }
}

$('document').ready(function() {
  if($('#floorplan').length){
    FloorPlan.init()
    // Buttons.init()
    Table.init(1)
  }
});
