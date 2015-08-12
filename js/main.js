﻿	/****************公用區****************/
	var img_path = "./img/sprite/";
	//background
	var bg_imgs = ['green','blue','pinkpurple'];
	var bg_img_path = img_path + "bg/";
	//border
	var border_img_path = img_path + "border/";
	//star
	var star_img = img_path + "star/star.png";
	//attr
	var attr_img_path = img_path + "attr/";

	//各個在畫面上的位置
	var myObj = {
		'img':{
			instance: null
		},
		'border': {
			top:0,
			left:0,
			instance: null
		},
		'star': {
			top:30,
			left:78,
			instance: null,
			img_path: img_path + 'star/'
		},
		'name': {
			top:90,
			left:16,
			instance: null
		},
		'p1': {
			top:0,
			left:0,
			width:65,
			height:62,
			img_path: img_path + 'p1/'
		},
		'p2': {
			top:5,
			left:266,
			width:36,
			height:36,
			img_path: img_path + 'p2/'
		},
		'cost': {
			top:410,
			left:17,
			img_path: img_path + 'cost/'
		},
		'hp': {
			top:355,
			left:190,
			width: 18,
			height: 22,
			img_path: img_path + 'attr/'
		},
		'mp': {
			top:385,
			left:168,
			width: 18,
			height: 22,
			img_path: img_path + 'attr/'
		}
	};
	//console.log('myObj.p1.instance='+myObj.p1.instance);
	
