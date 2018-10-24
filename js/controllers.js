angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $rootScope, $ionicHistory, $ionicModal, $timeout, $snackbar, $firebaseArray,fireBaseData,$state,SweetAlert,$ionicModal,$firebaseObject, $ionicPopup) {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $scope.user_info=user;
       uid=user.uid;
       $scope.user_extras= $firebaseObject(fireBaseData.refUser().child(user.uid));

        $scope.addresses= $firebaseArray(fireBaseData.refUser().child(user.uid).child("address"));


       var cart_item =  $firebaseArray(fireBaseData.refCart().child(uid));
  $scope.get_total= function() {
    var total_qty=0;
    for (var i = 0; i < cart_item.length; i++) {
      total_qty += cart_item[i].item_qty;
    }
    return total_qty;
  };
    }else {


      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
      $state.go('login', {}, {location: "replace"});

    }
  });

  $ionicModal.fromTemplateUrl('templates/profile.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openProfile = function(){
    $scope.modal.show();
  }

  $scope.logout=function(){

     var confirmPopup = $ionicPopup.confirm({
        title: 'Konfirmasi',
        template: 'Anda yakin ingin logout?',
        buttons: [
          { text: 'Tidak' , type: 'button-stable' },
          { text: 'Ya', type: 'button-positive' , 
          onTap: function(){
             firebase.auth().signOut().then(function() {

              $ionicHistory.nextViewOptions({
                historyRoot: true
              });

              $state.go('login', {}, {location: "replace"});

              }, function(error) {
                 //error
              });
          } 
         }
        ]
      });
  }

  $scope.addAddress = function(edit_val){
    if(edit_val!=null) {
        $scope.data = edit_val; 
        var title="Edit Alamat";
      }
      else {
        $scope.data = {};    
        var title="Tambah Alamat";
      }

      var addressPopup = $ionicPopup.show({
        template:  '<input type="text"   placeholder="Alamat" ng-model="data.address"> <br/> ' +
                  '<input type="number" placeholder="Kode pin" ng-model="data.pin"> <br/> ',
        title: title,
        scope: $scope,
        buttons: [
          { text: 'Tutup' },
          {
            text: '<b>Simpan</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.address || !$scope.data.pin ) {
                e.preventDefault(); 
              } else {
                return $scope.data;
              }
            }
          }
        ]
      });

      addressPopup.then(function(res) {

        if(edit_val!=null) {
          
          if(res!=null){ 
            fireBaseData.refUser().child($scope.user_info.uid).child("address").child(edit_val.$id).update({    // set
              address: res.address,
              pin: res.pin,
            });

             var options = {
              message:"Update tersimpan",
              messageColor:"white",
              time:2000
            };
            $snackbar.show(options);
          }
        }else{
         
          fireBaseData.refUser().child($scope.user_info.uid).child("address").push({    // set
            address: res.address,
            pin: res.pin,
          });

          var options = {
              message:"Data tersimpan",
              messageColor:"white",
              time:2000
            };
            $snackbar.show(options);
        }

      });

  }


  $scope.deleteAddress = function(del_id) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Hapus Alamat',
        template: 'Anda yakin ingin menghapus alamat ini?',
        buttons: [
          { text: 'Tidak' , type: 'button-stable' },
          { text: 'Ya', type: 'button-positive' , onTap: function(){return del_id;} }
        ]
      });

      confirmPopup.then(function(res) {
        if(res) {
          fireBaseData.refUser().child($scope.user_info.uid).child("address").child(res).remove();
        }
      });
    };
})
  
