var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    livereload = require('gulp-livereload'),
    uglify = require('gulp-uglify'),
    webpack = require('webpack-stream'),

    // 服务器...
    st   = require('st'),
    http = require('http'),
    open = require('opn'),

    plumber = require('gulp-plumber'),

    clean = require('gulp-clean'),
    zip = require('gulp-zip'),

    replace = require('gulp-replace');

var config = require('./config.json');

// HTML
gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist/'));
});

// img
gulp.task('img', function() {
    return gulp.src('src/img/*')
        .pipe(gulp.dest('dist/img'));
});

// styles
gulp.task('sass', function() {
    return sass('src/css/index.scss', {
            style: 'expanded', // nested,compact,expanded,compressed
            // sourcemap: true
        })
        .pipe(plumber())
        .pipe(autoprefixer('last 4 version', 'safari 5', 'firefox', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('dist/css'))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css/min'));
});

// js 打包
gulp.task("bundle", function() {
    return gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/js/'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/min'));
});

// server 
gulp.task('server', function(done) {
    http.createServer(
        st({
            path: __dirname + '/dist',
            index: 'index.html',
            cache: false
        })
    ).listen(9991, done);
});


// default tasks
gulp.task('default', ['watch'], function() {
    gulp.start('html', 'sass', 'bundle', 'img', 'server');
    open('http://localhost:9991');
});


// watch 
gulp.task('watch', function() {
    livereload.listen();

    gulp.watch(['src/**/*.js', 'src/**/*.jsx'], ['bundle']);

    gulp.watch(['src/**/*.scss'], ['sass']);

    gulp.watch(['src/*.html'], ['html']);

    gulp.watch(['src/img/*'], ['img']);

    gulp.watch(['dist/**']).on('change', function(file) {
        livereload.changed(file.path);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////
//
// 以下是项目发布到release目录中的过程
// 基于以下假设：
// 1、html中的脚本样式、地址都是"./js/xx.js"、"./css/xx.css"格式
// 2、js、css 中只会引用到图片

// build 
gulp.task('build', function() {
    gulp.start('html', 'sass', 'bundle', 'img');
});


// html 文件中脚本样式路径替换
gulp.task('htmlReplace', function() {
    return gulp.src(['./dist/*.html'])
        .pipe(replace(/(\.\.\/)?\.\/js\/([a-zA-Z0-9\.\-]+\.js)/g,  config['js_dir'] + '$2' ))
        .pipe(replace(/(\.\.\/)?\.\/css\/([a-zA-Z0-9\.\-]+\.css)/g,  config['css_dir'] + '$2' ))
        .pipe(gulp.dest('build/'));
});

// css/js 中文件路径替换
gulp.task('cssReplace', function() {
    return gulp.src(['./dist/css/min/*.css', './dist/js/min/*.js'])
        .pipe(replace(/(\.\.\/)?js\/([a-zA-Z0-9\.\-]+\.js)/g,  config['js_dir'] + '$2' ))
        .pipe(replace(/(\.\.\/)?css\/([a-zA-Z0-9\.\-]+\.css)/g,  config['css_dir'] + '$2' ))
        .pipe(replace(/(\.\.\/)?img\/([a-zA-Z0-9\.\-]+\.(png|jpg|jpeg|gif))/g,  config['img_dir'] + '$2' ))
        .pipe(gulp.dest('build/'));
});

// 发布版
gulp.task('release', ['build'], function() {
    gulp.start('htmlReplace', 'cssReplace');
});


// 清理
gulp.task('clean', function() {  
  return gulp.src(['dist/', 'build/', '.sass-cache/'], {read: false})
    .pipe(clean());
});

// 项目
gulp.task('zip', function() {
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i
        }
        return i
    }

    var d = new Date();
    var year = d.getFullYear();
    var month = checkTime(d.getMonth() + 1);
    var day = checkTime(d.getDate());
    var hour = checkTime(d.getHours());
    var minute = checkTime(d.getMinutes());

    var arr = ['./package.json',
               './config.json',
               './gulpfile.js',
               './webpack.config.js',
               '.gitignore',
               './src/**/*'
              ];

    // TODO
    // 这里打包有点问题，待解决
    return gulp.src(arr)
        .pipe(zip(config.project + '-' + year + month + day + hour + minute + '.zip'))
        .pipe(gulp.dest('./'));
});
