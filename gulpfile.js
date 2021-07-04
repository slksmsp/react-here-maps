var gulp = require('gulp');
var ts = require('gulp-typescript');
var watch = require('gulp-watch');

var tsProject = ts.createProject('tsconfig.json', {
  typescript: require('typescript'),
  target: "ES3",
});

// transpilation task from typescript to es5 javascript
gulp.task('transpile', function() {
  return gulp.src(['src/**/*.ts', 'src/**/*.tsx', 'typings/index.d.ts', 'node_modules/typescript/lib/lib.es6.d.ts'], { allowEmpty: true })
    .pipe(tsProject())
    .pipe(gulp.dest('dist'));
});

// default task
gulp.task('default', gulp.series('transpile', function(done) {
  done()
}));

gulp.task('watch', function () {
  // Endless stream mode
  return watch(['src/**/*.ts', 'src/**/*.tsx', 'typings/index.d.ts', 'node_modules/typescript/lib/lib.es6.d.ts'], function () {
    gulp.start('transpile')
  });
});
