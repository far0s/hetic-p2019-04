var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    header  = require('gulp-header'),
    handlebars = require('gulp-compile-handlebars'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    package = require('./package.json');

// All CSS tasks
gulp.task('css', function () {
  return gulp.src('src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('app/assets/css'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

// All JS tasks
gulp.task('js',function(){
  gulp.src('src/js/scripts.js')
    .pipe(sourcemaps.init())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('app/assets/js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/assets/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

// BrowserSync tasks
gulp.task('browser-sync', function() {
  browserSync.init(null, {
    server: {
      baseDir: "app"
    }
  });
});
gulp.task('bs-reload', function () {
  browserSync.reload();
});

// Default task watcher
gulp.task('default', ['css', 'js', 'browser-sync'], function () {
  gulp.watch("src/scss/*/*.scss", ['css']);
  gulp.watch("src/js/*.js", ['js']);
  gulp.watch("app/*.html", ['bs-reload']);

  var templateData = {
    title: 'Mission Rosetta',
  };
  var options = {
    ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
    partials : {
      footer : '<footer>the end</footer>'
    },
      batch : ['src/partials'],
    }
  }

  return gulp.src('src/index.hbs')
    .pipe(handlebars(templateData, options))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('app'));
});
