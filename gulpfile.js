var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    modernizr = require('gulp-modernizr'),
    jshint = require('gulp-jshint'),
    header  = require('gulp-header'),
    handlebars = require('gulp-compile-handlebars'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    svgo = require('gulp-svgo'),
    package = require('./package.json');


// All CSS tasks
gulp.task('css', function () {
  return gulp.src('src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    // .pipe(gulp.dest('dist/assets/css'))
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
});

// Handlebars task
gulp.task('hbs', function(){
  var templateData = {
    title: 'Mission Rosetta'
  };
  var options = {
    ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
    partials : {
      footer : '<footer>the end</footer>'
    },
    batch : ['src/partials'],
  }

  return gulp.src('src/index.hbs')
    .pipe(handlebars(templateData, options))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream:true}));
});

// Media tasks
gulp.task('media', function(){
  gulp.src('src/fonts/*')
    .pipe(gulp.dest('dist/assets/fonts/'))
    .pipe(browserSync.reload({stream:true}));

  gulp.src('src/img/*')
    .pipe(gulp.dest('dist/assets/img/'))
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
gulp.task('default', ['css', 'js', 'hbs', 'media', 'svgo', 'browser-sync'], function () {
  gulp.watch("src/scss/*/*.scss", ['css']);
  gulp.watch("src/js/*.js", ['js']);
  gulp.watch("src/**/*.hbs", ['hbs'])
  gulp.watch("src/svg/*.svg", ['svgo']);
  gulp.watch("dist/*.html", ['bs-reload']);
});
