;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('authFactory', function($http,RESCUE_GROUPS_URL, FIREBASE_URL, $location){

    function login(email,password,mainCB){
      var ref= new Firebase(FIREBASE_URL);
      ref.authWithPassword({
        email: email,
        password: password,
      }, function(error, authData){
        if(error === null) {
          console.log('user logged in');
          _getShelterDogs(function(dogs){
            _getShelterOrgs(dogs,function(dogs){
              _addContactInfo(dogs,function(){
                _postDogsToFirebase(mainCB);
              })
            })
          });
       } else {
          console.log('Error creating user:' + error);
        }
      });
    }

    function _getShelterDogs(cb){
      console.log('getShelterDogs');
      var keys ={
        'apikey':'pkF6l2hC',
        'objectType':'animals',
        'objectAction':'publicSearch',
        'search':{
          'calcFoundRows': 'Yes',
          'resultStart':0,
          'resultLimit':500,
          'resultSort':'animalID',
          'fields': [
          'animalID', 'animalName', 'animalSpecies', 'animalBreed', 'animalThumbnailUrl', 'animalSummary', 'animalSex', 'animalNeedsFoster', 'animalDescription', 'animalKillDate', 'locationName'

          ],
          'filters':[
            {
              'fieldName':'animalStatus',
              'operation':'equals',
              'criteria':'Available'
            },
            {
              'fieldName':'animalSpecies',
              'operation':'equal',
              'criteria':'Dog'
            },
            {
            'fieldName':'animalNeedsFoster',
            'operation':'equal',
            'criteria': 'yes'
            }
          ]
        }
      };
      var encodedKeys = JSON.stringify(keys);
      var url = 'https://api.rescuegroups.org/http/json/?data=' + encodedKeys + '&callback=JSON_CALLBACK';

      $http.jsonp(url)
      .success(function(shelterDogs){
        console.log('shelter dogs api done');
        cb(shelterDogs.data);
      })
      .error(function(err){
        console.log('you got an error: ' + err);
      });
    }

    function _getShelterOrgs(dogs,cb){
      console.log(dogs);
      cb();
    }

    function _addContactInfo(cb){
      console.log('addContactInfo');
      cb();
    }

    function _postDogsToFirebase(cb){
      console.log('postDogsToFirebase');
      cb();
    }

    return {
      login: login
    };
  });
})();
