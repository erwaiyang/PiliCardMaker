﻿	/****************公用區****************/
	//背景圖片
	var bg_imgs = ['green','blue','pinkpurple'];
	
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
			'./img/util/number/'+hpORmp[d]+'.png',
			function(output_hp){
				canvas.add(output_hp);
			},
			{
				left:set_left+d*17,
				top:set_top,
				width:20,
				height:20,
				selectable:false
			}
		);
			
		}
	};
	
})(jQuery);
	
	/****************畫布設定****************/
		var canvas = new fabric.Canvas('c');

		//設定背景
		canvas.setBackgroundImage('./img/bg/green.jpg', canvas.renderAll.bind(canvas));
		
		var role_border = null;
		var role_border_type = 'gold';
		//邊框顏色
		fabric.Image.fromURL(
			'./img/border/gold.png', 
			function(o){
				canvas.add(o);
				role_border = o;
			},
			{
				selectable:false
			});
		
		//漸層
		fabric.Image.fromURL(
			'./img/util/gradient_hp_mp.png', 
			function(o){
				canvas.add(o);
				o.sendBackwards(true);
			},
			{
				top:339,
				left:90,
				opacity:1,
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
					fontSize:30,
					fontFamily:'DFXingKai Std, 華康行楷體, 微軟正黑體, 標楷體',
					selectable:false
				}
			); 
			
			canvas.add(role_name).renderAll();
		});
		
		//更改勢力範圍
		var role_p1 = null;
		$('td#p1 button').click(function(e){
			canvas.remove(role_p1);
			var img_url = './img/p1/'+role_border_type+'/'+$(this).val()+'.png';
			
			fabric.Image.fromURL(
				img_url,
				function(output){
					canvas.add(output);
					role_p1 = output;
				},
				{
					left:0,
					top:0,
					width:70,
					height:66.5,
					selectable:false
				}
			); 
			
		});
		
		//更改性格
		var role_p2 = null;
		$('td#p2 button').click(function(e){
			canvas.remove(role_p2);
			var img_url2 = './img/p2/'+role_border_type+'/'+$(this).val()+'.png';
			
			fabric.Image.fromURL(
				img_url2,
				function(output2){
					canvas.add(output2);
					role_p2 = output2;
				},
				{
					left:256,
					top:2,
					width:43,
					height:43,
					selectable:false
				}
			); 
			
		});
		
		//更改COST
		var role_cost = null;
		$('#input_cost').change(function(e){
			canvas.remove(role_cost);
			
			var cost = $(this).val();
			
				var offset = 0; //以2位數為基準
				if(cost<10){
					offset = 7;
				}
			
			role_cost = new fabric.Text(
				cost,
				{
					opacity:0.95,
					left:7+offset,
					top:395,
					fontSize:24,
					fill:'rgb(255,255,255)',
					fontFamily:'Autumn, 微軟正黑體',
					selectable:false
				}
			); 
			
			canvas.add(role_cost).renderAll();
		});
		
		//更改HP
		$('#input_hp').change(function(e){
			var hp_top = 348, hp_left=190;
			$(window.canvas._objects).removeThoseOnCanvas(hp_top);
			var role_hp = $(this).val();
			$.setNumbers(role_hp,hp_top,hp_left);
			
			canvas.renderAll();
		});
		
		//更改MP
		$('#input_mp').change(function(e){
			var mp_top = 378, mp_left = 168;
			$(window.canvas._objects).removeThoseOnCanvas(mp_top);
			var role_mp = $(this).val();
			$.setNumbers(role_mp,mp_top,mp_left);
			
			canvas.renderAll();
		});
		
		//更改星等
		$('td#stars button').click(function(e){
			var role_star = $(this).val();
			$(window.canvas._objects).removeThoseOnCanvas(30);
			for(var b=0;b<role_star;b++){
				fabric.Image.fromURL(
					'./img/util/star.png',
					function(output){
						canvas.add(output);
					},
					{
						left:75+(b*29),
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
					card_name = "normal";
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
					"./img/border/"+card_name+".png",
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
			insert_bg_imgs+='<a href="#" class="bg_imgs_change"><img src="./img/bg/'+bg_imgs[c]+'.jpg" width="50px" height="50px" /></a> ';
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