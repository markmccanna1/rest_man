var Carts = {

  init: function(){
    window.setInterval(this.update, 5000)
  },

  update: function(){
    $.get('/restaurant_profiles/carts', function(data){
      var test = $.each(data, function(k,v) {
        $.each(v, function(i, l){
          $('.pending-carts').append('<li><a href="carts/' + l.id + '">' + l.id + '</a></li>')
        })
      })    
    })
  }
}


var Stream = {

  init: function(){
    window.setInterval(this.update, 5000)
  },

  update: function() {
    $.get('/new_items', function(data){
        console.log(data)
    })
  }
}

var newMenu = {
  hideButton: function(){
    $(".create-menu-button").on('click', function(e){
      $(".create-menu-button").hide()
      var restId = $('h1').data('id')
      $.get("/restaurant_profiles/"+ restId +"/menus/new", function(response){
        $(".new-menu").append(response)
      })
    })
  }
}

$('document').ready(function() {
  if ($('body.restaurant_profiles').length) {
    Stream.init()
  }
  if ($('.active-carts').length){
    Carts.init()
  }
  newMenu.hideButton();
});


