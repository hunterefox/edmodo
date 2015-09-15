# Controller for Assignments.
# To create homework via console: curl -H "Content-Type:application/json; charset=utf-8" -d '{"user_id":2}' http://localhost:3000/api/v1/homeworks/1/assignments?authenticate_user=teacher
class Api::V1::Homeworks::AssignmentsController < Api::V1::HomeworksController
  before_action :set_homework_assignment, only: [:destroy]
  before_action :set_homework
  before_action :current_user_is_teacher, only: [:create, :destroy]

  # GET /homeworks/homework_id/assignments
  def index
    @homeworksAssigments = HomeworkAssignment.where(homework_id: params[:homework_id])

    render json: @homeworksAssigments, each_serializer: Api::V1::HomeworkAssignmentSerializer
  end

 # POST /homeworks/homework_id/assignments
  def create
    @homeworkAssignment = HomeworkAssignment.new(homework_assignment_params.merge(homework_id: params[:homework_id]))

    if @homeworkAssignment.save
      render json: @homeworkAssignment, status: :created, serializer: Api::V1::HomeworkAssignmentSerializer
    else
      render json: @homeworkAssignment.errors, status: :unprocessable_entity
    end

  end

  # DELETE /homeworks/x/assigments/y
  def destroy
    @homeworkAssignment.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_homework
      @homework = Homework.find(params[:homework_id])
    end

    def set_homework_assignment
      @homeworkAssignment = Homework.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def homework_assignment_params
      params.require(:assignment).permit(:user_id, :homework_id)
    end


end