.controller('HomeCtrl', function($scope, $state, $ionicModal, $rootScope, $ionicHistory, $timeout, $snackbar, MenuServices, CartServices, SweetAlert, $firebaseArray,fireBaseData, $firebaseObject) {
  
  firebase.auth().onAuthStateChanged(function(user, $q, $http) {
    if (user) {
      $scope.user_info=user;
       uid=user.uid;

       $scope.cart =  $firebaseArray(fireBaseData.refCart().child(uid));

       var cart_item =  $firebaseArray(fireBaseData.refCart().child(uid));
  $scope.get_total= function() {
    var total_qty=0;
    for (var i = 0; i < cart_item.length; i++) {
      total_qty += cart_item[i].item_qty;
    }
    return total_qty;
  };
    }else {


      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
      $state.go('login', {}, {location: "replace"});

    }
    var metadata = {
  contentType: 'image/jpeg',
};
  var fileName = 'img/bolukeju.jpg';
  var blob = new Blob([fileName], { type: "image/jpeg" });
    var storageRef = firebase.storage().ref();

  var fileRef = storageRef.child(uid).child("images"); 
  var uploadTask = fileRef.put(blob);

   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      function(snapshot) {
         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         console.log('Upload is ' + progress + '% done');
         switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING:
              console.log('Upload is running');
              break;
         }
     });
 
   
  });



  $scope.slider = [{
		  id: 1,
		  pic: 'slider1.png'
	  },{
		  id: 2,
		  pic: 'slider2.png'
	  },{
		  id: 3,
		  pic: 'slider3.png'
  }];

  $scope.valueQty = 1;

  $scope.qtyIncrease = function(){
    $scope.valueQty++;
    console.log('clicked')
  }

  $scope.qtyDecrease = function(){
    $scope.valueQty--;
    console.log('clicked')
  }

  $scope.resetQty = function(){
    $scope.valueQty = 1;
  }

  $ionicModal.fromTemplateUrl('templates/detail.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.productDetail = function (item) {
      $scope.product = $firebaseObject(fireBaseData.refList().child(item));
      $scope.modal.show();
      $scope.review = $firebaseArray(fireBaseData.refReview().child(item).child("comments"));
  };
  
  $scope.menu=$firebaseArray(fireBaseData.refList());
  
  $scope.submit = function(product, comment){
    var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      if(dd<10) {
          dd = '0'+dd
      } 

      if(mm<10) {
          mm = '0'+mm
      } 

      currentDate = dd + '-' + mm + '-' + yyyy;
      fireBaseData.refReview().child(product.$id).child('comments').push({
        content : comment,
        user_name: $scope.user_info.displayName,
        date: currentDate

      });

      $scope.comment ='';
  }

  $scope.add = function(item, valueQty) {
    fireBaseData.refCart().child(uid).once("value", function(snapshot) {

      if( snapshot.hasChild(item.$id) == true ){

        var options = {
          message:"Tambahkan quantity di keranjang",
          messageColor:"white",
          time:2000
        };
        $snackbar.show(options);
        $scope.modal.hide();

      } else{

        fireBaseData.refCart().child(uid).child(item.$id).set({    
          item_name: item.name,
          item_image: item.image,
          item_price: item.price,
          item_qty: valueQty
        });

        var options = {
          message:"Produk Berhasil Ditambahkan",
          messageColor:"white",
          time:2000
        };
        $snackbar.show(options);
        $scope.modal.hide();
      }
        
    });
    
  };
  
  $scope.listView = true;
  $scope.gridView = false;
  $scope.searchView = false;
  
  $scope.grid = function(){
	  $scope.listView = false;
	  $scope.gridView = true;
	  $scope.searchView = false;
	  
  };
  
  $scope.list = function(){
	  $scope.listView = true;
	  $scope.gridView = false;
	  $scope.searchView = false;
  };
  
  $scope.search = function(){
	  $scope.searchView = true;
	  $scope.listView = false;
	  $scope.gridView = false;
	  $scope.searchItem = {};
  };

  $scope.detailView = true;
  $scope.reviewView = false;

  $scope.detailTab = function(){
    $scope.detailView = true;
    $scope.reviewView = false;
  }

  $scope.reviewTab = function(){
    $scope.detailView = false;
    $scope.reviewView = true;
  }
  
})
  
