var es, gutil, request;

es = require('event-stream');
gutil = require('gulp-util');
request = require('request');

module.exports = function(client_config) {
  var headers;
  return es.mapSync(function(file) {
    var uploadPath;
    if (!file.isBuffer()) {
      return file;
    }
    uploadPath = file.path.replace(process.cwd(), '');
    uploadPath = uploadPath.replace(new RegExp('\\\\', 'g'), '/');
    request.get({
      url: client_config.authEndpoint,
      headers: {
        'X-Auth-Key': client_config.apiKey,
        'X-Auth-User': client_config.user
      }
    }, function(err, res) {
      var auth_token, data, storage_url, upload_path;
      if (err) {
        gutil.log(gutil.colors.red('[FAILED]', err));
      }
      data = JSON.parse(res.body);
      auth_token = res.headers['x-auth-token'];
      storage_url = res.headers['x-storage-url'];
      upload_path = storage_url + '/' + client_config.container + uploadPath;
      file.pipe(request.put({
        url: upload_path,
        headers: {
          'X-Auth-Token': auth_token
        }
      }, function(err, res, body) {
        if (err) {
          gutil.log(gutil.colors.red('[FAILED]', file.path + ' -> ' + uploadPath));
        } else {
          gutil.log(gutil.colors.green('[SUCCESS]', file.path + ' -> ' + uploadPath));
        }
      }));
    });
    return file;
  });
};
