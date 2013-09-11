$(document).ready(function(){
  $('#get_floorplan').on('click', 'rect', function(e){
    // console.log(5)
    alert($(this).closest('rect').attr('class'))

    var url_id = window.location.pathname.split('/').reverse()[0]
    var seat_id = $(this).attr('id')
    console.log(seat_id)
    var token = $('meta[name="csrf-token"]').attr('content');

    if ($(this).closest('rect').attr('class') === 'taken'){
      // console.log($(this).hasClass('taken'))
      console.log('check_out')
      $.post('/check_out', {seat_id: seat_id, url_id: url_id, authenticity_token: token})
        // $(this).attr('class', 'seat');
        $(this).attr('rect[class="seat"]');
    }
    if ($(this).closest('rect').attr('class') === 'seat'){
        console.log('checkin')
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