(function($){
	//統一刪除
	$.fn.removeThoseOnCanvas = function(condition){
		
		if(condition=="all"){
			this.each(function(e, val){
				//console.log("e="+e+" val="+val);
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

	//for cost, hp and mp
	$.setNumber = function(type, value){
		var length = value.length;

		var setOptions = {
			'path': null,
			'top': 0,
			'left': 0,
			'left_offset':0,
			'width':18,
			'height':18
		};
		switch (type){
			case "hp":
			case "mp":
				setOptions.path = myObj[type].img_path;
				setOptions.top = myObj[type].top;
				setOptions.left = myObj[type].left;
				setOptions.left_offset = myObj[type].width;
				setOptions.height = myObj[type].height;
			break;
			case "cost":
				//反轉順序
				value = value.split("").reverse().join("");
				//cost只有一位數時，將圖片往左移
				var one_offset = (length==1)? -6:0;
				setOptions.path = myObj.cost.img_path;
				setOptions.top = myObj.cost.top;
				setOptions.left = myObj.cost.left + one_offset;
				setOptions.left_offset = -13;
			break;
			default:
				return false;
		}

		//remove old one
		$(window.canvas._objects).removeThoseOnCanvas(setOptions.top);

		//add numbers on the canvas
		for(var d=length-1; d>=0; d--){
			fabric.Image.fromURL(
				setOptions.path + value[d] + '.png',
				function(output){
					canvas.add(output);
				},
				{
					left: setOptions.left + d * (setOptions.left_offset),
					top: setOptions.top,
					width:18,
					height: setOptions.height,
					selectable:false
				}
			);
		}

		//render
		canvas.renderAll();
	};

	//for p1 and p2
	$.setProp1n2 = function(type, value){
		var setOptions = {
			img_path: null,
			width: 0,
			height: 0,
			top: 0,
			left: 0
		};
		//將setOptions的全部欄位 都以p1或p2的值填入
		$.each(setOptions, function(index, value){	
			setOptions[index] = myObj[type][index];
		});
		//刪掉舊的
		$(window.canvas._objects).each(function(e, val){
			//currentSrc 是已有的圖片網址
			if(this._originalElement.currentSrc.indexOf(setOptions.img_path.substr(1))>=0){
				this.remove();
				return false;
			}
		});
		fabric.Image.fromURL(
			setOptions.img_path + value + ".png",
			function(output){
				canvas.add(output);
			},				
			{
				left: setOptions.left,
				top: setOptions.top,
				width: setOptions.width,
				height: setOptions.height,
				selectable:false
			}
		);
		canvas.renderAll();
	};

})(jQuery);
	
	/****************畫布設定****************/
		var canvas = new fabric.Canvas('c');

		//設定背景
		canvas.setBackgroundImage(bg_img_path+'green.jpg', canvas.renderAll.bind(canvas));
		
		//var role_border = null;
		var role_border_type = 'gold';

		function setBorder(role_border_type){
			fabric.Image.fromURL(
				border_img_path+ role_border_type +'.png', 
				function(output){
					canvas.add(output);
					myObj.border.instance = output;
				},
				{
					selectable:false
				}
			);
		}
		setBorder(role_border_type);

	/****************控制區****************/
		//名字輸入
		$('#input_name').change(function(e){
			//清除舊的
			canvas.remove(myObj.name.instance);
			
			var name = $(this).val();
			//把名字轉換成直行
			var vertical_name = '';
			var length = name.length;
			for(var a=0;a<length;a++){
				vertical_name += name[a];
				//尚未到達最後一字時，每個字換一行
				if(a!=length){
					vertical_name += '\n';
				}
			}

			//根據字數計算TOP的位置
			var offset = (length -3)*(-18); //以3個字為基準
			
			myObj.name.instance = 
			new fabric.Text(
				vertical_name,
				{
					opacity:0.9,
					left: myObj.name.left,
					top: myObj.name.top + offset,
					fontSize:32,
					fontFamily:'DFXingKai Std, 華康行楷體, 微軟正黑體, 標楷體',
					selectable:false
				}
			); 
			
			canvas.add(myObj.name.instance).renderAll();
		});
		//更改勢力範圍(p1)
		$("input[type=radio][name=p1]").on('change', function(e){
			$.setProp1n2('p1', this.value);
		});
		
		//更改性格(p2)
		$("input[type=radio][name=p2]").on('change', function(e){
			$.setProp1n2('p2', this.value);
		});
		
		//更改COST
		$('#input_cost').change(function(e){
			$.setNumber('cost', $(this).val());
		});
		
		//更改HP
		$('#input_hp').change(function(e){
			$.setNumber('hp', $(this).val());
		});
		
		//更改MP
		$('#input_mp').change(function(e){
			$.setNumber('mp', $(this).val());
		});
		
		//更改星等
		$("input[type=radio][name=p3]").on('change', function(e){
			//更改星星：先刪光再放上去
			var star = (this.value);
			$(window.canvas._objects).removeThoseOnCanvas(30);
			for(var b=0;b<star;b++){
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
			switch(star){
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
				canvas.remove(myObj.border.instance);	
				setBorder(card_name);
				//將邊框送到倒數第二的圖層
				myObj.border.instance.sendToBack();
				if(role_img!=null){
					role_img.sendToBack().setOpacity(1);
				}
				
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
							//console.log('p='+p+' '+options.width+' '+options.height);
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
								transparentCorners: false,
								lockUniScaling :true
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
			//重新生成的提示
			$(this).toggleClass('btn-success btn-warning');
			$('#btn_hint').toggleClass('bg-success bg-warning');
		});
		
		
		$('button.btn-lg').tooltip();
		
		//按鈕專區
			//確定放置
			$('button#moveOK').click(function(){
				if(role_img==null) return;
				role_img.sendToBack().setOpacity(1);
				canvas.renderAll();
			});
			//移除圖片
			$('button#removePic').click(function(){
				if(role_img==null) return;
				canvas.remove(role_img).renderAll();
				$('input#filePhoto').val('');
			});
			//重新選中圖片
			$('button#selectAgain').click(function(){
				if(role_img==null) return;
				canvas.setActiveObject(role_img);
			});
			//重設表單
			$('button#resetForm').click(function(){
				//清除角色圖片
				if(role_img!=null){
					canvas.remove(role_img);
				}
				//清除三個數字輸入欄位
				$("input[type=number]").val('').trigger('change');
				//清除p1,p2,star按鈕
				$('input[type=radio]').removeProp('checked')
					.parent('label').removeClass('active');
				//清除邊框、星、p1、p2				
				$(window.canvas._objects).removeThoseOnCanvas("all");
				//恢復預設邊框
				role_border_type = 'gold';
				setBorder(role_border_type);
			});
		//三個隨機按鈕
			$('button.random_btn').click(function(e){
				var input = "input_" + (this.value);
				var output = 0;
				switch (this.value){
					case "cost":
						output = getRandCost(role_border_type);
					break;
					case "hp":
						output = getRandHpOrMp(role_border_type);
					break;
					case "mp":
						output = getRandHpOrMp(role_border_type);
					break;

				}
				$('#' + input ).val(output).trigger('change');
			});

			//COST
			function getRandCost(role_border_type){
				var rand_cost = 0;
				switch(role_border_type){
					case "copper":
						rand_cost = getRandomInt(3,10);
					break;
					case "silver":
						rand_cost = getRandomInt(10,17);
					break;
					case "gold":
					default:
						rand_cost = getRandomInt(12,31);
					break;
				}
				return rand_cost;
			}
			//hp or mp
			function getRandHpOrMp(role_border_type){
				var rand = 0;
				switch(role_border_type){
					case "copper":
						rand = getRandomInt(200,600);
					break;
					case "silver":
						rand = getRandomInt(500,2000);
					break;
					case "gold":
					default:
						rand = getRandomInt(1800,4200);
					break;
				}
				return rand;
			}