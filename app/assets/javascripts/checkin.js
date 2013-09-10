$(document).ready(function(){
  $('.seat').on('click', function(e){
    var seat_id = $(this).data('seat-id');
    var token = $('meta[name="csrf-token"]').attr('content');

    if ($(this).hasClass('taken')){
      $.post('/check_out', {seat_id: seat_id, token: token})
        $(this).removeClass('taken');
    } else {
      $.post('/check_in', {seat_id: seat_id, token: token})
        $(this).addClass('taken');
    }
  });
  var url_id = window.location.pathname.split('/').reverse()[1];

  if ($('body.floor_plan').length) {
    $.ajaxSetup({cache: false})
    $.getJSON("/restaurant_profiles/" + url_id + "/floor_plan", function(data){
      var seatTaken = $.each(data, function(k,v) {
        $.each(v, function(i, l){
          var color_seat = $('div[id="seat' + l.id + '"]')
          color_seat.addClass('taken')
        })
      })
    })
  }
});
