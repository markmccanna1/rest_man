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
});

