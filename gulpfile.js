var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    handlebars = require('gulp-compile-handlebars'),
    cssnano = require('gulp-cssnano'),
    header = require('gulp-header'),
    jshint = require('gulp-jshint'),
    image = require('gulp-image'),
    modernizr = require('gulp-modernizr'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    svgo = require('gulp-svgo'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    package = require('./package.json');


// All CSS tasks
gulp.task('css', function () {
  return gulp.src('src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

// All JS tasks
gulp.task('js',function(){
  gulp.src('src/js/scripts.js')
    .pipe(sourcemaps.init())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(modernizr())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(browserSync.reload({stream:true, once: true}));

  gulp.src('src/js/lib/*.js')
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

// Handlebars task
gulp.task('hbs', function(){
  var templateData = {
    title: 'Mission Rosetta'
  };
  var options = {
    ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
    batch : ['src/partials'],
  }

  gulp.src('src/index.hbs')
    .pipe(handlebars(templateData, options))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream:true}));
});

// Fonts task
gulp.task('fonts', function(){
  gulp.src('src/fonts/*')
    .pipe(gulp.dest('dist/assets/fonts/'))
    .pipe(browserSync.reload({stream:true}));
});

// Images task
gulp.task('images', function(){
  gulp.src('src/img/*')
    // .pipe(image({
    //   pngquant: true,
    //   optipng: false,
    //   zopflipng: true,
    //   jpegRecompress: false,
    //   jpegoptim: true,
    //   mozjpeg: true,
    //   gifsicle: false,
    //   svgo: false,
    //   concurrent: 4
    // }))
    .pipe(gulp.dest('dist/assets/img/'))
    .pipe(browserSync.reload({stream:true}));
});

// Favicon task
gulp.task('favicon', function(){
  gulp.src('src/favicon/*')
    .pipe(gulp.dest('dist/assets/favicon/'))
    .pipe(browserSync.reload({stream:true}));
})

// Svgo task
gulp.task('svgo', function(){
  gulp.src('src/svg/*')
    .pipe(svgo())
    .pipe(gulp.dest('dist/assets/img/'))
    .pipe(browserSync.reload({stream:true}));
});

// BrowserSync tasks
gulp.task('browser-sync', function() {
  browserSync.init(null, {
    server: {
      baseDir: "dist"
    }
  });
});
gulp.task('bs-reload', function () {
  browserSync.reload();
});

// Default task watcher
gulp.task('default', ['css', 'js', 'hbs', 'fonts', 'images', 'favicon', 'svgo', 'browser-sync'], function () {
  gulp.watch("src/scss/*/*.scss", ['css']);
  gulp.watch("src/js/*.js", ['js']);
  gulp.watch("src/**/*.hbs", ['hbs'])
  gulp.watch("src/svg/*.svg", ['svgo']);
  gulp.watch("src/fonts/*", ['fonts']);
  gulp.watch("src/img/*", ['images']);
  gulp.watch("src/favicon/*", ['favicon']);
  gulp.watch("dist/*.html", ['bs-reload']);
});
