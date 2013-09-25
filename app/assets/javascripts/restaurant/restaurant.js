var Carts = {

  init: function(){
    window.setInterval(this.update, 5000)
  },

  update: function(){
    var url_id = parseInt(($('h1').attr('id')).split('').reverse()[0])
    $.get('/restaurant_profiles/'+ url_id + '/carts', function(data){
      var test = $.each(data, function(k,v) {
        $.each(v, function(i, l){
          if($("#" + l.id + "").length == 0) {
          $('.pending-carts').append('<li class="order"><a id="' + l.id + '" href="carts/' + l.id + '">' + 'Cart #'  + l.id + 'Table' + l.table.id + 'Seat' + l.seat.id +  '</a></li>')
          }
        })
      })
    })
  }
}

var Seats = {

  init: function(){
    window.setInterval(this.update, 5000)
  },

  update: function(){
      var floorPlanId = $('h1').attr('data-id')
    $.get('/floor_plan/' + floorPlanId, function(response) {
      var div = $('#get_floorplan', $(response))
      $('#get_floorplan').html(response)
    })
  }
}

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
    $('h1').on('submit', '.create-menu-form', function(e){
      e.preventDefault();
    })
  }
} 
  
$('document').ready(function() {

  newMenu.init();

  if ($('#check-seats').length){
    Seats.init()
  }

  if ($('.active-carts').length){
    Carts.init()
  }

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
