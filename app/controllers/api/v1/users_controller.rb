class Api::V1::UsersController < Api::V1::BaseController
  before_action :set_user, only: [:show]

  # GET /users
  def index
    @users = user.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end
end