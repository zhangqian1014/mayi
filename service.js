var express = require('express');
var http = require('http');
var app = express();
var qs = require('querystring'); 

app.get('/city',function(req,res){
    //获取用户传递过来的参数
    var arg = req.query['kw'];
    // console.log(arg);
    httpSearch(arg,function(info){
        res.send(JSON.parse(info));
    });
});
app.get('/area',function(req,res){
    //获取用户传递过来的参数
    var arg = req.query['kw'];
    console.log(arg);
    httpSearchArea(arg,function(info){
        res.send(info);
        console.log(info);
    });
});
app.get('/getSuggest',function(request,response){
    var value = request.query['value'];

    console.log(value);
    var post_data = {  
        searchkey:value,
        cityid:'0',
        pagefrom:'list',
        platfrom:2
    }; 
    var content = qs.stringify(post_data);  
    var options = {  
        hostname: 'm.mayi.com',  
        path: '/getSuggest',  
        method: 'POST',
        headers: {  
            'Content-Type':'application/x-www-form-urlencoded'
            // 'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',  
            // 'Content-Length':Buffer.byteLength(postData) 
        }  
    };
    var req = http.request(options, function (res) {  
        res.setEncoding('utf-8'); 
        var arr = []; 
        res.on('data', function (chunk) {
            // arr.push(chunk);
            // response.send(Buffer.concat(arr));
            response.send(JSON.parse(chunk));
        });  
    });  
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
    });
    // write data to request body  
    req.write(content);  
    req.end(); 
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
function httpSearchArea(kwVal,callback){
    http.get('http://m.mayi.com/' + kwVal + '/?pa=position', function(httpRes) {
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
// app.get('/sitesearch/:keyword' , function (req , res) {
//     var url = req.params.keyword;
//     // 查询本机ip
//     // http://z.qyer.com/qcross/home/ajax?action=sitesearch&keyword=b&timer=1478686648677&_=1478678019964
//     var sreq = http.request({
//         host:     'z.qyer.com', // 目标主机
//         path:     '/qcross/home/ajax?action=sitesearch&keyword='+url, // 目标路径
//         method:   'get' // 请求方式
//     }, function(sres){
//         sres.pipe(res);
//         sres.on('end', function(){
//             console.log('done');
//         });
//     });
//     if (/POST|PUT/i.test(req.method)) {
//         req.pipe(sreq);
//     } else {
//         sreq.end();
//     }
// }