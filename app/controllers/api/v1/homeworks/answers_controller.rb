# Controller for Answers.
# To create homework via console: curl -H "Content-Type:application/json; charset=utf-8" -d '{answerText":"My HW answer"}' http://localhost:3000/api/v1/homeworks/1/answers?authenticate_user=student
class Api::V1::Homeworks::AnswersController < Api::V1::BaseController
  before_action :set_homework
  before_action :current_user_is_student, only: [:create]

  # GET /homeworks/homework_id/answers
  def index
    @homeworksAnswers = HomeworkAnswer.where(homework_id: params[:homework_id]).order(created_at: :desc)

    render json: @homeworksAnswers, each_serializer: Api::V1::HomeworkAnswerSerializer
  end

  # GET /homeworks/homework_id/answers/user_id
  def show
    @homeworksAnswers = HomeworkAnswer.where(homework_id: params[:homework_id], user_id: params[:id]).order(created_at: :desc)

    render json: @homeworksAnswers, each_serializer: Api::V1::HomeworkAnswerSerializer
  end

 # POST /homeworks/homework_id/answers
  def create
    # Paramater conflict messed with the auto reformating of params to we use
    # answerText instead of answer for the text of the answer
    params[:answer][:answer] = params[:answer][:answerText]
    params[:answer].delete(:answerText)
    # Only allow current user to create answer in it's name.
    params[:answer][:user_id] = current_user.id
    params[:answer][:homework_id] = params[:homework_id]
    @homeworkAnswer = HomeworkAnswer.new(homework_answer_params)

    if @homeworkAnswer.save
      render json: @homeworkAnswer, status: :created, serializer: Api::V1::HomeworkAnswerSerializer
    else
      render json: @homeworkAnswer.errors, status: :unprocessable_entity
    end

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_homework
      @homework = Homework.find(params[:homework_id])
    end

    # Only allow a trusted parameter "white list" through.
    def homework_answer_params
      params.require(:answer).permit(:user_id, :homework_id, :answer)
    end


end
