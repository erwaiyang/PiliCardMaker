$('#change_name_font').click(function(e){
	if($('input#input_name').val()!=''){
		role_name.setFontFamily($('input#input_name_fontfamily').val());
		canvas.renderAll();
	}
});
$('a#fontMode_input').click(function(){
	$('span#fontMode_input').show();
	$('span#fontMode_auto').add('#alertBox').hide();
});
$('a#fontMode_auto').click(function(){
	$('span#fontMode_input').hide();
	$('span#fontMode_auto').add('#alertBox').show();
});
$('a#fontMode_input').trigger('click');

function populateFontList(fontArr)
{
	var allFontsCounter = 0;
	var regularFontsCounter = 0;
	var totalFonts = '<select>';
	
	for (var key in fontArr)
	{
		var fontName = fontArr[key];
		// trim
		fontName = fontName.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		
		if (fontName.match(/[_\-\s]Italic$/)
			|| fontName.match(/[_\-\s](Demi)?[Bb]old$/)
			|| fontName.match(/[_\-\s]Medium$/)
			|| fontName.match(/[_\-\s](Ultra)?[Ll]ight$/)
			|| fontName.match(/[_\-\s]Condensed$/)
			)
		{
			
		}
		else
		{
			fontName = fontName.replace(/\s*Regular$/, '')
				//.replace(/\sStd\s.*/, '')
				;
			totalFonts += '<option value="'+fontName+'">'+fontName+'</option>';
			regularFontsCounter++;
		}
		
		allFontsCounter++;
	}
	
	totalFonts += '</select>';
	
	$('span#fontList').html(totalFonts);
	
	$('span#fontList select').on('change', function() {
		if($('#input_name').val()!=''){
			role_name.setFontFamily( this.value );
			canvas.renderAll();
		}
	});
}