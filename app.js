`use strict`;
const http = require('http');
const path = require('path');
const artTemplate = require('art-template');
// 处理键值对
const querystring = require('querystring');
let myMsgs = [{
    nickname: 'jenney',
    msg: 'danny, how are you?'
},{
    nickname: 'danny',
    msg: 'i am fine, thank you ,and you?'
}];

let server = http.createServer((req, res)=> {
    // 判断是否是提交表单，是的话加入一条消息
    // 访问首页的话渲染数据
    if (req.method == 'GET' && req.url == '/') {
        let htmlStr = artTemplate(path.join(__dirname, 'index.html'),{
            msgs: myMsgs
        });
        res.end(htmlStr);
    }else if (req.method == 'POST' && req.url == '/sendMsg') {
        req.on('data', data=> {
            let str = data.toString();
            // 表单数据键值对字符串
            let formObj = querystring.parse(str);
            myMsgs.push ({
                nickname: formObj.nickname,
                msg: formObj.msg
            });
            // 响应数据页面
            let htmlStr = artTemplate(path.join(__dirname, 'index.html'),{
                msgs: myMsgs
            });
            res.end(htmlStr);
        })
    }else {
        res.end('ok');
    }
});
server.listen(8888);