$(function(){
  $('#call').click(function(){
    $('#show').html('....loading...');

    $.ajax({
        type: "GET",
        url: "MOCK_DATA.json",
        success:function(data){
            $('#show').html(JSON.stringify(data));
        }
    })
})
})
