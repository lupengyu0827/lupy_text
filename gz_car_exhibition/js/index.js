
var time = '2018-11-15 14:00:00';
//	var time = '2018-11-12 11:45:00';
		time = time.replace(/-/g,':').replace(' ',':');
		time = time.split(':');
		time = new Date(time[0],(time[1]-1),time[2],time[3],time[4],time[5]);
		time = time.getTime()
	var videoTime = '2018-11-15 15:00:00';
//var videoTime = '2018-11-12 11:45:00';
		videoTime = videoTime.replace(/-/g,':').replace(' ',':');
		videoTime = videoTime.split(':');
		videoTime = new Date(videoTime[0],(videoTime[1]-1),videoTime[2],videoTime[3],videoTime[4],videoTime[5]);
		videoTime = videoTime.getTime()
	var date = new Date();
    var now = date.getTime(); 
    
 $('.yszx_1_btn').bind('click',function(){
	if( now - time < 0 ){
		window.location.href = 'qidai.html?type=yskx&name=index' 
	}else{
		window.location.href = 'yskx.html?type=yskx' 
	}
}) 
 $('.jzyl_1_btn').bind('click',function(){
	window.location.href = 'jzyl.html?type=jzyl' 
}) 
 $('.yxc_1_btn').bind('click',function(){
	if( now - time < 0 ){
		window.location.href = 'qidai.html?type=yskx&name=index' 
	}else{
		window.location.href = 'imgList.html?type=yxc' 
	}
}) 
 $('.spzx_1_btn').bind('click',function(){
	if( now - videoTime < 0 ){
		window.location.href = 'qidai.html?type=yskx&name=index' 
	}else{
		window.location.href = 'videoList.html?type=spzx' 
	}
}) 
    
    
    
    
$('.yskx').bind('click',function(){
	if( now - time < 0 ){
		window.location.href = 'qidai.html?type=yskx&name=yskx' 
	}else{
		window.location.href = 'yskx.html?type=yskx' 
	}
})
$('.jzyl').bind('click',function(){
	window.location.href = 'jzyl.html?type=jzyl' 
})
$('.yxc').bind('click',function(){
	if( now - time < 0 ){
		window.location.href = 'qidai.html?type=yxc&name=imgList' 
	}else{
		window.location.href = 'imgList.html?type=yxc' 
	}
})
$('.spzx').bind('click',function(){
	if( now - videoTime < 0 ){
		window.location.href = 'qidai.html?type=spzx&name=videoList' 
	}else{
		window.location.href = 'videoList.html?type=spzx' 
	}
})
var type = getQueryStringByName('type');
if(type == 'jzyl'){
	$('.jzyl').attr("src",'images/jzyl_3.png')
}else if(type == 'yskx'){
	$('.yskx').attr("src",'images/yszx_3.png')
}else if ( type == 'yxc' ){
	$('.yxc').attr("src",'images/yxc_3.png')
}else if( type == 'spzx' ){
	$('.spzx').attr("src",'images/spzx_3.png')
}

var screen =  window.screen.height;
if( screen > 800 ){
	$('.tabBar').css('top','15.6rem');
	$('.imglist').css('height','12.133333rem');
	$('#LAY_demo2').css('height','6.853333rem');
	$('.videolist').css('height','12.133333rem');
}


