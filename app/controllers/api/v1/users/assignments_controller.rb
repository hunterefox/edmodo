# Controller for Assignments by user.
class Api::V1::Users::AssignmentsController < Api::V1::BaseController
  # GET /users/user_id/assignments
  def index
    @homeworksAssigments = HomeworkAssignment.where(user_id: params[:user_id])

    render json: @homeworksAssigments, each_serializer: Api::V1::HomeworkAssignmentSerializer
  end

end
