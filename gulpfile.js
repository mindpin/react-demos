var gulp = require('gulp');
var cjsx = require('gulp-cjsx');
var haml = require('gulp-ruby-haml');

var cjsx_src_path   = 'src/**/*.cjsx';
var cjsx_build_path = 'build/';

var haml_src_path   = 'src/**/*.haml';
var haml_build_path = 'build/';

var lib_src_path    = 'src/lib/**/*'
var lib_build_path  = 'build/lib/'


gulp.task('build_lib', function(){
  gulp.src(lib_src_path)
  .pipe(gulp.dest(lib_build_path))
});

gulp.task('build_cjsx', function(cb) {
  gulp.src(cjsx_src_path)
    .pipe(
      cjsx({bare: true})
      .on('error', function(evt){
        console.log(evt);
      })
    )
    .pipe(
      gulp.dest(cjsx_build_path)
    ).on("end", cb);
});

gulp.task('build_haml', function(cb) {
  gulp.src(haml_src_path)
  .pipe(
    haml()
  )
  .pipe(
    gulp.dest(haml_build_path)
  ).on("end", cb);
});

gulp.task('build', ["build_haml", "build_cjsx", "build_lib"]);

gulp.task('watch', function() {
  gulp.watch(cjsx_src_path, ["build_cjsx"]);
  gulp.watch(haml_src_path, ["build_haml"])
  gulp.watch(lib_src_path, ["build_lib"])
});
