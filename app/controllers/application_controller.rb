class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :authorize

  protected

  # Private: Ensures User is logged in.
  def authorize
    if not current_user
      redirect_to login_url
    end
  end

  # Private: Returns the current logged in User.
  def current_user
    @current_user ||= session[:user_id] && User.find(session[:user_id])
    # For API access, allow ?authenticate_user=username
    # This isn't particular secure but that is all that's needed for this test.
    @current_user ||= params[:authenticate_user] && (User.find_by username: params[:authenticate_user])
  end
  helper_method :current_user
end
