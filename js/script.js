$(document).ready(function() {
	var totalWidth = 0;
	var positions = new Array();

	$('#slides .slide').each(function(i) {
		// get slider widths
		positions[i] = totalWidth;
		totalWidth += $(this).width();

		// widths
		if(!$(this).width()) {
			alert("Please add width to images");
			return false;
		}
	});

	// set width
	$('#slides').width(totalWidth);

	$('#menu ul li a').click(function(e, keepScroll) {
		$('li.product').removeClass('active').addClass('inactive');
		
		// add active class to parent

		$(this).parent().addClass('active');

		var pos = $(this).parent().prevAll('.product').length;

		$('#slides').stop().animate({marginLeft: -positions[pos] + 'px'}, 450);

		// prevent default
		e.preventDefault();

		// stop autoscroll
		if(!autoScroll) { clearInterval(itvl); }
	});

	// set first image as active
	$('#menu ul li.product:first').addClass('active').siblings().addClass('inactive');

	// autoscroll
	var current = 1;
	function autoScroll() {
		if(current === -1) return false;

		$('#menu ul li a').eq(current%$('#menu ul li a').length).trigger('click', [true]);

		current++;
	};

	// duration for autoscroll
	var duration = 5000;
	var itvl = setInterval(function() {
		autoScroll();
	}, duration);
});