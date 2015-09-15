# Controller for Homeworks.
# To create homework via console: curl -H "Content-Type:application/json; charset=utf-8" -d '{"title":"HW 1", "question": "Question one", "due": "2015-09-14 16:15:50"}' http://localhost:3000/api/v1/homeworks?authenticate_user=teacher
class Api::V1::HomeworksController < Api::V1::BaseController
  before_action :set_homework, only: [:show, :update, :destroy]
  # Teachers can only cud homework.
  before_action :current_user_is_teacher, only: [:create, :update, :destroy]

  # GET /homework
  def index
    @homeworks = Homework.all

    # Serializer autodetection is not working.
    render json: @homeworks, each_serializer: Api::V1::HomeworkSerializer
  end

  # GET /homework/1
  def show
    render json: @homework, serializer: Api::V1::HomeworkSerializer
  end

 # POST /homeworks
  def create
    @homework = Homework.new(homework_params)

    if @homework.save
      render json: @homework, status: :created, serializer: Api::V1::HomeworkSerializer
    else
      render json: @homework.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /homeworks/1
  def update
    if @homework.update(homework_params)
      render json: @homework, serializer: Api::V1::HomeworkSerializer
    else
      render json: @homework.errors, status: :unprocessable_entity
    end
  end

  # DELETE /homeworks/1
  def destroy
    @homework.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_homework
      @homework = Homework.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def homework_params
      params.require(:homework).permit(:title, :question, :due)
    end
end
