$(function(){
	
	//图片视频切换
	$('.sj_btn_bg').bind('click',function(){
		$('.btn_on').removeClass('btn_on');
		$(this).addClass('btn_on');
		var dataId = $(this).attr('data-id');
		if( dataId == 1 ){
			$('.pic').show();
			$('.video').hide();
		}else{
			$('.pic').hide();
			$('.video').show();
		}
	});
	
	//点击播放视频
	var video = document.getElementById('myVideo');
	$('.video li').bind('click',function(){
		var playUrl = $(this).attr('data-url');
		$('#myVideo').attr('src',playUrl);
		video.play();
		$('#myVideo').show();
	})
	video.addEventListener('pause',function(){  
	    $('#myVideo').hide(); 
	}) 
	
	
})
