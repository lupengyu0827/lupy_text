//_host = ""
_host ="https://zw.benz.wx.fractalist.com.cn";
//游戏通关
function GameSuccess(game, success) {
    var url = _host + "/api/Game/Success";
    var params = {
        game: game
    };
    ajax(url, params, success);
}