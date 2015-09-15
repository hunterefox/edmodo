class Api::V1::UsersController < Api::V1::BaseController
  before_action :set_user, only: [:show]

  # GET /users
  def index
    @user = User.all

    render json: @user, each_serializer: Api::V1::UserSerializer
  end

  # GET /users/1
  def show
    render json: @user, serializer: Api::V1::UserSerializer
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end
end