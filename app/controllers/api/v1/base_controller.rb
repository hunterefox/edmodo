class Api::V1::BaseController < ApplicationController
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  # Recover from errors
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActionController::InvalidAuthenticityToken, with: :invalid_token

  # Return a blank page with 404 status.
  def not_found
    render :nothing => true, :status => 404
  end

  # Return a blank page with 403 status.
  def invalid_token
    render json: {
      error: "Invalid Authenticition Token",
      status: 400
    }, :status => 403
  end

  # Private: Login user
  def authorize
    current_user
  end

  # Private: Returns the current logged in User.
  def current_user
    # For API access, allow ?authenticate_user=username since no passwords
    @current_user ||= params[:authenticate_user] && (User.find_by username: params[:authenticate_user])
  end

  # Test if current user is a teacher. Used to restrict access to teachers.
  def current_user_is_teacher
    if !current_user || current_user.role != 'teacher'
      head(403)
    end
  end

  # Test if current user is a student. Used to restrict access to students.
  def current_user_is_student
    if !current_user || current_user.role != 'student'
      head(403)
    end
  end
end