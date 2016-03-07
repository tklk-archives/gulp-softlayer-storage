# gulp-softlayer-storage

> SoftLayer Object Store plugin for [gulp](http://gulpjs.com/)

## Usage

First, install `gulp-softlayer-storage` as a development dependency:

```shell
npm install --save-dev gulp-softlayer-storage
```

Setup your softlayer.json file
```javascript
{
  "user": "SL12345-1:SL12345",
  "apiKey": "68e656b251e67e8358bef8483ab0d51c6619f3e7a1a9f0e75838d41ff368f728",
  "container": "dev.example.com",
  "authEndpoint": "https://tor01.objectstorage.softlayer.net/auth/v1.0/"
}
```

Then, use it in your `gulpfile.js`:
```javascript
var sl_obj = require("gulp-softlayer-storage");

sl_creds = JSON.parse(fs.readFileSync('./softlayer.json'));
gulp.src('./dist/**')
    .pipe(sl_obj(sl_creds));
```

## Notes

This is based on the [gulp-s3](https://www.npmjs.com/package/gulp-s3) gulp plugin

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
