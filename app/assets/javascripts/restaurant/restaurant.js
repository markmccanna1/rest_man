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
          $('.pending-carts').append('<li><a id="' + l.id + '" href="carts/' + l.id + '">' + l.id + '</a></li>')
          }
        })
      })
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
  }
}

$('document').ready(function() {
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
