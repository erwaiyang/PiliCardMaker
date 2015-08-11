	/****************公用區****************/
	var img_path = "./img/sprite/";
	//background
	var bg_imgs = ['green','blue','pinkpurple'];
	var bg_img_path = img_path + "bg/";
	//border
	var border_img_path = img_path + "border/";
	//p1
	var p1_img_path = img_path + "p1/";
	//p2
	var p2_img_path = img_path + "p2/";
	//star
	var star_img = img_path + "star/star.png";
	//cost
	var cost_img_path = img_path + "cost/";
	//attr
	var attr_img_path = img_path + "attr/";

	
(function($){
	//統一刪除
	$.fn.removeThoseOnCanvas = function(condition){
		
		if(condition==false){
			this.each(function(e, val){
				//0.1是邊框跟命武的漸層
				if(e>1)
					this.remove();
			});
		}else{
			this.each(function(e, val){
				if(this.top==condition){
					this.remove();
				}
			});
		}
		
		canvas.renderAll();
		return true;
	};
	
	$.setNumbers = function(hpORmp,set_top,set_left){
		var leng = hpORmp.length;
		for(var d=leng-1; d>=0; d--){
			fabric.Image.fromURL(
				attr_img_path+hpORmp[d]+'.png',
				function(output_hp){
					canvas.add(output_hp);
				},
				{
					left:set_left + d * 18,
					top:set_top,
					width:18,
					height:22,
					selectable:false
				}
			);
		}
	};
	
	$.setCost = function(cost, set_top, set_left){
		var leng = cost.length;
		//反轉字串順序
		cost = cost.split("").reverse().join("");
		//cost只有一位數時，將圖片往左移
		var offset = (cost.length==1)? -6:0;

		for(var d=leng-1; d>=0; d--){
			fabric.Image.fromURL(
				cost_img_path + cost[d] + '.png',
				function(role_cost){
					canvas.add(role_cost);
				},
				{
					left:set_left + offset + d*(-12),
					top:set_top,
					width:18,
					height:18,
					selectable:false
				}
			);
		}
	};

})(jQuery);
	
	/****************畫布設定****************/
		var canvas = new fabric.Canvas('c');

		//設定背景
		canvas.setBackgroundImage(bg_img_path+'green.jpg', canvas.renderAll.bind(canvas));
		
		var role_border = null;
		var role_border_type = 'gold';
		//邊框顏色
		fabric.Image.fromURL(
			border_img_path+'gold.png', 
			function(o){
				canvas.add(o);
				role_border = o;
			},
			{
				selectable:false
			});
	/****************控制區****************/
		//名字輸入
		var role_name = null;
		$('#input_name').change(function(e){
			canvas.remove(role_name);
		
			var name = $(this).val();
			var vertical_name = '';
			var leng = name.length;
			for(var a=0;a<leng;a++){
				vertical_name += name[a];
				if(a!=leng){
					vertical_name += '\n';
				}
			}
			//根據字數計算TOP的位置
			var offset = (leng -3)*(-18); //以3個字為基準
			
			role_name = new fabric.Text(
				vertical_name,
				{
					opacity:0.9,
					left:16,
					top:90+offset,
					fontSize:32,
					fontFamily:'DFXingKai Std, 華康行楷體, 微軟正黑體, 標楷體',
					selectable:false
				}
			); 
			
			canvas.add(role_name).renderAll();
		});
		
		//更改勢力範圍(p1)
		var role_p1 = null;
		$("input[type=radio][name=p1]").on('change', function(e){

			canvas.remove(role_p1);
			var p1 = this.value;
			fabric.Image.fromURL(
				p1_img_path + p1 + ".png",
				function(output){
					canvas.add(output);
					role_p1 = output;
				},				
				{
					left:0,
					top:0,
					width:65,
					height:62,
					selectable:false
				}
			);					
		});
		
		//更改性格(p2)
		var role_p2 = null;
		$("input[type=radio][name=p2]").on('change', function(e){
			canvas.remove(role_p2);
			var p2 = this.value;
			fabric.Image.fromURL(
				p2_img_path + p2 + ".png",
				function(output2){
					canvas.add(output2);
					role_p2 = output2;
				},
				{
					left:266,
					top:5,
					width:36,
					height:36,
					selectable:false
				}
			); 
		});
		
		//更改COST
		var role_cost = null;
		$('#input_cost').change(function(e){
			var top = 410, left=17;
			$(window.canvas._objects).removeThoseOnCanvas(top);
			var cost = $(this).val();
			$.setCost(cost, top, left);
			canvas.renderAll();
		});
		
		//更改HP
		$('#input_hp').change(function(e){
			var hp_top = 355, hp_left=190;
			$(window.canvas._objects).removeThoseOnCanvas(hp_top);
			var role_hp = $(this).val();
			$.setNumbers(role_hp,hp_top,hp_left);
			
			canvas.renderAll();
		});
		
		//更改MP
		$('#input_mp').change(function(e){
			var mp_top = 385, mp_left = 168;
			$(window.canvas._objects).removeThoseOnCanvas(mp_top);
			var role_mp = $(this).val();
			$.setNumbers(role_mp,mp_top,mp_left);
			
			canvas.renderAll();
		});
		
		//更改星等
		$("input[type=radio][name=p3]").on('change', function(e){
			var role_star = (this.value);
			$(window.canvas._objects).removeThoseOnCanvas(30);
			for(var b=0;b<role_star;b++){
				fabric.Image.fromURL(
					star_img,
					function(output){
						canvas.add(output)
					},
					{
						left:78+(b*29),
		 				top:30,
		 				width:23,
		 				height:25,
		 				selectable:false
					}
				);
			}

			//改邊框
			var card_name = "";
			switch(role_star){
				case"1":
				case"2":
					card_name = "copper";
				break;
				case"3":
				case"4":
					card_name = "silver";
				break;
				case"5":
				case"6":
					card_name = "gold";
				break;
			}

			if(card_name!=role_border_type){
				canvas.remove(role_border);				
				fabric.Image.fromURL(
					border_img_path + card_name+".png",
					function(output){
						canvas.add(output);
						role_border = output;
					},
					{
						selectable:false
					}
				); 
				
				role_border_type = card_name;
			}
		});
		
		//更改背景
		var insert_bg_imgs = '';
		for(var c=0; c<bg_imgs.length; c++){
			insert_bg_imgs+='<a href="#" class="bg_imgs_change"><img src="'+bg_img_path+bg_imgs[c]+'.jpg" width="50px" height="50px" /></a> ';
		}
		$('div#bg_img_select').html(insert_bg_imgs);
		
		$('.bg_imgs_change').on('click',function(){
			canvas.setBackgroundImage($(this).children('img').attr('src'), canvas.renderAll.bind(canvas));
		});
		
		//角色圖片
		var role_img = null;
		function readURL(input) {
			if (input.files && input.files[0]) {
				var reader = new FileReader();
				var image  = new Image();
				
				reader.onload = function(e) {
					image.src    = e.target.result; 
					image.onload = function() {
						var w = this.width,h = this.height,t = input.type;
				
						var options = {opacity:0.6,top:0,left:0};
						if( w > 600){
							options.width = 400;
							var p = (400/w);
							options.height = h*p;
							console.log('p='+p+' '+options.width+' '+options.height);
						}
						//把圖片載入到畫布中
						fabric.Image.fromURL(e.target.result, function(oImg) {
							canvas.add(oImg);
							role_img = oImg;
							oImg.set({
								borderColor: 'red',
								cornerColor: 'green',
								cornerSize: 10,
								cornerSize: 15,
								transparentCorners: false
							});
							canvas.setActiveObject(oImg);
							//this.__canvas.push(canvas);
			
						},options);
					};
					image.onerror= function() {
						alert('Invalid file type: '+ input.type);
					};
				}
				reader.readAsDataURL(input.files[0]);
			}
		}
			$("#filePhoto").change(function() {
				canvas.remove(role_img);
				readURL(this);
			});
		

		
		//生成圖片
		$('button#create').click(function(){
			canvas.deactivateAll().renderAll();
			var c=document.getElementById("c");
			var url = c.toDataURL('image/jpeg');
			$('#download_link').html('[<a href="'+url+'" target="_blank">下載圖片(請按右鍵另存)</a>]');
			//var export_img = canvas.toDataURL("image/jpeg");
			//window.open(test,'卡片',config='height=600,width=600');
		});
		
		
		$('button.btn-lg').tooltip();
		
		//按鈕專區
			//確定放置
			$('button#moveOK').click(function(){
				role_img.sendToBack().setOpacity(1);
				canvas.renderAll();
			});
			//移除圖片
			$('button#removePic').click(function(){
				canvas.remove(role_img).renderAll();
				$('input#filePhoto').val('');
			});
			//重新選中圖片
			$('button#selectAgain').click(function(){
				canvas.setActiveObject(role_img);
			});
			//重設表單
			$('button#resetForm').click(function(){
				canvas.remove(role_img);
				$("input").val('');
				$(window.canvas._objects).removeThoseOnCanvas(false);
			});
	
	/****************更新****************/
	//調整字型
	$('#change_name_font').click(function(e){
		if($('input#input_name').val()!=''){
			role_name.setFontFamily($('input#input_name_fontfamily').val());
			canvas.renderAll();
		}
	});
	/*
	$('#change_cost_font').click(function(e){
		if($('#input_cost').val()!=''){
			role_cost.setFontFamily($('#input_cost_fontfamily').val());
			canvas.renderAll();
		}
	});
	*/
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
	
	/*****************dialog******************/
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
		}
	});