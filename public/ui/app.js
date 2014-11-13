
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
      when('/policy/:cid/:pid',{
      templateUrl: 'partials/policy.html',
      controller: 'PolicyCtrl'
    }).
      when('/rank/:cid',{
      templateUrl: 'partials/rank.html',
      controller: 'RankCtrl'
    }).
      when('/policy/:cid',{
      templateUrl: 'partials/candidate.html',
      controller: 'CandidateCtrl'
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

  $scope.showsidebar = function(value){
      if(value === 'toggle'){
          $scope.sidebar = !$scope.sidebar;
      }else{
          $scope.sidebar = value;
      }
  }

  $scope.toggleCandidateMenu = function(){
    $scope.showCandidateMenu = !$scope.showCandidateMenu;
  };
  $scope.toggleUserMenu = function(){
    $scope.showUserMenu = !$scope.showUserMenu;

  };
  $scope.login = function(){
    $scope.user = {"name" : "username tool ongcanno tshowall"};

  };
  $scope.logout = function(){
    $scope.user = null;
  };

  DataService.getData('candidate').then(function(data){
      $scope.candidates = data;
  });
  $scope.chooseCandidate = function(cid){
     $location.path('/policy/'+cid);
  };




}]);
app.controller('IndexCtrl', ['$scope', 'DataService', '$location', '$sce', function ($scope, DataService, $location, $sce){

  $scope.go = function(path){
      $("body").scrollTop(0);
      $location.path(path);
  };
  DataService.getData('candidate').then(function(data){
      $scope.candidate = data;
  });

}]);
app.controller('CandidateCtrl', ['$scope', 'DataService', '$location', '$sce', '$routeParams', function ($scope, DataService, $location, $sce, $routeParams){

  $scope.go = function(path){
      $("body").scrollTop(0);
      $location.path(path);
  };


  DataService.getData('policy').then(function(data){
      var validID = ["5","6","7"];
      var cid = $routeParams.cid;

      if(validID.indexOf($routeParams.cid)!== -1){
        $scope.policy = Object.keys(data[cid]).map(function(o){ return data[cid][o];});

      }else{
        $location.path('/');
      }

  });


  DataService.getData('candidate').then(function(data){
      var validID = ["5","6","7"];
      var cid = $routeParams.cid;

      if(validID.indexOf($routeParams.cid)!== -1){
        $scope.candidate = data[cid];
      }else{
        $location.path('/');
      }

  });


  $scope.previousCandidate = function(){
    //console.log("pre"+$routeParams.cid);
    var cid = parseInt($routeParams.cid)-1;
    if(cid < 5)
       cid = (cid % 3) + 6;
    $location.path('/policy/'+cid);

  };
  $scope.nextCandidate = function(){
    //console.log("next"+$routeParams.cid);
    var cid = parseInt($routeParams.cid)+1;

    if(cid > 7)
       cid = (cid % 3) + 3;

    $location.path('/policy/'+cid);

  };


}]);

app.controller('PolicyCtrl', ['$scope', 'DataService', '$location', '$sce', '$routeParams', function ($scope, DataService, $location, $sce, $routeParams){


  DataService.getData('candidate').then(function(data){
      var validID = ["5","6","7"];
      var cid = $routeParams.cid;

      if(validID.indexOf($routeParams.cid)!== -1){
        $scope.candidate = data[cid];

      }else{
        $location.path('/');
      }

  });

  $scope.previousPolicy = function(){
    var pid = parseInt($routeParams.pid)-1;
    if(pid < 1)
       pid = $scope.policyLength;

    $location.path('/policy/'+$routeParams.cid+'/'+pid);

  };
  $scope.nextPolicy = function(){
    console.log($scope.policyLength);
    var pid = parseInt($routeParams.pid)+1;
    if(pid > $scope.policyLength)
       pid = 1;

    $location.path('/policy/'+$routeParams.cid+'/'+pid);

  };

  $scope.go = function(path){
      $("body").scrollTop(0);
      $location.path(path);
  };

  DataService.getData('questions').then(function(data){
      $scope.questions = [];
      var cid = $routeParams.cid;
      var pid = $routeParams.pid;
      $scope.questionsObj = data[cid][pid];
      for(var key in $scope.questionsObj){
          $scope.questions.push($scope.questionsObj[key]);
      }
  });

  DataService.getData('policy').then(function(data){
      var validID = ["5","6","7"];
      var cid = $routeParams.cid;

      if($routeParams.pid){
         if(validID.indexOf($routeParams.cid)!== -1){
            $scope.policy = Object.keys(data[cid]).map(function(o){ return data[cid][o];});
            $scope.policyLength = Object.keys(data[cid]).length;
            $scope.currentPolicy = data[cid][$routeParams.pid];
         }else{
           $location.path('/');
         }
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
app.controller('RankCtrl', ['$scope', 'DataService', '$location', '$sce', '$routeParams', function ($scope, DataService, $location, $sce, $routeParams){

  $scope.go = function(path){
      $("body").scrollTop(0);
      $location.path(path);
  };

  DataService.getData('questions').then(function(data){
      $scope.questions = [];

      var validID = ["5","6","7"];
      var cid = $routeParams.cid;

      if(validID.indexOf($routeParams.cid)!== -1){
          for(var pid in data[cid]){
              for(var key in data[cid][pid]){
                  //console.log(data[cid][pid][key]);
                  $scope.questions.push(data[cid][pid][key]);
              }
          }

      }else{
        $location.path('/');
      }



  });

  $scope.showQuestion = function(qid){
    return $scope.focusQuestion === qid;
  };

  $scope.toggleQuestion = function(qid){
    if($scope.focusQuestion === qid){
        $scope.focusQuestion = false;

    }else{
        $scope.focusQuestion = qid;
    }

  };

  $scope.resetFocus = function(){
      console.log("RESET");
      $scope.policyShowState = false;
      $scope.focusQuestion = false;

  };



}]);