.controller('CartCtrl', function($scope, $rootScope, $timeout, $snackbar, CartServices, $state, SweetAlert, $firebaseArray,fireBaseData,$ionicHistory) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $scope.user_info=user;
       uid=user.uid;
       $scope.cart =  $firebaseArray(fireBaseData.refCart().child(uid));

        var cart_item =  $firebaseArray(fireBaseData.refCart().child(uid));
        $scope.get_total = function(){
          var total =0;
          for( var i = 0; i < cart_item.length; i++ ) {        
            total += cart_item[i].item_qty * cart_item[i].item_price;
          }
          return total;
        }
       
        
    }else {


      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
      $state.go('login', {}, {location: "replace"});

    }
  });

  
  
  //$scope.userOrder = UserOrder.get();

  $scope.removeFromCart = function(item_id){
      fireBaseData.refCart().child(uid).child(item_id).remove();
      var options = {
        message:"Produk Berhasil Dihapus",
        messageColor:"white",
        time:2000
      };
      $snackbar.show(options);
    };

  $scope.removeItem = function(item) {
	  CartServices.remove(item);
	  $scope.total = CartServices.getTotal();
	  var options = {
		  message:"Produk Berhasil Dihapus",
		  messageColor:"white",
		  time:2000
	  };
	  $snackbar.show(options);
  };
  
  $scope.incItem = function(item_id){

      fireBaseData.refCart().child(uid).once("value", function(snapshot) {
        if( snapshot.hasChild(item_id) == true ){

          var currentQty = snapshot.child(item_id).val().item_qty;
         
          fireBaseData.refCart().child(uid).child(item_id).update({
            item_qty : currentQty+1
          });

        }else{
         
        }
      });

    };

  $scope.decItem = function(item_id){

     
      fireBaseData.refCart().child(uid).once("value", function(snapshot) {
        if( snapshot.hasChild(item_id) == true ){

          var currentQty = snapshot.child(item_id).val().item_qty;

          if( currentQty-1 <= 0){
             fireBaseData.refCart().child(uid).child(item_id).remove();
             var options = {
              message:"Produk Berhasil Dihapus",
              messageColor:"white",
              time:2000
            };
            $snackbar.show(options);
          }else{
            fireBaseData.refCart().child(uid).child(item_id).update({
              item_qty : currentQty-1
            });
          }

        }else{
         
        }
      });

    };
  
  $scope.confirm = function(){
	  var checkUser = UserOrder.get();
	  
	  if(checkUser.length == 0){
	      SweetAlert.swal({  
              title: "Order Gagal",
              text: "Anda belum mengisi order detail",
              animation: "pop",
              confirmButtonColor: "#D50000",
              confirmButtonText: "OK",
          });
	  }else{
		  SweetAlert.swal({  
              title: "Terima Kasih",
              text: "Pesanan anda akan segera diproses",
              animation: "pop",
              confirmButtonColor: "#D50000",
              confirmButtonText: "OK",
          });
		  
		  var cart = CartServices.all();
		  /*for(var i = 0; i < cart.length; i++){	  
			  
			  //time: new Date().toLocaleDateString(),
			  item = angular.copy(cart[i]);
		      OrderHistory.add(item);
		  }*/

      item = {
        time: new Date().toLocaleDateString(),
        order : angular.copy(cart),
        total: CartServices.getTotal()
      };
		  
      OrderHistory.add(item);
		  CartServices.empty();
		  $scope.total = CartServices.getTotal();
		       		  
	  }
  };

})
  
.controller('AboutCtrl', function($scope, $rootScope, $state, $ionicHistory, SweetAlert, OrderHistory, UserOrder){

  $scope.reset = function(){
    SweetAlert.swal({
          title: "Anda yakin?",
          text: "Seluruh data anda akan dihapus dan aplikasi akan diatur ulang",
          showCancelButton: true,
          confirmButtonColor: "#D50000",
          confirmButtonText: "OK",
      cancelButtonText: "BATAL",
          closeOnConfirm: true},
      function(isConfirm){
       if(isConfirm){ 
           UserOrder.empty();
           OrderHistory.empty();

            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go('app.home');
                 
       }
      });
  };
})
  
.controller('LoginCtrl', function($scope, $state, $rootScope, $ionicHistory,fireBaseData){
  $scope.loginView = true;
  $scope.signupView = false;

  $scope.$on('$ionicView.enter', function(ev) {
      if(ev.targetScope !== $scope){
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
      }
    });

    //Cek user sudah login atau belum
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
       
        $state.go('app.home', {}, {location: "replace"});

      }
    });

    $scope.changeViewSignUp = function(){
       $scope.loginView = false;
      $scope.signupView = true;
    }

    $scope.changeViewLogin = function(){
       $scope.loginView = true;
      $scope.signupView = false;
    }

    $scope.loginEmail = function(formName,cred) {


      if(formName.$valid) {  // cek jika form sudah valid atau belum

          firebase.auth().signInWithEmailAndPassword(cred.email,cred.password).then(function(result) {

              $ionicHistory.nextViewOptions({
                historyRoot: true
              });
              
              $state.go('app.home', {}, {location: "replace"});

            },
            function(error) {
              
            }
        );

      }else{
        
      }

    };

    $scope.signupEmail = function (formName, cred) {

      if (formName.$valid) {  // Check if the form data is valid or not

        firebase.auth().createUserWithEmailAndPassword(cred.email, cred.password).then(function (result) {

            var result = firebase.auth().currentUser;

            result.updateProfile({
              displayName: cred.name,
              photoURL: "default_dp"
            }).then(function() {}, function(error) {});

            fireBaseData.refUser().child(result.uid).set({
              telephone: cred.phone,
              name: cred.name,
              email: cred.email
            });

            $ionicHistory.nextViewOptions({
              historyRoot: true
            });
          
            $state.go('app.home', {}, {location: "replace"});

        }, function (error) {
            
        });

      }else{
        
      }

    }

})

