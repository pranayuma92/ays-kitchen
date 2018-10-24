// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','snackbar','ionic-sidemenu-overlaying','oitozero.ngSweetAlert','starter.controllers', 'starter.services', 'firebase'])

.run(function($ionicPlatform,$rootScope) {
  $rootScope.extras = true;
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }	
  });
  
})

.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html',
		  controller: 'AboutCtrl'
        }
      }
    })
	
  .state('login', {
      url: '/login',
          templateUrl: 'templates/login.html',
		  controller: 'LoginCtrl'
    })
  
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  
  .state('app.cart', {
    url: '/cart',
    views: {
      'menuContent': {
        templateUrl: 'templates/cart.html',
        controller: 'CartCtrl'
      }
    }
  })

  .state('app.checkout', {
    url: '/checkout',
    views: {
      'menuContent': {
        templateUrl: 'templates/checkout.html',
        controller: 'CheckoutCtrl'
      }
    }
  })
  
  .state('app.orderdetail', {
    url: '/orderdetail',
    views: {
      'menuContent': {
        templateUrl: 'templates/order-detail.html',
        controller: 'OrderDetailCtrl'
      }
    }
  })
  
 .state('app.orderhistory', {
    url: '/orderhistory',
    views: {
      'menuContent': {
        templateUrl: 'templates/order-history.html',
        controller: 'OrderHistoryCtrl'
      }
    }
  }) 
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
