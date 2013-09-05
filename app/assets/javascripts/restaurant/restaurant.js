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

$('document').ready(function() {
  if ($('body.restaurant_profiles').length) {
    Stream.init()
  }
  if ($('.active-carts').length){
    Carts.init()
  }
});

