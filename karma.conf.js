// Karma configuration
// Generated on Thu Jan 08 2015 17:04:24 GMT+0530 (India Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        './dev/assets/libs/jquery-1.9.1.js',
         './dev/assets/libs/jquery-ui.js', 
        './dev/assets/libs/angular.min.js',
        './dev/assets/libs/ui-bootstrap-tpls-0.12.0.js',
        './dev/assets/libs/angular-mocks.js',
        './dev/assets/libs/angular-sanitize.js',
        './dev/assets/libs/angular-ui-router.js',
        './dev/assets/libs/json2.js',
        './dev/assets/libs/polyfill.js',
        './dev/assets/libs/jquery.jscrollpane.js',
        './dev/assets/libs/jquery.mousewheel.js',
        './dev/assets/libs/angular-touch.js',
         './dev/assets/libs/colResizable.js',         
        './dev/assets/libs/jquery.multisortable.js',        
         './dev/assets/libs/jquery.datepicker.js',       
         './dev/assets/libs/jquery.dragtable.js',
         './dev/assets/libs/split-container.js', 
        './dev/assets/libs/app.js',
        './dev/modules/**/*.js',
        './dev/assets/libs/placeholders.js',
        './dev/assets/libs/tipped.js',
         './dev/assets/libs/placeholders.js' ,      
          
          //template IMPORTANT        
          './dev/templates/*.html' 
    ],


    // list of files to exclude
    // exclude: [
    // ],
    exclude: [
        './dev/modules/FolderTree/folderTreeTest.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        './dev/templates/*.html': 'ng-html2js'
    },

    ngHtml2JsPreprocessor: {        
          stripPrefix: 'dev/',        
          prependPrefix: '../',       
          moduleName: 'vmfTable.templates'        
      },      


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
