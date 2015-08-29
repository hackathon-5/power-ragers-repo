/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'order-up',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' api.tiles.mapbox.com api.mapbox.com checkout.stripe.com cdn.rawgit.com",
      'font-src': "'self' fonts.gstatic.com",
      'frame-src': "*",
      'connect-src': "'self' a.tiles.mapbox.com http://52.20.248.36",
      'img-src': "'self' data: a.tiles.mapbox.com q.stripe.com",
      'style-src': "'self' 'unsafe-inline' fonts.googleapis.com api.mapbox.com api.tiles.mapbox.com",
    },
    xdomain: {
         src: "//cdn.rawgit.com/jpillora/xdomain/0.6.17/dist/xdomain.min.js",
         debugSrc: "//cdn.rawgit.com/jpillora/xdomain/0.6.17/dist/xdomain.js",
         slaves: {
	         "http://52.20.248.36": "/proxy.html"
         },
         debug: false,
         timeout: 15e3
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };
  
  ENV['mapbox'] = {
	  accessToken: 'pk.eyJ1IjoicmFuZHJldyIsImEiOiJiZTQwN2UwMDQ3MzM2ZDhkYmQ2NjRhMzA0MDI4N2I2MSJ9.RLUoHJAZl_AUfCfD7L2OKA',
	  mapId: 'randrew.b5abb45b'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
