var Stream = {

  init: function(){
    window.setInterval(this.update, 5000)
  },

  update: function() {
    console.log(1)
    $.get('/new_items', function(data){
        console.log(3)
        console.log(data)
    })
  }
}

$('document').ready(function() {
  if ($('body.restaurant_profiles').length) {
    Stream.init()
  }
});

