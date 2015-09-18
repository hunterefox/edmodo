angular.module('hwServices', [])

/**
 * Services that can be used for any node object.
 */
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
   * Saves a homework.
   *
   * @param homeworkAnswer
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
  this.getHomeworkAnswersForStudent = function (homework, currentUser) {
    var deferred = $q.defer();
    var promise = deferred.promise;
    $.get(
      // Callback URL.
      '/api/v1/homeworks/' + homework.id + '/answers/' + currentUser.id + '?authenticate_user=' + current_user.username,
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
})
