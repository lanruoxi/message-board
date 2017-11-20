var fs = require('fa');
module.exports = function (s) {
    s.on('request', function (req, res) {
        req.on('data', function (data) {
            fs.writeFile('E:/b.txt', req.connection.remoteAddress + ':' +
                data.toString() + '\r\n', {
                    flag: 'a'
                }, function (err) {

                })
        });
    });
}