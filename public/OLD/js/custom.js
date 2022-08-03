$(".navbar-nav>li").find("ul").parent().prepend('<span class="hasSub"></span>');
$(".navbar-nav>li .hasSub").click(function(){
	$(this).siblings("ul").slideToggle();
});

$(document).ready(function(){
	$(window).load(function(){
	   setTimeout(function(){
	       $('#overlay').modal('show');
	   }, 2000);
	});
// $('#overlay').modal('show');

setTimeout(function() {
$('#overlay').modal('hide');
}, 15000);
});
$(document).ready(function(){
	$('.search').on('click', function(event) {                    
		$('#search').addClass('open');
		$('#search > form > .input-box').focus();
	});            
	$('#search, #search button.close').on('click keyup', function(event) {
		if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
			$(this).removeClass('open');
		}
	});            
});