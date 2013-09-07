$(document).ready(function(){
  $('.seat').on('click', function(e){
    $(this).addClass('taken');
    var seat_id = $(this).data('seat-id');
    var token = $('meta[name="csrf-token"]').attr('content')
    $.post('/check_in', {seat_id: seat_id, token: token} );
  });
});
