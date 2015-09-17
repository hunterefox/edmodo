
angular.module('components', ['templates', 'hwServices'])
  .factory('hwCommon', [function () {
    return {
      currentUserIs: function (role) {
        return current_user && current_user.role == role;
      }
    }
  }])
  .controller('hwController', ['$scope', 'hwCommon', function($scope, hwCommon) {
    $scope.currentUserIs = hwCommon.currentUserIs;
  }])
  .directive('homeworkForm', function(homeworkService) {
    return {
      scope: {},
      link: function(scope, element, attrs) {
        scope.homework = {};
        scope.submit = function() {
          homeworkService.saveHomework(scope.homework);
        }
      },
      templateUrl: 'homework-form.html',
    };
  })
  .directive('homeworkAnswerForm', function(homeworkService) {
    return {
      scope: {
        homeworkObject: '='
      },
      link: function(scope, element, attrs) {
        scope.homeworkAnswer = {
          'homework_id' : scope.homeworkObject.id
        };
        scope.submit = function() {
          homeworkService.saveHomeworkAnswer(scope.homeworkAnswer);
        }
      },
      templateUrl: 'homework-answer-form.html',
    };
  })
  .directive('homeworkList', function(homeworkService, hwCommon) {
    return {
      scope: {},
      link: function(scope, element, attrs) {
        scope.currentUserIs = hwCommon.currentUserIs;
        homeworkService.getHomework().then( function(result) {
          scope.homeworks = result;
        });
      },
      templateUrl: 'homework-list.html',
    };
  })