var express = require('express');
var http = require('http');
var app = express();

app.get('/city',function(req,res){
    //获取用户传递过来的参数
    var arg = req.query['kw'];
    console.log(arg);
    httpSearch(arg,function(info){
        res.send(JSON.parse(info));
    });
});
app.get("*",function(req,res){
	res.header("Access-Control-Allow-Origin","*");
	res.sendFile(__dirname + req.path);
});
app.listen(9999,function(){
	console.log('服务已经启动');
})
function httpSearch(kwVal,callback){
    http.get('http://m.mayi.com/ajax/searchmore/?offset=1&isNear=1&query_str=' + kwVal, function(httpRes) {
        var buffers = [];
        httpRes.on('data', function(chunk) {
            buffers.push(chunk);
        });
        httpRes.on('end', function(chunk) {
            var wholeData = Buffer.concat(buffers);
            var dataStr = wholeData.toString('utf8');
            callback(wholeData);
        });
    }).on('error', function(e) {
        console.log(e);
    });
}