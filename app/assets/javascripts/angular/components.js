
angular.module('components', ['templates', 'hwServices'])
  .factory('hwCommon', [function () {
    return {
      currentUserIs: function (role) {
        return current_user && current_user.role == role;
      },
      currentUser: function() {
        return current_user ? current_user : {}
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
  .directive('homeworkAnswerForm', function(homeworkService, $rootScope) {
    return {
      scope: {
        homework: '='
      },
      link: function(scope, element, attrs) {
        scope.homeworkAnswer = {
          'homework_id' : scope.homework.id
        };
        scope.submit = function() {
          homeworkService.saveHomeworkAnswer(scope.homeworkAnswer).then(function(answer) {
            $rootScope.$broadcast('answerAdded', answer);
          })
        }
      },
      templateUrl: 'homework-answer-form.html',
    };
  })
  .directive('homeworkAssignmentForm', function(homeworkService, $rootScope) {
    return {
      scope: {
        homework: '='
      },
      link: function(scope, element, attrs) {
        scope.assignedUsers = {};
        function updateAssignedUsersCurrent() {
          scope.assignedUsersCurrent = {}
          for (var key in scope.assignedUsers) {
            scope.assignedUsersCurrent[key] = scope.assignedUsers[key];
          }
        }
        homeworkService.getUsers().then(function(result) {
          // @todo exapand the user service to return filtered by role.
          scope.users = [];
          for (var key in result) {
            if (result[key].role == 'student') {
              scope.users.push(result[key]);
              scope.assignedUsers[result[key].id] = false;
            }
          }
          homeworkService.getHomeworkAssignments(scope.homework).then(function(result) {
            for (key in result) {
              scope.assignedUsers[result[key].user_id] = true;
            }
            updateAssignedUsersCurrent();
          });
        });
        scope.submit = function() {
          for (var key in scope.users) {
            var userId = scope.users[key].id;
            // User was added as assigned.
            if (scope.assignedUsers[userId] && !scope.assignedUsersCurrent[userId]) {
              homeworkService.assignUser(scope.homework, userId);
            }
            // User was removed as assigned.
            else if (!scope.assignedUsers[userId] && scope.assignedUsersCurrent[userId]) {
              homeworkService.unassignUser(scope.homework, userId);
            }
          }
          updateAssignedUsersCurrent();
        }
      },
      templateUrl: 'homework-assigment-form.html',
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
  .directive('homeworkModal', function(homeworkService, hwCommon) {
    return {
      scope: {
        homework: '='
      },
      link: function(scope, element, attrs) {
        scope.currentUserIs = hwCommon.currentUserIs;
        // Students only see their own answers.
        if (scope.currentUserIs('student')) {
          homeworkService.getHomeworkAnswersForStudent(scope.homework, hwCommon.currentUser()).then(function(result) {
            scope.answers = result;
          });
        }
        // Teachers see all answers.
        else if (scope.currentUserIs('teacher')) {
          homeworkService.getHomeworkAnswers(scope.homework).then(function(result) {
            scope.answers = result;
          });
        }
        else {
          scope.answers = [];
        }
        scope.$on('answerAdded', function (event, data) {
          scope.answers.push(data);
        });
      },
      templateUrl: 'homework-modal.html',
    };
  })
