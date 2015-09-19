/**
 * @file
 * Provides components that can be used to create homework functionality.
 */

angular.module('components', ['templates', 'hwServices'])
  /**
   * Provides shared functionality relating to current user.
   *
   * Current user is currently signed in user. It is provided to the front
   * end via an object embeded on page.
   */
  .factory('hwCommon', [function () {
    return {
      /**
       * Test if current user matches a given role (student or teacher).
       *
       * @param role
       *   The string student or teacher.
       *
       * @return
       *   BOOL based on if current user matches the role.
       */
      currentUserIs: function (role) {
        return current_user && current_user.role == role;
      },
      /**
       * Returns the current user object.
       */
      currentUser: function() {
        return current_user ? current_user : {}
      },
      /**
       * Tests if current user can answer a homework.
       *
       * Only homeworks that have a due date before current date can be answered.
       * This constraint is currenly only enforced here in front end.
       *
       * @param homework
       *   A homework object.
       *
       * @return
       *   BOOL based on if current user can answer homework.
       */
      currentUserCanAnswer: function(homework) {
        var currentUser = current_user ? current_user : {};
        if (current_user && current_user.role == 'student') {
          return !homework.due || Date.parse(homework.due) > Date.now();
        }
        return false;
      }
    }
  }])
  .controller('hwController', ['$scope', 'hwCommon', function($scope, hwCommon) {
    $scope.currentUserIs = hwCommon.currentUserIs;
  }])
  /**
   * Provide a directive to show a homework form.
   *
   * Example <div homework-form></div>
   */
  .directive('homeworkForm', function(homeworkService, $rootScope) {
    return {
      scope: {},
      link: function(scope, element, attrs) {
        scope.homework = {};
        scope.submit = function() {
          homeworkService.saveHomework(scope.homework).then(function(homework) {
            $rootScope.$broadcast('homeworkAdded', homework);
          })
        }
      },
      templateUrl: 'homework-form.html',
    };
  })
  /**
   * Provide a directive to show a homework answer form.
   *
   * Example <div homework-answer-form homework="homework"></div>
   */
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
  /**
   * Provide a directive to show a homework assignment form.
   *
   * Example <div homework-assignment-form homework="homework"></div>
   */
  .directive('homeworkAssignmentForm', function(homeworkService, $rootScope) {
    return {
      scope: {
        homework: '='
      },
      link: function(scope, element, attrs) {
        scope.assignedUsers = {};
        // Keeps track of users currently assigned so can figure out
        // what assignments have changed.
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
  /**
   * Provide a directive to show a list of homework.
   *
   * For students, it will just show assigned homework. For teachers, all.
   *
   * Example <div homework-list></div>
   */
  .directive('homeworkList', function(homeworkService, hwCommon) {
    return {
      scope: {},
      link: function(scope, element, attrs) {
        scope.currentUserIs = hwCommon.currentUserIs;
        // If user is a student, only show their assigned homeworks.
        if (scope.currentUserIs('student')) {
          scope.homeworks = [];
          homeworkService.getHomeworkAssignmentsForUser(hwCommon.currentUser()).then(function(result) {
            for (var key in result) {
              scope.homeworks.push(result[key].homework);
            }
          });
        }
        // Teacher (or unknown role), show all homeworks.
        else {
          homeworkService.getHomework().then( function(result) {
            scope.homeworks = result;
            console.log(result)
          });
        }
        // If new homework added, add to the homework list.
        scope.$on('homeworkAdded', function (event, data) {
          scope.homeworks.push(data);
        });
      },
      templateUrl: 'homework-list.html',
    };
  })
  /**
   * Provide a directive to show a list of answers.
   *
   * Example <div homework-answer-list answers="answers"></div>
   */
  .directive('homeworkAnswerList', function(homeworkService, hwCommon) {
    return {
      scope: {
        answers: '='
      },
      link: function(scope, element, attrs) {
        scope.currentUserIs = hwCommon.currentUserIs;
        scope.answersUsers = {}
        scope.answerUser = {user_id : ''};
        for (var key in scope.answers) {
          var answer = scope.answers[key]
          if (!scope.answersUsers[answer.user.id]) {
            scope.answersUsers[answer.user.id] = answer.user;
          }
        }
      },
      templateUrl: 'homework-answer-list.html',
    };
  })
  /**
   * Provide a directive to show a list of users.
   *
   * Example <div user-list></div>
   */
  .directive('userList', function(homeworkService, hwCommon) {
    return {
      scope: {},
      link: function(scope, element, attrs) {
        scope.currentUserIs = hwCommon.currentUserIs;
        homeworkService.getUsers().then( function(result) {
          scope.users = result;
        });
      },
      templateUrl: 'user-list.html',
    };
  })
  /**
   * Provide a directive to provide a homework title that opens to more info.
   *
   * Example <div homework-modal homework="homework"></div>
   */
  .directive('homeworkModal', function(homeworkService, hwCommon) {
    return {
      scope: {
        homework: '='
      },
      link: function(scope, element, attrs) {
        scope.currentUserIs = hwCommon.currentUserIs;
        scope.currentUserCanAnswer = hwCommon.currentUserCanAnswer;
        // Students only see their own answers.
        if (scope.currentUserIs('student')) {
          homeworkService.getHomeworkAnswersForStudent(scope.homework, hwCommon.currentUser()).then(function(result) {
            scope.answers = result;
          });
          scope.$on('answerAdded', function (event, data) {
            if (data.homework_id == scope.homework.id) {
              scope.answers.push(data);
            }
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
      },
      templateUrl: 'homework-modal.html',
    };
  })
