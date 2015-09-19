/**
 * @file
 * Provides a service for quering the api.
 */

angular.module('hwServices', [])
.service('homeworkService', function($q) {
  var self = this;
  /**
   * Saves a homework.
   *
   * @param homework
   *   Homework is an object that should contain keys:
   *    title
   *    question
   *    due, example 2015-09-14 16:15:50
   *
   * @return
   *  A promise object that will resolve to the new homework.
   */
  this.saveHomework = function (homework) {
    var deferred = $q.defer();
    var promise = deferred.promise;
    $.post(
      // Callback URL.
      '/api/v1/homeworks?authenticate_user=' + current_user.username,
      {'homework' : homework},
      function(result) {
        if (!result) {
          deferred.reject('Unable to save homework.');
          $('#alert-area').append('<div class="alert alert-warning" role="alert">Unable to save homework</div>');
        }
        else {
          deferred.resolve(result);
          $('#alert-area').append('<div class="alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Homework saved!</div>');
        }
      }
    );
    return promise;
  };
  /**
   * Saves a homework answer.
   *
   * @param homeworkAnswer
   *   Answer should contain the keys:
   *    answerText
   *
   * @return
   *  A promise object that will resolve to the new answer.
   */
  this.saveHomeworkAnswer = function (homeworkAnswer) {
    var deferred = $q.defer();
    var promise = deferred.promise;
    $.post(
      // Callback URL.
      '/api/v1/homeworks/' + homeworkAnswer.homework_id + '/answers?authenticate_user=' + current_user.username,
      {'answer' : homeworkAnswer},
      function(result) {
        if (!result) {
          deferred.reject('Unable to save homework answer.');
          $('#alert-area').append('<div class="alert alert-warning" role="alert">Unable to save homework answer</div>');
        }
        else {
          deferred.resolve(result);
          $('#alert-area').append('<div class="alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Answer saved!</div>');
        }
      }
    );
    return promise;
  };
  /**
   * Adds a user as assigned to a homework.
   *
   * @param homework
   *   A homework object including id.
   * @param userId
   *   The ID of the user.
   *
   * @return
   *  A promise object that will resolve to the new assignment.
   */
  this.assignUser = function (homework, userId) {
    var deferred = $q.defer();
    var promise = deferred.promise;
    $.post(
      // Callback URL.
      '/api/v1/homeworks/' + homework.id + '/assignments?authenticate_user=' + current_user.username,
      {assignment : {'user_id' : userId }},
      function(result) {
        if (!result) {
          deferred.reject('Unable to save homework assignment.');
          $('#alert-area').append('<div class="alert alert-warning" role="alert">Unable to save homework assignment</div>');
        }
        else {
          deferred.resolve(result);
        }
      }
    );
    return promise;
  };
  /**
   * Removes a user as assigned to a homework.
   *
   * @param homework
   *   A homework object including id.
   * @param userId
   *   The ID of the user.
   *
   * @return
   *  A promise object that will resolve to the deleted message.
   */
  this.unassignUser = function (homework, userId) {
    var deferred = $q.defer();
    var promise = deferred.promise;
    $.ajax({
      url: '/api/v1/homeworks/' + homework.id + '/assignments/' + userId + '?authenticate_user=' + current_user.username,
      type: 'DELETE',
      success: function(result) {
        if (!result) {
          deferred.reject('Unable to save homework assignment.');
          $('#alert-area').append('<div class="alert alert-warning" role="alert">Unable to save homework assignment</div>');
        }
        else {
          deferred.resolve(result);
        }
      }
    });
    return promise;
  };
  /**
   * Get all users.
   *
   * @return
   *  A promise object that will resolve to all users.
   */
  this.getUsers = function () {
    var deferred = $q.defer();
    var promise = deferred.promise;
    $.get(
      // Callback URL.
      '/api/v1/users?authenticate_user=' + current_user.username,
      function(result) {
        if (!result) {
          deferred.reject('Unable to fetch users.');
          $('#alert-area').append('<div class="alert alert-warning" role="alert">Unable to fetch users</div>');
        }
        else {
          deferred.resolve(result);
        }
      }
    );
    return promise;
  };
  /**
   * Get all homework.
   *
   * @return
   *  A promise object that will resolve to all homework.
   */
  this.getHomework = function () {
    var deferred = $q.defer();
    var promise = deferred.promise;
    $.get(
      // Callback URL.
      '/api/v1/homeworks?authenticate_user=' + current_user.username,
      function(result) {
        if (!result) {
          deferred.reject('Unable to fetch homework.');
          $('#alert-area').append('<div class="alert alert-warning" role="alert">Unable to fetch homework</div>');
        }
        else {
          deferred.resolve(result);
        }
      }
    );
    return promise;
  };
  /**
   * Get all answers for a specific student for a specific homework.
   *
   * @param homework
   *   A homework object including id.
   * @param student
   *   A student user object including id.
   *
   * @return
   *  A promise object that will resolve to all answers by student for a homework.
   */
  this.getHomeworkAnswersForStudent = function (homework, student) {
    var deferred = $q.defer();
    var promise = deferred.promise;
    $.get(
      // Callback URL.
      '/api/v1/homeworks/' + homework.id + '/answers/' + student.id + '?authenticate_user=' + current_user.username,
      function(result) {
        if (!result) {
          deferred.reject('Unable to fetch homework answers.');
          $('#alert-area').append('<div class="alert alert-warning" role="alert">Unable to fetch answers</div>');
        }
        else {
          deferred.resolve(result);
        }
      }
    );
    return promise;
  };
  /**
   * Get all answers for a homework
   *
   * @param homework
   *   A homework object including id.
   *
   * @return
   *  A promise object that will resolve to all answers for a homework.
   */
  this.getHomeworkAnswers = function (homework) {
    var deferred = $q.defer();
    var promise = deferred.promise;
    $.get(
      // Callback URL.
      '/api/v1/homeworks/' + homework.id + '/answers?authenticate_user=' + current_user.username,
      function(result) {
        if (!result) {
          deferred.reject('Unable to fetch homework answers.');
          $('#alert-area').append('<div class="alert alert-warning" role="alert">Unable to fetch answers</div>');
        }
        else {
          deferred.resolve(result);
        }
      }
    );
    return promise;
  };
  /**
   * Get all assignments for a homework.
   *
   * Assignments are an object with both user and homework information.
   *
   * @param homework
   *   A homework object including id.
   *
   * @return
   *  A promise object that will resolve to all assignments for a homework.
   */
  this.getHomeworkAssignments = function (homework) {
    var deferred = $q.defer();
    var promise = deferred.promise;
    $.get(
      // Callback URL.
      '/api/v1/homeworks/' + homework.id + '/assignments?authenticate_user=' + current_user.username,
      function(result) {
        if (!result) {
          deferred.reject('Unable to fetch homework assignments.');
          $('#alert-area').append('<div class="alert alert-warning" role="alert">Unable to fetch assignments</div>');
        }
        else {
          deferred.resolve(result);
        }
      }
    );
    return promise;
  };
  /**
   * Get all assignments for a specific user.
   *
   * Assignments are an object with both user and homework information.
   *
   * @param user
   *   A user object including id.
   *
   * @return
   *  A promise object that will resolve to all assignments for a user.
   */
  this.getHomeworkAssignmentsForUser = function (user) {
    var deferred = $q.defer();
    var promise = deferred.promise;
    $.get(
      // Callback URL.
      '/api/v1/users/' + user.id + '/assignments?authenticate_user=' + current_user.username,
      function(result) {
        if (!result) {
          deferred.reject('Unable to fetch homework assignments.');
          $('#alert-area').append('<div class="alert alert-warning" role="alert">Unable to fetch assignments</div>');
        }
        else {
          deferred.resolve(result);
        }
      }
    );
    return promise;
  };
})
