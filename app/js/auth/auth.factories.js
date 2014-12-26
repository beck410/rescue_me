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
          _getShelterDogs(mainCB,function(mainCB,dogs){
            _getShelterOrgs(mainCB,dogs,function(mainCB,dogs,orgs){
              _addContactInfo(mainCB,dogs,orgs,function(mainCB){
                _postDogsToFirebase(mainCB,dogs);
              })
            })
          });
       } else {
          console.log('Error creating user:' + error);
        }
      });
    }

    function _getShelterDogs(mainCB, cb){
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
        cb(mainCB,shelterDogs.data);
      })
      .error(function(err){
        console.log('you got an error: ' + err);
      });
    }

    function _getShelterOrgs(mainCB,dogs,cb){
      console.log('get shelter orgs');
      var keys = {
        'apikey': 'pkF6l2hC',
        'objectType': 'orgs',
        'objectAction': 'publicSearch',
        'search': {
          'resultStart' : 0,
          'resultLimit' : 500,
          'resultSort': 'orgID',
          'resultOrder' : 'asc',
          'calcFoundRows': 'Yes',
          'fields': [
          'orgID','orgLocation','orgName', 'orgAddress', 'orgCity','orgPhone','orgEmail','orgWebsiteUrl','orgState'
          ],
          'filters':[
            {
              'fieldName':'orgID',
              'operation':'notblank',
            }
          ]
        }
      };
      var encodedKeys = JSON.stringify(keys);
      var url = 'https://api.rescuegroups.org/http/json/?data=' + encodedKeys + '&callback=JSON_CALLBACK';

      $http.jsonp(url)
      .success(function(shelterOrgs){
        console.log('shelter orgs api done');
        cb(mainCB,dogs,shelterOrgs.data);
      })
      .error(function(err){
        console.log('you got an error: ' + err);
      });
    }

    function _addContactInfo(mainCB,dogs,orgs,cb){
      console.log('addContactInfo');
      for(var dog in dogs){
        var dogId = dogs[dog].animalOrgID;
        var dogShelter = (_.filter(orgs,{'orgID':dogId}));
        if(dogShelter.length !== 0){
          dogs[dog].shelterName = dogShelter[0].orgName || '';
          dogs[dog].shelterEmail = dogShelter[0].orgEmail || '';
          dogs[dog].shelterAddress = dogShelter[0].orgAddress || '';
          dogs[dog].shelterCity = dogShelter[0].orgCity || '';
          dogs[dog].shelterPhone = dogShelter[0].orgPhone || '';
          dogs[dog].shelterWebsite = dogShelter[0].orgWebsiteUrl || '';
          dogs[dog].shelterState = dogShelter[0].orgState || '';
        }
      };
      cb(mainCB,dogs)
    }

    function _postDogsToFirebase(cb,dogs){
      console.log('post dogs')
      console.log(dogs);
      cb();
    }

    return {
      login: login
    };
  });
})();
