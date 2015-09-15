# Controller for Answers.
# To create homework via console: curl -H "Content-Type:application/json; charset=utf-8" -d '{"user_id":2,"answerText":"My HW answer"}' http://localhost:3000/api/v1/homeworks/1/answers?authenticate_user=student
class Api::V1::Homeworks::AnswersController < Api::V1::BaseController
  before_action :set_homework
  before_action :current_user_is_student, only: [:create]

  # GET /homeworks/homework_id/answers
  def index
    @homeworksAnswers = HomeworkAnswer.where(homework_id: params[:homework_id])

    render json: @homeworksAnswers, each_serializer: Api::V1::HomeworkAnswerSerializer
  end

 # POST /homeworks/homework_id/answers
  def create
    # Paramater conflict messed with the auto reformating of params to we use
    # answerText instead of answer for the text of the answer
    params[:answer][:answer] = params[:answer][:answerText]
    params[:answer].delete(:answerText)
    @homeworkAnswer = HomeworkAnswer.new(homework_answer_params.merge(homework_id: params[:homework_id]))

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
