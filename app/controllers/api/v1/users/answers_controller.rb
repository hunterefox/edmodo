# Controller for Answers by user.
class Api::V1::Users::AnswersController < Api::V1::BaseController
  # GET /users/user_id/answers
  def index
    @homeworksAnswers = HomeworkAnswer.where(user_id: params[:user_id]).order(created_at: :desc)

    render json: @homeworksAnswers, each_serializer: Api::V1::HomeworkAnswerSerializer
  end

end
