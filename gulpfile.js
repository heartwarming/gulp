var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var minifyHtml = require("gulp-minify-html"); 
var rename = require('gulp-rename');
var concat = require("gulp-concat");
var imagemin = require('gulp-imagemin'); 
var spritesmith = require('gulp.spritesmith'); 
var sass = require('gulp-sass'); //引入sass编译插件模块
//task 名字任意
gulp.task('testGulp', async() => {
   await console.log('Hello World!');
});
//压缩js文件
gulp.task('minify-js', async() => { 
    await gulp.src('scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});
//js内容发生改变时，自动监听执行压缩任务
gulp.task('watch', async() => { 
    // ['','']支持多个的写法
    gulp.watch(['./scripts/*.js'], async ()=>{
        gulp.src(['./scripts/*.js'])
        .pipe(uglify()) //压缩
        .pipe(gulp.dest('dist/js'));
    });
});
//压缩css文件
gulp.task('minify-css', async() => { 
    await gulp.src('./css/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'));
});
//压缩html文件
gulp.task('minify-html', async() => { 
    await gulp.src('./html/*.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest('dist/html')); 
});

//重命名
gulp.task('cmn', async() => { 
    await gulp.src('./scripts/demo1.js')
    .pipe(uglify())
    .pipe(rename('demo11.js'))
    .pipe(gulp.dest('dist/js'));
});
//文件合并
gulp.task('concat', async() => {
    await gulp.src('./scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/concat'));
})
//图片压缩
gulp.task('imagemin', async() =>{
    await gulp.src('./img/1.png')
    .pipe(imagemin())
    .pipe(rename('11.png'))
    .pipe(gulp.dest('./img/11'));
})
//雪碧图
gulp.task('sprite',async() =>{
    await gulp.src(['./img/*.png'])
    .pipe(spritesmith({
      imgName:'sprite.png',
      cssName:'sprite.css'
    }))
    .pipe(gulp.dest('./dist/sprites'));
})
//
gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./css2'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});