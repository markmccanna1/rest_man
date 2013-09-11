$(document).ready(function(){
  $('#get_floorplan').on('click', 'rect', function(e){
    var url_id = window.location.pathname.split('/').reverse()[0]
    var seat_id = $(this).attr('id')
    var token = $('meta[name="csrf-token"]').attr('content');

    if ($(this).closest('rect').attr('class') === 'taken'){
      $.post('/check_out', {seat_id: seat_id, url_id: url_id, authenticity_token: token})
        $(this).attr('rect[class="seat"]');
    }
    if ($(this).closest('rect').attr('class') === 'seat'){
        $.post('/check_in', {seat_id: seat_id, url_id: url_id, authenticity_token: token})
        confirm('Are you sure you want to sit here')
        $(this).attr('class', 'taken');
    }
  });

  var url_id = window.location.pathname.split('/').reverse()[0];

  if ($('body.floor_plan').length) {
    $.ajaxSetup({cache: false})
    $.getJSON("/floor_plan/" + url_id + "", function(data){
      $.each(data, function(k,v) {
        $.each(v, function(index, seat){
          SVG.get(seat.html_id).attr({class: 'taken'})
        })
      })
    })
  }
});
