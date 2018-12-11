//_host = ""
_host ="http://wx.fractalist.com.cn/benzweb";
//游戏通关
function GameSuccess(game, success) {
	alert(game);alert(success)
    var url = _host + "/api/benz/colorsubmit";
    var params = {
        SpendTime: game
    };
    ajax(url, params, success);
}
function formatDuring(mss) {
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = (mss % (1000 * 60)) / 1000;
    if( minutes < 10 ){
    	minutes = '0'+minutes;
    }
    if(seconds < 10 ){
    	seconds = '0'+seconds;
    }
    seconds = seconds.toString();
    seconds = seconds.split('.');
    if( seconds.length >1 ){
    	switch ( seconds[1].length ){
	    	case 0:
	    		seconds = seconds[0]+'.000'
	    		break;
	    	case 1:
	    		seconds = seconds[0]+'.'+seconds[1]+'00'
	    		break;
	    	case 2:
	    		seconds = seconds[0]+'.'+seconds[1]+'0'
	    		break;
	    	case 3:
	    		seconds = seconds[0]+'.'+seconds[1]
	    		break;	
	    	default:
	    		seconds = seconds[0]+'.000'
	    		break;
	    }
    }else{
    	seconds = seconds[0]+'.000'
    }
    
    return  minutes + ":" + seconds;
}