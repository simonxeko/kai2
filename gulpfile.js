let gulp = require('gulp');
let tsc  = require("gulp-typescript");
let del = require('del');
let concat = require('gulp-concat');
let sourcemaps = require('gulp-sourcemaps');
let path = require('path');
let watch = require('gulp-watch');
let header = require('gulp-header');
let tsProject = tsc.createProject('tsconfig.json');

function buildTs() {
  console.log("Start building typescripts.");
  const tsResult = gulp.src(['typings/index.d.ts', 'src/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(tsProject());
  let result = tsResult.js
    .pipe(sourcemaps.write('.', {
      sourceRoot: function(file) {
        return `${file.cwd}/src`;
      },
    }))
    .pipe(header('#! /usr/bin/env node\n\n'))
    .pipe(gulp.dest('build'));

  console.log("Building typescripts completed.");
  return result;
}

gulp.task('watch', () => {
    // Endless stream mode
  return watch('src/**/*.ts', buildTs);
});


gulp.task('clean', (cb) => {
  return del('dist', cb);
});

gulp.task('build', ['clean'], buildTs);

gulp.task('default', ['build']);
