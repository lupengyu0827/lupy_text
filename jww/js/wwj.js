var wwj =  function ( G ){
	var timeOut ,timer ; //爪子运动计时
	//奖品列表
	var drawList = ['Me','咖啡','甜品','皮具','网球','娃娃玩偶','手机壳','童童','C级车模','E级车模','GLC级车模','GLA级车模'];
	var jiangpin = Math.floor((Math.random()*drawList.length)); 
		jiangpin = drawList[jiangpin]
		$('.zhuamb span').html(jiangpin)
	var c = 0; //娃娃的
	
	//初始化爪子高度
	$(".paw").css('margin-left','0');
	$(".pawer").css({
		height: 20
	}); //缩回来(绳子)
	$(".pawerPic").css({
		top: 40
	}); //缩回来(爪子)
	
	scrollLeft(); //娃娃滚动
	/*声明变量*/
	//活动区域的高
	var areaHeight = $(".area").height(); 
	var areaWidth = $("body").width();
	//爪子宽
	var pawWidth = $(".paw").width();
	//爪子伸长的距离
	var long = areaHeight - $('#pack').height() - $(".paw").height() + 50 ;
	//倒计时秒数
	var S = 30;
	$('.miao').html(S);
	var G = G; //当前关卡
	$('.guanqia').html(G)
	function daojishi(){
	 	S--
	 	$('.miao').html(S);
	 	if( S <= 0 ){
	 		window.clearInterval(timeOut);
	 		window.clearInterval(newTimes);
	 		window.clearInterval(timer);
	 		$('.page2').html('');
	 		$('.box').hide();
	 		$('.box3').show();
	 	}
	}
	newTimes = setInterval( daojishi , 1000 );
	
	/*娃娃滚动*/
	function scrollLeft() {
		var speed = 20;
		var yu = $("#sel1").html();
		$("#sel2").html(yu);
		var deep = 10;
		var p =  $(".paw").offset().left; //爪子初始位置
		var E = 1 ; //运动的状态
		//爪子的滚动
		function timeLeft(){
			if( p < 0 ){
				E = 1
			}else if( p >= areaWidth-pawWidth  ){
				E = 2;
			}
			if( E == 1 ){
				$(".paw").css('margin-left',p);
				p++
			}else{
				$(".paw").css('margin-left',p);
				p--
			}
		}
		timeOut = setInterval(timeLeft, deep);
		//奖品的滚动
		function Marquee() {
			c++
//			$("#sel2").width() - $("#pack").scrollLeft() <= 0 ($("#sel2").width()-$('body').width() ) <= $("#pack").scrollLeft()
			if( ($("#sel1").width()-$('body').width()+300 ) <= $("#pack").scrollLeft() ) {
				c = 0
				$("#pack").scrollLeft(c);
			} else {
				$("#pack").scrollLeft(c);
			}
		} //Marquee结束
		timer = setInterval(Marquee, speed);
		/*点击按钮*/
		$(".btn_star").bind('click',function(){})
		$(".btn_star").bind('click', function() {
			$(".pawerPic").addClass("on");
			$(".win img").attr("src", '');
			//替换娃娃图片
			window.clearInterval(timeOut)
			$(this).css({
				display: "none"
			}) //单纯的按钮样式
			$(".btn_end").css({
				display: "block"
			})
			$(".pawer").animate({
				height: long
			}, 1000); //伸下去(绳子)
			$(".pawerPic").animate({
				top: long + 20
			}, 1000); //伸下去(爪子)
			/*抓到娃娃*/
			function fn(t_img) {
				$(".win img").attr("src", t_img)//t_img
			};
			/*娃娃消失*/
			function end() {
				$(".pawerPic").removeClass("on")
			}
			/*按钮点击*/
			function btn() {
				$(".btn_star").css({
					display: "block"
				})
				$(".btn_end").css({
					display: "none"
				})
				
			} //控制按钮是否可以点击
			/*判断抓没抓到娃娃*/
			if_ok = setTimeout(ok_no, 1000);

			function ok_no() {
				var obj = new Object();    // 或者 var obj = {};
				obj.a = 1;  // 要保存的变量
				var typeTime = getNowFormatDate()+' 23:59:59';
			 	obj.time =  Date.parse( typeTime ) - Date.parse(new Date());            // 过期时间
			  	obj.date = Date.parse(new Date());   // 保存变量时的那个时间点，这里以时间戳为例
			 	var objString = JSON.stringify(obj);    // 由于 localStorage 只能保存字符串内容，所以这里要先把对象转换成 JSON 字符串
				localStorage.setItem('userType',objString);
				 //首先获取爪子的位置(这里是固定的)
				var talon = $(".pawerPic").offset().left + 20;
				//娃哇的名称
				var wwmc = $('.zhuamb span').html();
				/*打印出此时此刻每个娃娃的位置*/
				var zhua = false ;
				for(var i = 0; i < $("#pack img").length; i++) {
					//此时此刻每个娃娃的位置
					var l = $("#pack img").eq(i).offset().left + 20;
					if(l - 20 <= talon && talon <= l + 20) {
						//抓住娃娃
						var t_img = $("#pack img").eq(i).attr("src")
						time_zz = setTimeout(fn(t_img), 0);
						var dataIndex = $("#pack img").eq(i).attr("data-name");
						$("#pack img").eq(i).css('visibility','hidden')
						if( G >= 3 && dataIndex == wwmc){
							//抓到三次跳转网球页面
							window.clearInterval(newTimes);
							window.clearInterval(timeOut);
							window.clearInterval(timer);
							$('.page2').html('');
							$('.box').hide()
							$('.box2').show();
							GameSuccess('jww', function( res ){
								if( res.errcode == 0 ){
									setTimeout(function(){
										location.href = res.data.url;
									},3000)
								}
							})
							
						}else{
							//抓到球了。
							if( dataIndex == wwmc ){
								//抓到正确的球
								window.clearInterval(newTimes);
								S = 30;
								G++;
								var jiangpin = Math.floor((Math.random()*drawList.length)); 
								jiangpin = drawList[jiangpin]
								$('.zhuamb span').html(jiangpin)
								$('.guanqia').html(G)
								newTimes = setInterval( daojishi , 1000 );
//								deep = deep-10;
								timeOut = setInterval(timeLeft, deep);
//								speed = speed-10;
//							 	var timer = setInterval(Marquee, speed);
							}else{
								//抓到错误的球
								window.clearInterval(newTimes);
								window.clearInterval(timeOut);
								window.clearInterval(timer);
								setTimeout(function(){
									$('.fr').hide()
									$('.page2').html('');
									$('.box').hide()
									$('.box3').show();
								},1000)
								return false;
							}
						}
						zhua = true;
						return false;
					}
				}
				//什么都没有抓到跳转答题
				if( zhua == false ){
					window.clearInterval(newTimes);
					window.clearInterval(timeOut);
					window.clearInterval(timer);
					setTimeout(function(){
						$('.page2').html('');
						$('.box').hide()
						$('.box3').show();
					},1000)
					return false;
				}
			}
			/*事件调用*/
			time_zz=setTimeout(fn,2000);//抓到娃娃
			time_xs = setTimeout(end, 2000); //娃娃消失
			time_ww = setTimeout(btn, 2000); //按钮点击
			$(".pawer").animate({
				height: 20
			}, 1000); //缩回来(绳子)
			$(".pawerPic").animate({
				top: 40
			}, 1000); //缩回来(爪子)
		})
	} //scrollLeft结束
}
