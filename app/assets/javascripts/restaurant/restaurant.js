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


// var Stream = {

//   init: function(){
//     window.setInterval(this.update, 5000)
//   },

//   update: function() {
//     $.get('/new_items', function(data){
//         console.log(data)
//     })
//   }
// }

var newMenu = {
  init: function(){
    $(".create-menu-button").on('click', function(e){
      $(".create-menu-button").hide()
      var restId = $('h1').data('id')
      $.get("/restaurant_profiles/"+ restId +"/menus/new", function(response){
        $(".new-menu").append(response)
      })
    })
  },
  create: function(){
    alert('ready')
    $('h1').on('submit', '.create-menu-form', function(e){
      e.preventDefault();
      alert('click')
    })
  }
}

$('document').ready(function() {
  // if ($('body.restaurant_profiles').length) {
  //   Stream.init()
  // }
  if ($('.active-carts').length){
    Carts.init()
  }
  newMenu.init();
  $('body').on('submit', '.create-menu-form', function(e){
      e.preventDefault();
      var token = $('meta[name="csrf-token"]').attr('content')
      var url = $('.create-menu-form').attr('action')
      var title = $('#new-menu-title').val()
      $.post(url, {menu_title: title, authenticity_token: token}, function(r){
        $(".new-menu").append(r)
        $('.create-menu-form').remove()
      })            
    })
});


