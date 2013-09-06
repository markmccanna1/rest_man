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
    console.log(elementId)

    var idPat = /\d/

    //get the integer that refers to the objects id on the page
    var dataTag = idPat.exec(elementId)[0]

    console.log(dataTag[0])

    //creates the form that sends the post request to the db
    var form = '<form action="/stream" method="post" id="check_in"> <input type="submit" value="Check In"> <input type="hidden" value="'+ elementId + '" name=example[id]> </form>'


    $('#header').append(form)
    table.table.fill('black')
    //turn off the click event on the svg element
    Table.table.click(null)


    // $('#header').append('<form data-' + table.id + '> <input type="submit" value="check in"></form>').trigger('create')


  },

  getTableById: function(id){
    table = FloorPlan.tables.filter(function(element) {return element.table.attr('id') === id
    })
    return table[0]
  }
}

$('document').ready(function() {
   if ($('body.customer_profiles').length) {
    console.log("Page generated by the customer controller.");
  }
  if($('#floorplan').length){
    FloorPlan.init()
    // Buttons.init()
    Table.init(1)
  }
});
