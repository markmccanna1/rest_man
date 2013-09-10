$(document).ready(function(){
  $('#get_floorplan').on('click', 'rect', function(e){
    // console.log(5)
    // alert(this)
    // var seat_id = $(this).attr('id').split('').reverse()[0];

    // console.log(this.attr('id'))
    var url_id = window.location.pathname.split('/').reverse()[0]
    var seat_id = $(this).attr('id')
    console.log(seat_id)
    // console.log($(this).attr('id'))
    // console.log(seat_id)
    // console.log(url_id);
    var token = $('meta[name="csrf-token"]').attr('content');

    if ($(this).hasClass('taken')){
      $.post('/check_out', {seat_id: seat_id, url_id: url_id, authenticity_token: token})
        // $(this).attr('class', 'seat');
        $(this).removeClass('taken');
    } else {
        $.post('/check_in', {seat_id: seat_id, url_id: url_id, authenticity_token: token})
        $(this).attr('class', 'taken');
        // alert("in check_in")
    }
  });

  var url_id = window.location.pathname.split('/').reverse()[0];

  if ($('body.floor_plan').length) {
    $.ajaxSetup({cache: false})
    $.getJSON("/floor_plan/" + url_id + "", function(data){
      console.log(data)
      $.each(data, function(k,v) {
        console.log(k)
        $.each(v, function(index, seat){
          console.log(seat)
          console.log(seat.html_id)
          SVG.get(seat.html_id).attr({class: 'taken'})
        })
        // $.each(v, function(i, l){
        //   $(l).addClass('taken')
        //   console.log(l)
          // var color_seat = $('rect[id="table1chair' + l.id + '"]')
          // var color_seat = $(l).attr('html_id')
          // console.log(color_seat)
        // })
      })
    })
  }
});
