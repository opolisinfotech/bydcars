$(document).ready(function(){
    $( "#ssubmit" ).click(function() {
		var first_name = $('input[name=first_name]').val();
		var last_name = $('input[name=last_name]').val();
		var email = $('input[name=email]').val();
        $.ajax({
            type: 'post',
            url: '/subscribenewsletter',
            data: {first_name: first_name,last_name:last_name, email:email},
            dataType: 'text'
        })
        .done(function(data){
			$('#smsg').html(data);
        });
    });
});