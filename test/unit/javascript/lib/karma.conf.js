// Karma configuration
// Generated on Wed Jan 28 2015 19:10:52 GMT-0700 (Mountain Standard Time)

module.exports = function(config) {

	var ASSET_PATH = 'grails-app/assets/javascripts';
	var TEST_PATH = 'test/unit/javascript';
	
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '../../../..',
		
		
		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],
		
		
		// list of files / patterns to load in the browser
		files: [
		        ASSET_PATH + '/jquery/**/*.js',
		        ASSET_PATH + '/angular/**/*.js',
		        ASSET_PATH + '/common/**/*.js',
		        ASSET_PATH + '/app/**/*.js',
		        ASSET_PATH + '/application.js',
		        TEST_PATH + '/**/src/*.js',
		        TEST_PATH + '/**/spec/*.js'
		],
		
		
		// list of files to exclude
		exclude: [
		],
		
		
		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
		},
		
		
		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['remote'],
		
		remoteReporter: {
		    host: 'localhost',
		    port: '9889'
		},
		
		// web server port
		port: 9876,
		
		
		// enable / disable colors in the output (reporters and logs)
		colors: true,
		
		
		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,
		
		
		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,
		
		
		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['PhantomJS'],
		
		
		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true
	});
};
