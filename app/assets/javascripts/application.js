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
<<<<<<< HEAD
//= require ./customer/customer
//= require ./restaurant/restaurant
=======

var Chair = {
  init: function(){
      this.chair = Plan.draw.rect(100,100).attr({fill: 'white', class: 'chair'})
      this.chair.stroke({color: 'black', width: 2})
      this.chair.draggable()
      this.addClickEvent()
  },

  addClickEvent: function(){
    $('body').on('tap', '.chair', function(event) {
      console.log(5)
      $('#check_in').load('/check_in.html')

      // $.mobile.loadPage("/check_in", {pageContainer: $('#')})
    })
  }
}

var Plan = {
  init: function(){
    this.draw = SVG('floorplan').size('100%','100%')

  },

  create_chair: function(){

  }
}



$('document').ready(function() {
  if($('#floorplan').length){
    console.log("element exists");


    Plan.init()
    Chair.init()

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
>>>>>>> example square is draggable and clickable
