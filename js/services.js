angular.module('starter.services', [])

.factory('fireBaseData', function($firebase) {
  var ref = new Firebase("https://ays-kitchen.firebaseio.com/"),
      refCart = new Firebase("https://ays-kitchen.firebaseio.com/cart"),
      refView = new Firebase("https://ays-kitchen.firebaseio.com/view"),
      refUser = new Firebase("https://ays-kitchen.firebaseio.com/users"),
      refCategory = new Firebase("https://ays-kitchen.firebaseio.com/category"),
      refOrder = new Firebase("https://ays-kitchen.firebaseio.com/orders"),
      refFeatured = new Firebase("https://ays-kitchen.firebaseio.com/featured"),
      refList = new Firebase("https://ays-kitchen.firebaseio.com/list");
      refReview = new Firebase("https://ays-kitchen.firebaseio.com/reviews");
    return {
      ref: function() {
        return ref;
      },
      refCart: function() {
        return refCart;
      },
      refView: function() {
        return refView;
      },
      refUser: function() {
        return refUser;
      },
      refCategory: function() {
        return refCategory;
      },
      refOrder: function() {
        return refOrder;
      },
      refFeatured: function() {
        return refFeatured;
      },
      refList: function() {
        return refList;
      },
      refReview: function() {
        return refReview;
      }
    }
  })


.factory('MenuServices', function(){
  var menu = [{
	  id:1,
	  nama:'Bolu Keju',
	  harga: 100000,
	  pic:'bolukeju.jpg',
	  desc:'Bolu berlapis krim dan taburan keju'
  },{
	  id:2,
	  nama:'Cookie Good Time',
	  harga: 120000,
	  pic:'goodtime.jpg',
	  desc:'Cookies coklat yang renyah dengan chocochips'
  },{
	  id:3,
	  nama:'Cookie Cornflakes',
	  harga: 120000,
	  pic:'cornflakes.jpg',
	  desc:'Cookies manis & gurih, cocok untuk teman minum teh'
  },{
	  id:4,
	  nama:'Putri Salju',
	  harga: 80000,
	  pic: 'putrisalju.jpg',
	  desc:'Cookies lembut dengan gula bubuk mint'
  },{
	  id:5,
	  nama:'Bolu Blackforest',
	  harga: 130000,
	  pic:'blackforest.jpg',
	  desc:'Dengan dark chocolate yang nikmat & lezat'
  },{
	  id:6,
	  nama:'Bolu Brownies Strawberry',
	  harga: 120000,
	  pic:'brownies.jpg',
	  desc:'Perpaduan coklat & strawberry, cocok untuk santai bersama teman atau keluarga'
  }];
  
  return {
	  all : function() {
		  return menu;
	  },
	  getId : function(menuId) {
		  for(var i = 0; i < menu.length; i++) {
			  if(menu[i].id === parseInt(menuId)) {
				  return menu[i];
			  }
		  }
		  return null;
	  }
  };
  
})
 
.factory('CartServices', function(){
  var cart = [];
  
  return {
	  all: function(){
		  return cart;
	  },
	  add: function(item) {
		  if(cart.length == 0) {
              item.count = 1;
              cart.push(item);
          }else {
              var repeat = false;
              for( var i = 0; i < cart.length; i++ ) {
                  if(cart[i].id == item.id) {
                  cart[i].count++;
                  repeat = true;
		          }
             }
             if(!repeat) {
                 item.count = 1;
                 cart.push(item);
             }
          }
	  },
	  decrement: function(item){
	  	  for(var i = 0; i < cart.length; i++){
	  	  	if(cart[i].id == item.id){
	  	  		cart[i].count -= 1;
	  	  		if(cart[i].count == 0){
	  	  			cart.splice(cart.indexOf(item), 1);
	  	  		}
	  	  	}
	  	  }
	  },
	  increment: function(item){
	  	  for(var i = 0; i < cart.length; i++){
	  	  	if(cart[i].id == item.id){
	  	  		cart[i].count += 1;
	  	  	}
	  	  }
	  },
	  remove: function(item){
		  cart.splice(cart.indexOf(item), 1);
	  },
	  getTotal:function(){
	      var total =0;
	      for( var i = 0; i < cart.length; i++ ) {			  
              total += cart[i].count * cart[i].harga;
          }
	      return total;
	  },
	  empty: function(){
		  cart.splice(0, cart.length);
	  }
  };
})
  
.factory('UserOrder', function(){
  var users = angular.fromJson(window.localStorage['users'] || '[]' );

		function persist(){
			window.localStorage['users'] = angular.toJson(users);
		}
		
  //var users = [];
  
  return {
	  get:function(){
		  return users;
	  },
	  create:function(user){
		  users.push(user);
		  persist();
	  },
	  remove: function(user){
		  users.splice(users.indexOf(user), 1);
		  persist();
	  },
	  empty: function(){
		  users.splice(0, users.length);
		  persist();
	  }	  
  };
})
  
.factory('OrderHistory', function(){
  var histories = angular.fromJson(window.localStorage['histories'] || '[]' );

		function persist(){
			window.localStorage['histories'] = angular.toJson(histories);
		}
		
  //var histories = [];

  return {
	  all: function(){
		  return histories;
	  },
	  add: function(item){
		  histories.push(item);
		  persist();
	  },
	  empty: function(){
		  histories.splice(0, histories.length);
		  persist();
	  }
  };

})
;
