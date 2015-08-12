$.ajax({
	url: './modal/author.html',
	dataType: 'html',
	success: function (data){
		$('body').append(data);
	}
});
$.ajax({
	url: './modal/mustread.html',
	dataType: 'html',
	success: function (data){
		$('body').append(data);
		$('img.manual')
			.css(
				{
					'width': $(window).width() * 0.8 *0.9,
					'margin': '0 auto'
				}
			);
	}
});
$('#plaintext a').click(function (e) {
	e.preventDefault();
	$(this).tab('show');
});
$('#figures a').click(function (e) {
	e.preventDefault();
	$(this).tab('show');
});