module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/app.js',
      'app/config/*.js',
      'app/components/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine', 'jasmine-matchers'],

    reporters: ['mocha'],

    colors: true,

    browsers : ['Chrome'],
    reporters : ['mocha'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-jasmine-matchers',
            'karma-mocha-reporter'
            ],

  });
};
