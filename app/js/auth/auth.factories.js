;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('authFactory', function($http,RESCUE_GROUPS_URL, FIREBASE_URL, $location){

    function _login(email,password,cb){
      var ref= new Firebase(FIREBASE_URL);
      console.log(ref);
      ref.authWithPassword({
        email: email,
        password: password,
      }, function(error, authData){
        if(error === null) {
          console.log('user logged in', authData);
          _getShelterDogs();
          _getShelterOrgs();
          cb();
        } else {
          console.log('Error creating user:' + error);
        }
      });
    }

    function _getShelterOrgs(){
      var rescueOrgKeys = {
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
          }]
        }
      };

      _rescueGroupsRequest(rescueOrgKeys, 'shelterOrgs');
    }

    function _getShelterDogs(){
      console.log('dogs called');
      var rescueDogKeys ={
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
      _rescueGroupsRequest(rescueDogKeys, 'shelterDogs');
    }

    function _rescueGroupsRequest(keys, parent){
      var encodedKeys = JSON.stringify(keys);
      var url = 'https://api.rescuegroups.org/http/json/?data=' + encodedKeys + '&callback=JSON_CALLBACK';

      $http.jsonp(url)
        .success(function(data){
          // var rescueInfo = _objectToArray(data.data);
          var firebaseParent = parent;
          _postToFirebase(data.data, firebaseParent);
          console.log(data);
        })
      .error(function(err){
        console.log('you got an error: ' + err);

      });

    }

    function _postToFirebase(data,fbID){
      var url = FIREBASE_URL + fbID +  '/.json';
      var jsonData = angular.toJson(data);
      console.log(typeof jsonData);
      $http.put(url,data)
        .success(function(data){
          console.log('pushed, data');

        })
      .error(function(err){
        console.log('post firebase error: ' + err);

      });

    }


    return {
      login: _login
    };
  });
})();
