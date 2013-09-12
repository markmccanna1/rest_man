$(document).ready(function(){
  $('#get_floorplan').on('click', 'rect', function(e){
    var url_id = window.location.pathname.split('/').reverse()[0]
    var seat_id = $(this).attr('id')
    var token = $('meta[name="csrf-token"]').attr('content');

    if ($(this).closest('rect').attr('class') === 'taken'){
      $.post('/check_out', {seat_id: seat_id, url_id: url_id, authenticity_token: token})
        $(this).attr('rect[class="seat"]');
    }
    if ($(this).closest('rect').attr('class') === 'seat' && $('h1').attr('id') === 'hide-confirm') {
       alert('hello');
        $('#dialog').dialog({
          autoOpen: false, width: 400, resizable: false, modal: true,
          buttons: {
            "Confirm" : function(){
              $.post('/check_in', {seat_id: seat_id, url_id: url_id, authenticity_token: token})
              $(this).attr('class', 'taken');
            },
            "Cancel" : function(){
              $(this).dialog("close");
            }
          }
        });
       $('#dialog').dialog('open');
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
