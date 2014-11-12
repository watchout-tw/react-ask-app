
var app = angular.module("app", [
  "ngRoute"
]);

app.filter('htmlToPlaintext', function() {
    return function(text) {
      var plain = String(text).replace(/<[^>]+>/gm, '');

      plain.replace(/&nbsp;/gi,' ');
      return plain;
    }
});

//http://stackoverflow.com/questions/16310298/if-a-ngsrc-path-resolves-to-a-404-is-there-a-way-to-fallback-to-a-default
app.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {

      scope.$watch(function() {
          return attrs['ngSrc'];
        }, function (value) {
          if (!value) {
            element.attr('src', attrs.errSrc);
          }
      });

      element.bind('error', function() {
        element.attr('src', attrs.errSrc);
      });
    }
  }
});

app.config(['$routeProvider','$locationProvider',
  function($routeProvider,$locationProvider){
    $routeProvider.
      when('/policy/:pid',{
      templateUrl: 'partials/policy.html',
      controller: 'PolicyCtrl'
    }).
      otherwise({
      redirectTo:'/',
      templateUrl: 'partials/index.html',
      controller: 'IndexCtrl'
    });

    //$locationProvider.html5Mode(true);

  }
]);

app.factory('DataService', function ($http, $q){

  var DataService = {};
  DataService.getData = function(path){
    var deferred = $q.defer();
    $http.get('data/'+path+'.json').
        success(function(data, status, headers, config) {
          deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
          deferred.resolve(data);
        });
    return deferred.promise;
  };


  return DataService;
})


app.controller('NavCtrl', ['$scope', 'DataService', '$location', '$sce', function ($scope, DataService, $location, $sce){

  $scope.go = function(path){
      $("body").scrollTop(0);
      $location.path(path);
  };
  DataService.getData('policy').then(function(data){
      $scope.policy = data;
  });
  $scope.showsidebar = function(value){
      if(value === 'toggle'){
          $scope.sidebar = !$scope.sidebar;
      }else{
          $scope.sidebar = value;
      }

  }


}]);
app.controller('IndexCtrl', ['$scope', 'DataService', '$location', '$sce', function ($scope, DataService, $location, $sce){

  $scope.go = function(path){
      $("body").scrollTop(0);
      $location.path(path);
  };


  DataService.getData('policy').then(function(data){
      $scope.policy = data;
  });


}]);

app.controller('PolicyCtrl', ['$scope', 'DataService', '$location', '$sce', '$routeParams', function ($scope, DataService, $location, $sce, $routeParams){

  DataService.getData('parsed_issues').then(function(data){
      $scope.issues = data;
  });

  $scope.candidateFilter = function(n){
      if(n.state === 'responded')
         return n;
  };

  $scope.go = function(path){
      $("body").scrollTop(0);
      $location.path(path);
  };

  DataService.getData('parsed_questions').then(function(data){
      $scope.questions = [];
      $scope.questionsObj = data;
      for(var key in data){
          $scope.questions.push(data[key]);
      }
  });
  DataService.getData('parsed_candidates').then(function(data){
      $scope.candidates = data;
  });

  DataService.getData('policy').then(function(data){
      if($routeParams.pid){
          $scope.policy = data[$routeParams.pid];
      }
  });



  $scope.showQuestion = function(qid){
    return $scope.focusQuestion === qid;
  };



  $scope.toggleQuestion = function(qid){


    if($scope.focusQuestion === qid){
        $scope.focusQuestion = false;
        $scope.focusQuestionTitle = null;

    }else{
        $scope.focusQuestion = qid;
        $scope.focusQuestionTitle = $scope.questionsObj[qid].title;
    }

  };

  $scope.toTrusted = function(html_code) {
    return $sce.trustAsHtml(html_code);
  };
  $scope.responseShowState = {};

  $scope.togglePolicy = function(){
    $scope.policyShowState = !$scope.policyShowState;
  };
  $scope.showPolicy = function(){
    return $scope.policyShowState;
  };

  $scope.resetFocus = function(){
      console.log("RESET");

      $scope.policyShowState = false;
      $scope.focusQuestion = false;
      $scope.focusQuestionTitle = null;
  };


  $scope.toogleAskQuestionForm = function(){
      $scope.showAskQuestionForm = !$scope.showAskQuestionForm;
  };



}]);

