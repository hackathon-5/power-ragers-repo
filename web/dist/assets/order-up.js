/* jshint ignore:start */

/* jshint ignore:end */

define('order-up/adapters/application', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	exports['default'] = DS['default'].RESTAdapter.extend({
		host: 'http://52.20.248.36/api'
	});

});
define('order-up/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'order-up/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('order-up/components/mapbox-map', ['exports', 'ember-cli-mapbox-map/components/mapbox-map'], function (exports, mapbox_map) {

	'use strict';



	exports.default = mapbox_map.default;

});
define('order-up/components/notification-message', ['exports', 'ember-cli-notifications/components/notification-message', 'order-up/config/environment'], function (exports, NotificationMessage, ENV) {

  'use strict';

  var config = ENV['default']['ember-cli-notifications'] || { icons: 'font-awesome' };

  exports['default'] = NotificationMessage['default'].extend({
    icons: config.icons
  });

});
define('order-up/components/phone-number', ['exports', 'ember', 'ember-cli-phone-number/components/phone-number'], function (exports, Ember, EmberCliPhoneNumber) {

	'use strict';

	exports['default'] = EmberCliPhoneNumber['default'];

});
define('order-up/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('order-up/controllers/index', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller.extend({
		menuItems: [{
			title: 'Classic Mac',
			description: "This is the classic, where it all started. A delicious, mouth-watering heap of noodles and golden, oozing deliciousness. Did we mention the goldfish cracker crust?",
			price: 6.00
		}, {
			title: 'Lobster Mac',
			description: "Thought it couldn't get any better? Think again. We threw in a few of Sebastian's tasty pals for this work of pasta art. Dont worry, they're on their way to Valhalla now.",
			price: 6.00
		}, {
			title: 'Mac Attack',
			description: "7 cheeses. Enough said.",
			price: 6.00
		}],

		center: [38.909671288923, -77.034084142948]
	});

});
define('order-up/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('order-up/controllers/orders', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller.extend({
		open: (function () {
			return this.model.filterBy('open', true);
		}).property('model.@each.open'),

		closed: (function () {
			return this.model.filterBy('open', false);
		}).property('model.@each.open'),

		openOrders: true,

		actions: {
			switchTab: function switchTab() {
				this.toggleProperty('openOrders');
			}
		}
	});

});
define('order-up/controllers/place-order', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller.extend({
		needs: 'application',

		menuItem: (function () {
			return this.get('controllers.application.menuItem');
		}).property('controllers.application.menuItem')
	});

});
define('order-up/initializers/export-application-global', ['exports', 'ember', 'order-up/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (config['default'].exportApplicationGlobal !== false) {
      var value = config['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember['default'].String.classify(config['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('order-up/initializers/mapbox', ['exports', 'ember-cli-mapbox-map/initializers/mapbox'], function (exports, mapbox) {

	'use strict';



	exports.default = mapbox.default;
	exports.initialize = mapbox.initialize;

});
define('order-up/initializers/notifications', ['exports', 'ember-cli-notifications/services/notification-messages-service'], function (exports, NotificationMessagesService) {

    'use strict';

    exports['default'] = {
        name: 'notification-messages-service',

        initialize: function initialize(container, application) {
            application.register('notification-messages:service', NotificationMessagesService['default']);

            ['controller', 'component', 'route', 'router', 'service'].forEach(function (injectionTarget) {
                application.inject(injectionTarget, 'notifications', 'notification-messages:service');
            });
        }
    };

});
define('order-up/initializers/patch-cors-support', ['exports', 'ember', 'order-up/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize() {
    if (typeof config['default'].xdomain === 'undefined' || config['default'].xdomain.isDisabled === true) {
      return;
    }
    Ember['default'].$.support.cors = true;
  }

  exports['default'] = {
    name: 'patch-with-credentials',
    initialize: initialize
  };

});
define('order-up/instance-initializers/app-version', ['exports', 'order-up/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('order-up/instance-initializers/mapbox', ['exports', 'ember-cli-mapbox-map/instance-initializers/mapbox'], function (exports, mapbox) {

	'use strict';



	exports.default = mapbox.default;
	exports.initialize = mapbox.initialize;

});
define('order-up/models/order', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	exports['default'] = DS['default'].Model.extend({
		itemName: DS['default'].attr('string'),

		createdAt: DS['default'].attr('date'),

		customerName: DS['default'].attr('string'),

		customerEmail: DS['default'].attr('string'),

		customerPhoneNumber: DS['default'].attr('string'),

		open: DS['default'].attr('boolean'),

		price: DS['default'].attr('number'),

		token: DS['default'].attr('string')
	});

});
define('order-up/router', ['exports', 'ember', 'order-up/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('orders');
    this.route('place-order');
    this.route('confirmation');
  });

  exports['default'] = Router;

});
define('order-up/routes/application', ['exports', 'ember'], function (exports, Ember) {

   'use strict';

   exports['default'] = Ember['default'].Route.extend({
      // Implementing the setup controller method to setup notifications
      // using ember-cli-notifications
      setupController: function setupController(controller, model) {
         this.notifications.setDefaultClearNotification(6000);
         controller.set('model', model);
      }
   });

});
define('order-up/routes/confirmation', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('order-up/routes/index', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({
		model: function model() {
			return {
				"id": 3,
				"center": [38.909671288923, -77.034084142948],
				"description": "A food truck serving an eclectic Fusion, and New American Cuisine.",
				"menuItems": [{
					"title": "BBQ Spring Roles",
					"description": "Slow roasted pork and apple coleslaw served with house made BBQ sauce.",
					"price": 5.00
				}, {
					"title": "BBQ Slider Burgers",
					"description": "Three beef sliders topped with crispy bacon, white cheddar, fried jalapeño and house made BBQ sauce.",
					"price": 8.00
				}, {
					"title": "Blackend Fish Tacos",
					"description": "Three corn tortillas stuffed with blackend flounder, shaved cabbage, pineapple salsa and poblano ranch.",
					"price": 8.00
				}, {
					"title": "Caprese Grilled Cheese",
					"description": "Pesto marinated fresh mozzarella and sliced tomato served on parmesan crusted sandwich bread.",
					"price": 7.00
				}, {
					"title": "Carnitas Burrito",
					"description": "Slow roasted pork, pico de gallo, fresh avacado, black beans and rice, and chipotle sour cream in a flour tortilla.",
					"price": 8.00
				}, {
					"title": "Kettle Chips & Drink",
					"description": "Add kettle chips and a drink.",
					"price": 2.00
				}, {
					"title": "Korean BBQ Short Rib Meat",
					"description": "Korean BBQ short rib with smoked gouda cheese on toasted sourdough bread served with a side of house made kimchi coleslaw.",
					"price": 8.00
				}, {
					"title": "Southern Chop Salad",
					"description": "Mixed greens tossed with poblano buttermilk ranch, white cheddar, diced tomato, red onion, grilled corn, chopped bacon, and fried okra.",
					"price": 7.00
				}, {
					"title": "Spicy Curry Chicken Wrap",
					"description": "Crispy chicken breast tossed with coconut curry, Napa cabbage slaw dressed with Thai citrus sauce wrapped in a flat bread.",
					"price": 8.00
				}],
				"name": "Charleston Chew",
				"photo": "https://scontent-iad3-1.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/10616488_533308266813724_7444608811242941718_n.jpg?oh=e894735865d84dd3393e7ba203b7c621&oe=567DAD2D"
			};
		},

		actions: {
			placeOrder: function placeOrder(item) {
				this.controllerFor('application').set('menuItem', item);
				this.transitionTo('place-order');
			}
		}
	});

});
define('order-up/routes/orders', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({
		model: function model() {
			return this.store.find('order', {
				truckId: 3
			});
		},

		actions: {
			closeOrder: function closeOrder(order) {
				order.set('open', false);
				order.save();
			}
		}
	});

});
define('order-up/routes/place-order', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({
		actions: {
			order: function order() {
				var route = this;

				var handler = StripeCheckout.configure({
					key: 'pk_test_s29HTCY8SQwT0TpHBxDnfpjI',
					locale: 'auto',
					token: function token(_token) {
						// Use the token to create the charge with a server-side script.
						// You can access the token ID with `token.id`
						var order = route.store.createRecord('order', {
							customerName: route.controller.customerName,
							customerEmail: _token.email,
							itemName: route.controller.get('menuItem.title'),
							price: route.controller.get('menuItem.price'),
							customerPhoneNumber: route.controller.phoneNumber,
							token: _token.id
						});

						order.save().then(
						//success
						function () {
							route.notifications.addNotification({
								message: 'Order up!',
								type: 'success',
								autoClear: true
							});
							route.transitionTo('confirmation');
						});
					}
				});

				handler.open({
					name: route.controller.get('menuItem.title'),
					description: route.controller.get('menuItem.description'),
					amount: route.controller.menuItem.price * 100
				});

				// Close Checkout on page navigation
				$(window).on('popstate', function () {
					handler.close();
				});
			}
		}
	});

});
define('order-up/services/mapbox', ['exports', 'ember-cli-mapbox-map/services/mapbox'], function (exports, mapbox) {

	'use strict';



	exports.default = mapbox.default;

});
define('order-up/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 18,
            "column": 0
          }
        },
        "moduleName": "order-up/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("nav");
        dom.setAttribute(el1,"class","top-bar");
        dom.setAttribute(el1,"data-topbar","");
        dom.setAttribute(el1,"role","navigation");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"class","title-area");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        dom.setAttribute(el3,"class","name text-center");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h1");
        dom.setAttribute(el4,"class","text-center");
        var el5 = dom.createElement("a");
        dom.setAttribute(el5,"href","#");
        var el6 = dom.createElement("img");
        dom.setAttribute(el6,"class","logo");
        dom.setAttribute(el6,"src","/assets/logo.png");
        dom.setAttribute(el6,"alt","Logo");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("footer");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row text-center");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","small-12 columns");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("What are you eating?");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,2,2,contextualElement);
        return morphs;
      },
      statements: [
        ["content","outlet",["loc",[null,[9,0],[9,10]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('order-up/templates/components/notification-message', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 4
            },
            "end": {
              "line": 5,
              "column": 4
            }
          },
          "moduleName": "order-up/templates/components/notification-message.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createAttrMorph(element1, 'class');
          return morphs;
        },
        statements: [
          ["attribute","class",["concat",[["get","notificationIcon",["loc",[null,[4,18],[4,34]]]]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 11,
              "column": 0
            },
            "end": {
              "line": 13,
              "column": 0
            }
          },
          "moduleName": "order-up/templates/components/notification-message.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","c-notification__countdown");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createAttrMorph(element0, 'style');
          return morphs;
        },
        statements: [
          ["attribute","style",["get","notificationClearDuration",["loc",[null,[12,49],[12,74]]]]]
        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 0
          }
        },
        "moduleName": "order-up/templates/components/notification-message.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","c-notification__icon");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("span");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","c-notification__content");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("span");
        dom.setAttribute(el1,"class","c-notification__close");
        dom.setAttribute(el1,"title","Dismiss this notification");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("i");
        dom.setAttribute(el2,"class","fa fa-times");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [5]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1]),1,1);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]),1,1);
        morphs[2] = dom.createMorphAt(fragment,4,4,contextualElement);
        morphs[3] = dom.createElementMorph(element2);
        return morphs;
      },
      statements: [
        ["block","if",[["get","icons",["loc",[null,[3,10],[3,15]]]]],[],0,null,["loc",[null,[3,4],[5,11]]]],
        ["content","notification.message",["loc",[null,[9,2],[9,26]]]],
        ["block","if",[["get","notification.autoClear",["loc",[null,[11,6],[11,28]]]]],[],1,null,["loc",[null,[11,0],[13,7]]]],
        ["element","action",["removeNotification"],[],["loc",[null,[14,36],[14,67]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('order-up/templates/components/phone-number', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "order-up/templates/components/phone-number.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [
        ["inline","input",[],["value",["subexpr","@mut",[["get","phone_number",["loc",[null,[1,14],[1,26]]]]],[],[]]],["loc",[null,[1,0],[1,28]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('order-up/templates/confirmation', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 17,
              "column": 3
            },
            "end": {
              "line": 17,
              "column": 76
            }
          },
          "moduleName": "order-up/templates/confirmation.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("button");
          dom.setAttribute(el1,"class","button radius");
          var el2 = dom.createTextNode("Get more food!");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 10
          }
        },
        "moduleName": "order-up/templates/confirmation.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("section");
        dom.setAttribute(el1,"class","dark-bg");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","small-12 columns animation-wrapper text-center");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"class","truck");
        dom.setAttribute(el4,"src","/assets/images/truck.png");
        dom.setAttribute(el4,"alt","Truck");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"class","wing1");
        dom.setAttribute(el4,"src","/assets/images/wing.png");
        dom.setAttribute(el4,"alt","Wing 1");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("img");
        dom.setAttribute(el4,"class","wing2");
        dom.setAttribute(el4,"src","/assets/images/wing2.png");
        dom.setAttribute(el4,"alt","Wing 2");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","small-10 small-offset-1 columns padding-top text-center");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h2");
        var el5 = dom.createTextNode("Truck yeah!");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("Thanks for placing your order! We'll text you when your food is ready.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row margin-top");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","small-12 columns text-center");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 5, 1]),1,1);
        return morphs;
      },
      statements: [
        ["block","link-to",["index"],[],0,null,["loc",[null,[17,3],[17,88]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('order-up/templates/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 29,
              "column": 3
            },
            "end": {
              "line": 42,
              "column": 3
            }
          },
          "moduleName": "order-up/templates/index.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("				");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","row menu-item");
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","small-8 large-10 columns");
          var el3 = dom.createTextNode("\n						");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("h2");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n						");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("p");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n					");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n					");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","small-4 large-2 columns");
          var el3 = dom.createTextNode("\n						");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("button");
          dom.setAttribute(el3,"class","button small radius pull-right text-center margin-top");
          var el4 = dom.createTextNode("\n							");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("p");
          dom.setAttribute(el4,"class","price");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n							Order\n						");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n					");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n				");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1]);
          var element2 = dom.childAt(element0, [3, 1]);
          var morphs = new Array(4);
          morphs[0] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
          morphs[1] = dom.createMorphAt(dom.childAt(element1, [3]),0,0);
          morphs[2] = dom.createElementMorph(element2);
          morphs[3] = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
          return morphs;
        },
        statements: [
          ["content","item.title",["loc",[null,[32,10],[32,24]]]],
          ["content","item.description",["loc",[null,[33,9],[33,29]]]],
          ["element","action",["placeOrder",["get","item",["loc",[null,[36,98],[36,102]]]]],[],["loc",[null,[36,76],[36,104]]]],
          ["inline","format-money",[["get","item.price",["loc",[null,[37,39],[37,49]]]]],["symbol","$"],["loc",[null,[37,24],[37,62]]]]
        ],
        locals: ["item"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 45,
            "column": 10
          }
        },
        "moduleName": "order-up/templates/index.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("section");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","hero");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","small-12 columns");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h1");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row location-bg");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","small-12 columns");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("At 123 Main Street right now");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("iframe");
        dom.setAttribute(el2,"width","100%");
        dom.setAttribute(el2,"height","150px");
        dom.setAttribute(el2,"zoom","12");
        dom.setAttribute(el2,"frameBorder","0");
        dom.setAttribute(el2,"src","https://a.tiles.mapbox.com/v4/randrew.b5abb45b/attribution.html?access_token=pk.eyJ1IjoicmFuZHJldyIsImEiOiJiZTQwN2UwMDQ3MzM2ZDhkYmQ2NjRhMzA0MDI4N2I2MSJ9.RLUoHJAZl_AUfCfD7L2OKA#12/32.911/-79.86");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","divider-yellow");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        dom.setAttribute(el1,"class","dark-bg");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","small-12 columns padding-top");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h3");
        var el5 = dom.createTextNode("The Food");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","small-12 columns");
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element3 = dom.childAt(fragment, [0, 1, 1, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(element3, [1]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element3, [3]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [4, 3, 1]),1,1);
        return morphs;
      },
      statements: [
        ["content","model.name",["loc",[null,[5,8],[5,22]]]],
        ["content","model.description",["loc",[null,[6,7],[6,28]]]],
        ["block","each",[["get","model.menuItems",["loc",[null,[29,11],[29,26]]]]],[],0,null,["loc",[null,[29,3],[42,12]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('order-up/templates/orders', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 22,
                "column": 5
              },
              "end": {
                "line": 36,
                "column": 5
              }
            },
            "moduleName": "order-up/templates/orders.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("						");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1,"class","row menu-item");
            var el2 = dom.createTextNode("\n							");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2,"class","small-8 columns");
            var el3 = dom.createTextNode("\n								");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("h2");
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n								");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("p");
            dom.setAttribute(el3,"class","no-margin");
            var el4 = dom.createElement("img");
            dom.setAttribute(el4,"src","/assets/icons/time.png");
            dom.setAttribute(el4,"alt","Order Time");
            dom.appendChild(el3, el4);
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n								");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("p");
            var el4 = dom.createElement("img");
            dom.setAttribute(el4,"src","/assets/icons/person.png");
            dom.setAttribute(el4,"alt","Customer");
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("by ");
            dom.appendChild(el3, el4);
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n							");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n							");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2,"class","small-4 columns margin-top");
            var el3 = dom.createTextNode("\n								");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("button");
            dom.setAttribute(el3,"class","button small radius");
            var el4 = dom.createTextNode("\n									");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("p");
            dom.setAttribute(el4,"class","price");
            var el5 = dom.createComment("");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n									Close\n								");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n							");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n						");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element2 = dom.childAt(fragment, [1]);
            var element3 = dom.childAt(element2, [1]);
            var element4 = dom.childAt(element2, [3, 1]);
            var morphs = new Array(5);
            morphs[0] = dom.createMorphAt(dom.childAt(element3, [1]),0,0);
            morphs[1] = dom.createMorphAt(dom.childAt(element3, [3]),1,1);
            morphs[2] = dom.createMorphAt(dom.childAt(element3, [5]),2,2);
            morphs[3] = dom.createElementMorph(element4);
            morphs[4] = dom.createMorphAt(dom.childAt(element4, [1]),0,0);
            return morphs;
          },
          statements: [
            ["content","order.itemName",["loc",[null,[25,12],[25,30]]]],
            ["inline","moment-from-now",[["get","order.createdAt",["loc",[null,[26,99],[26,114]]]]],[],["loc",[null,[26,81],[26,116]]]],
            ["content","order.customerName",["loc",[null,[27,66],[27,88]]]],
            ["element","action",["closeOrder",["get","order",["loc",[null,[30,66],[30,71]]]]],[],["loc",[null,[30,44],[30,73]]]],
            ["inline","format-money",[["get","order.price",["loc",[null,[31,41],[31,52]]]]],["symbol","$"],["loc",[null,[31,26],[31,65]]]]
          ],
          locals: ["order"],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 20,
              "column": 4
            },
            "end": {
              "line": 37,
              "column": 4
            }
          },
          "moduleName": "order-up/templates/orders.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("					");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h4");
          dom.setAttribute(el1,"class","margin-top");
          var el2 = dom.createTextNode("Open Orders");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,3,3,contextualElement);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","each",[["get","open",["loc",[null,[22,13],[22,17]]]]],[],0,null,["loc",[null,[22,5],[36,14]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        return {
          meta: {
            "revision": "Ember@1.13.3",
            "loc": {
              "source": null,
              "start": {
                "line": 39,
                "column": 5
              },
              "end": {
                "line": 51,
                "column": 5
              }
            },
            "moduleName": "order-up/templates/orders.hbs"
          },
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("						");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1,"class","row closed-orders");
            var el2 = dom.createTextNode("\n							");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2,"class","small-8 columns");
            var el3 = dom.createTextNode("\n								");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("h2");
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n								");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("p");
            dom.setAttribute(el3,"class","no-margin");
            var el4 = dom.createElement("img");
            dom.setAttribute(el4,"src","/assets/icons/time.png");
            dom.setAttribute(el4,"alt","Order Time");
            dom.appendChild(el3, el4);
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n								");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("p");
            var el4 = dom.createElement("img");
            dom.setAttribute(el4,"src","/assets/icons/person.png");
            dom.setAttribute(el4,"alt","Customer");
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("by ");
            dom.appendChild(el3, el4);
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n							");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n							");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2,"class","small-4 columns margin-top");
            var el3 = dom.createTextNode("\n								");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("p");
            dom.setAttribute(el3,"class","price");
            var el4 = dom.createComment("");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n								");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("h5");
            var el4 = dom.createTextNode("Closed");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n							");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n						");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var element1 = dom.childAt(element0, [1]);
            var morphs = new Array(4);
            morphs[0] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
            morphs[1] = dom.createMorphAt(dom.childAt(element1, [3]),1,1);
            morphs[2] = dom.createMorphAt(dom.childAt(element1, [5]),2,2);
            morphs[3] = dom.createMorphAt(dom.childAt(element0, [3, 1]),0,0);
            return morphs;
          },
          statements: [
            ["content","order.itemName",["loc",[null,[42,12],[42,30]]]],
            ["inline","moment-from-now",[["get","order.createdAt",["loc",[null,[43,99],[43,114]]]]],[],["loc",[null,[43,81],[43,116]]]],
            ["content","order.customerName",["loc",[null,[44,66],[44,88]]]],
            ["inline","format-money",[["get","order.price",["loc",[null,[47,40],[47,51]]]]],["symbol","$"],["loc",[null,[47,25],[47,64]]]]
          ],
          locals: ["order"],
          templates: []
        };
      }());
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 37,
              "column": 4
            },
            "end": {
              "line": 52,
              "column": 4
            }
          },
          "moduleName": "order-up/templates/orders.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("					");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h4");
          dom.setAttribute(el1,"class","margin-top");
          var el2 = dom.createTextNode("Closed Orders");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,3,3,contextualElement);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["block","each",[["get","closed",["loc",[null,[39,13],[39,19]]]]],[],0,null,["loc",[null,[39,5],[51,14]]]]
        ],
        locals: [],
        templates: [child0]
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 56,
            "column": 10
          }
        },
        "moduleName": "order-up/templates/orders.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("section");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","hero");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","small-12 columns");
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h4");
        var el6 = dom.createTextNode("Orders");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n				");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h1");
        var el6 = dom.createTextNode("Charleston Chews");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","divider-yellow");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        dom.setAttribute(el1,"class","tabs");
        dom.setAttribute(el1,"data-tab","");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createElement("a");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" Open");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createElement("a");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" Closed");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("section");
        dom.setAttribute(el1,"class","dark-bg");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","small-12 columns");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"class","tabs-content");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("			");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element5 = dom.childAt(fragment, [4]);
        var element6 = dom.childAt(element5, [1]);
        var element7 = dom.childAt(element5, [3]);
        var morphs = new Array(7);
        morphs[0] = dom.createAttrMorph(element6, 'class');
        morphs[1] = dom.createElementMorph(element6);
        morphs[2] = dom.createMorphAt(dom.childAt(element6, [0]),0,0);
        morphs[3] = dom.createAttrMorph(element7, 'class');
        morphs[4] = dom.createElementMorph(element7);
        morphs[5] = dom.createMorphAt(dom.childAt(element7, [0]),0,0);
        morphs[6] = dom.createMorphAt(dom.childAt(fragment, [6, 1, 1, 1]),1,1);
        return morphs;
      },
      statements: [
        ["attribute","class",["concat",["tab-title"," ",["subexpr","if",[["get","openOrders",[]],"active",""],[],[]]]]],
        ["element","action",["switchTab"],[],["loc",[null,[13,56],[13,78]]]],
        ["content","open.length",["loc",[null,[13,82],[13,97]]]],
        ["attribute","class",["concat",["tab-title"," ",["subexpr","if",[["get","openOrders",[]],"","active"],[],[]]]]],
        ["element","action",["switchTab"],[],["loc",[null,[14,57],[14,79]]]],
        ["content","closed.length",["loc",[null,[14,83],[14,100]]]],
        ["block","if",[["get","openOrders",["loc",[null,[20,10],[20,20]]]]],[],0,1,["loc",[null,[20,4],[52,11]]]]
      ],
      locals: [],
      templates: [child0, child1]
    };
  }()));

});
define('order-up/templates/place-order', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.3",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 3
            },
            "end": {
              "line": 4,
              "column": 32
            }
          },
          "moduleName": "order-up/templates/place-order.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("< Back");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 32,
            "column": 0
          }
        },
        "moduleName": "order-up/templates/place-order.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("section");
        dom.setAttribute(el1,"class","dark-bg");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","small-12 columns padding-top");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","small-12 columns text-center padding-top");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h1");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h4");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row margin-top");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","small-10 small-offset-1 columns");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        var el5 = dom.createTextNode("Name");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row margin-top");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","small-10 small-offset-1 columns");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("label");
        var el5 = dom.createTextNode("Phone number");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("We'll text you when you're order is ready!");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","row margin-top");
        var el3 = dom.createTextNode("\n		");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","small-12 columns text-center");
        var el4 = dom.createTextNode("\n			");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"class","button large radius");
        var el5 = dom.createTextNode("Place order");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n		");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n	");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [3, 1]);
        var element2 = dom.childAt(element0, [9, 1, 1]);
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 1]),1,1);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [3]),0,0);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [5, 1]),3,3);
        morphs[4] = dom.createMorphAt(dom.childAt(element0, [7, 1]),3,3);
        morphs[5] = dom.createElementMorph(element2);
        return morphs;
      },
      statements: [
        ["block","link-to",["index"],[],0,null,["loc",[null,[4,3],[4,44]]]],
        ["inline","format-money",[["get","menuItem.price",["loc",[null,[9,22],[9,36]]]]],["symbol","$"],["loc",[null,[9,7],[9,49]]]],
        ["content","menuItem.title",["loc",[null,[10,7],[10,25]]]],
        ["inline","input",[],["placeholder","Truck Harrison","value",["subexpr","@mut",[["get","customerName",["loc",[null,[16,46],[16,58]]]]],[],[]]],["loc",[null,[16,3],[16,60]]]],
        ["inline","phone-number",[],["phone_number",["subexpr","@mut",[["get","phoneNumber",["loc",[null,[22,31],[22,42]]]]],[],[]]],["loc",[null,[22,3],[22,44]]]],
        ["element","action",["order"],[],["loc",[null,[28,39],[28,57]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('order-up/tests/adapters/application.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/application.js should pass jshint', function() { 
    ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('order-up/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('order-up/tests/controllers/index.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/index.js should pass jshint', function() { 
    ok(true, 'controllers/index.js should pass jshint.'); 
  });

});
define('order-up/tests/controllers/orders.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/orders.js should pass jshint', function() { 
    ok(true, 'controllers/orders.js should pass jshint.'); 
  });

});
define('order-up/tests/controllers/place-order.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/place-order.js should pass jshint', function() { 
    ok(true, 'controllers/place-order.js should pass jshint.'); 
  });

});
define('order-up/tests/helpers/resolver', ['exports', 'ember/resolver', 'order-up/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('order-up/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('order-up/tests/helpers/start-app', ['exports', 'ember', 'order-up/app', 'order-up/config/environment'], function (exports, Ember, Application, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('order-up/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('order-up/tests/models/order.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/order.js should pass jshint', function() { 
    ok(true, 'models/order.js should pass jshint.'); 
  });

});
define('order-up/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('order-up/tests/routes/application.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/application.js should pass jshint', function() { 
    ok(true, 'routes/application.js should pass jshint.'); 
  });

});
define('order-up/tests/routes/confirmation.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/confirmation.js should pass jshint', function() { 
    ok(true, 'routes/confirmation.js should pass jshint.'); 
  });

});
define('order-up/tests/routes/index.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/index.js should pass jshint', function() { 
    ok(false, 'routes/index.js should pass jshint.\nroutes/index.js: line 58, col 10, Missing semicolon.\n\n1 error'); 
  });

});
define('order-up/tests/routes/orders.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/orders.js should pass jshint', function() { 
    ok(true, 'routes/orders.js should pass jshint.'); 
  });

});
define('order-up/tests/routes/place-order.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/place-order.js should pass jshint', function() { 
    ok(false, 'routes/place-order.js should pass jshint.\nroutes/place-order.js: line 8, col 27, \'StripeCheckout\' is not defined.\nroutes/place-order.js: line 44, col 15, \'$\' is not defined.\n\n2 errors'); 
  });

});
define('order-up/tests/test-helper', ['order-up/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('order-up/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('order-up/tests/unit/adapters/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });

});
define('order-up/tests/unit/adapters/application-test.jshint', function () {

  'use strict';

  module('JSHint - unit/adapters');
  test('unit/adapters/application-test.js should pass jshint', function() { 
    ok(true, 'unit/adapters/application-test.js should pass jshint.'); 
  });

});
define('order-up/tests/unit/controllers/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('order-up/tests/unit/controllers/index-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/index-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/index-test.js should pass jshint.'); 
  });

});
define('order-up/tests/unit/controllers/orders-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:orders', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

});
define('order-up/tests/unit/controllers/orders-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/orders-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/orders-test.js should pass jshint.'); 
  });

});
define('order-up/tests/unit/models/order-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('order', 'Unit | Model | order', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('order-up/tests/unit/models/order-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/order-test.js should pass jshint', function() { 
    ok(true, 'unit/models/order-test.js should pass jshint.'); 
  });

});
define('order-up/tests/unit/routes/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:application', 'Unit | Route | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('order-up/tests/unit/routes/application-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/application-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/application-test.js should pass jshint.'); 
  });

});
define('order-up/tests/unit/routes/confirmation-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:confirmation', 'Unit | Route | confirmation', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('order-up/tests/unit/routes/confirmation-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/confirmation-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/confirmation-test.js should pass jshint.'); 
  });

});
define('order-up/tests/unit/routes/index-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('order-up/tests/unit/routes/index-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/index-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/index-test.js should pass jshint.'); 
  });

});
define('order-up/tests/unit/routes/orders-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:orders', 'Unit | Route | orders', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('order-up/tests/unit/routes/orders-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/orders-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/orders-test.js should pass jshint.'); 
  });

});
define('order-up/tests/unit/routes/place-order-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:place-order', 'Unit | Route | place order', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

});
define('order-up/tests/unit/routes/place-order-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/place-order-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/place-order-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('order-up/config/environment', ['ember'], function(Ember) {
  var prefix = 'order-up';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("order-up/tests/test-helper");
} else {
  require("order-up/app")["default"].create({"name":"order-up","version":"0.0.0+f92c6ff8"});
}

/* jshint ignore:end */
//# sourceMappingURL=order-up.map