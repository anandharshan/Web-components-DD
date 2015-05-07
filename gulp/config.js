'use strict';

module.exports = {

  'serverport': 3000,

  'styles': {

    'src' : ['dev/assets/scss/main_part_1.scss','dev/assets/scss/main_part_2.scss','dev/assets/scss/main_part_3.scss','dev/assets/scss/main.scss'],
    'dest': 'build/css/'
  },
  'ie7styles': {
    'src' : 'dev/assets/scss/ie7.scss',
    'dest': 'build/css'
  },
  'ie8styles': {
    'src' : 'dev/assets/scss/ie8.scss',
    'dest': 'build/css'
  },

  'scripts': {
    'src' : 'dev/modules/**/*.js',
    'dest': 'build/js'
  },

  'images': {
    'src' : 'dev/assets/img/**/*',
    'dest': 'build/images'
  },

  'views': {
    'watch': [
      'dev/index.html',
      'dev/modules/**/*.html'
    ],
    'src': 'dev/modules/index.html',
    'dest': 'build'
  },

  'dist': {
    'root'  : 'build'
  },

  'browserify': {
    'entries'   : ['dev/modules/**/*.js'],
    'bundleName': 'main.js'
  },

  'test': {
    'karma': 'karma.conf.js',
    //'protractor': 'test/protractor.conf.js'
  }

};