.controller('OrderDetailCtrl', function($scope, $rootScope, $ionicModal, $ionicHistory, UserOrder, SweetAlert, OrderHistory){
  
  $scope.userOrder = UserOrder.get();
  
  $scope.removeUser = function(user){
	  SweetAlert.swal({
          title: "Anda yakin?",
          text: "Riwayat belanja anda juga akan terhapus",
          showCancelButton: true,
          confirmButtonColor: "#D50000",
          confirmButtonText: "OK",
		  cancelButtonText: "BATAL",
          closeOnConfirm: false},
      function(isConfirm){
			 if(isConfirm){ 
			     UserOrder.remove(user);
			     OrderHistory.empty();
                 SweetAlert.swal({ 
                     title: "Berhasil dihapus",
                     animation: "pop",
                     confirmButtonColor: "#D50000",
                     confirmButtonText: "OK",
                 });
			 }
      });
  };
  
  $ionicModal.fromTemplateUrl('templates/order-form.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.user = {};
  
  $scope.save = function(user){
	  if(user && user.nama && user.alamat && user.telp && user.pos && user.kota && user.pembayaran){
	     UserOrder.create(user);
		 SweetAlert.swal({  
              title: "Tersimpan",
              text: "Data anda berhasil disimpan",
              animation: "pop",
              confirmButtonColor: "#D50000",
              confirmButtonText: "OK",
          });
		  $scope.modal.hide();
		  $scope.user = {};
	  }else{
		  SweetAlert.swal({  
              title: "Menyimpan Gagal",
              text: "Data tidak lengkap",
              animation: "pop",
              confirmButtonColor: "#D50000",
              confirmButtonText: "OK",
          });
          $scope.modal.hide();	  
	  }
  };

})
  
.controller('OrderHistoryCtrl', function($scope, $rootScope, $ionicHistory, OrderHistory){
  
  $scope.history = OrderHistory.all();
  
})

.controller('CheckoutCtrl', function($scope,$state, $ionicHistory, fireBaseData, $firebaseArray,$firebaseObject){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $scope.user_info=user;
       uid=user.uid;
       $scope.cart =  $firebaseArray(fireBaseData.refCart().child(uid));
        $scope.addresses= $firebaseArray( fireBaseData.refUser().child(user.uid).child("address") );
        $scope.user_extras= $firebaseObject(fireBaseData.refUser().child(user.uid));

        var cart_item =  $firebaseArray(fireBaseData.refCart().child(uid));
        $scope.get_total = function(){
          var total =0;
          for( var i = 0; i < cart_item.length; i++ ) {        
            total += cart_item[i].item_qty * cart_item[i].item_price;
          }
          return total;
        }
       var cart_item = $firebaseArray(fireBaseData.refCart().child($scope.user_info.uid));

 $scope.pay=function(address,payment, downpayment){

     
        // Loop throw all the cart item
        for (var i = 0; i < cart_item.length; i++) {

          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth()+1; //January is 0!
          var yyyy = today.getFullYear();

          if(dd<10) {
              dd = '0'+dd
          } 

          if(mm<10) {
              mm = '0'+mm
          } 

          currentDate = dd + '-' + mm + '-' + yyyy;
          //Add cart item to order table
          fireBaseData.refOrder().push({

            //Product data is hardcoded for simplicity
            product_name: cart_item[i].item_name,
            product_price: cart_item[i].item_price,
            product_image: cart_item[i].item_image,
            product_id: cart_item[i].$id,

            //item data
            item_qty: cart_item[i].item_qty,

            //Order data
            user_id: $scope.user_info.uid,
            user_name:$scope.user_info.displayName,
            status: "Di proses",
            date: currentDate
          });

        }

        fireBaseData.refUser().child($scope.user_info.uid).child("messages").push({    // set
            title: "Order Baru",
            content: "Terima kasih. Pemesanan anda akan di proses setelah transaksi anda selesai",
            status: "unread",
            date: currentDate
        });

        //Remove users cart
        fireBaseData.refCart().child($scope.user_info.uid).remove();

        

        // Go to past order page
        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        $state.go('app.home', {}, {location: "replace", reload: true});
      
    }

      console.log(cart_item)

        
    }else {


      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
      $state.go('login', {}, {location: "replace"});

    }
  });



  $scope.payment = [
  {id:'Delivery', name:'Delivery', price:'10000'}
  ];

})
;
