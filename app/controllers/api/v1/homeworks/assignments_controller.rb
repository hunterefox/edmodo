# Controller for Assignments.
# To create homework via console: curl -H "Content-Type:application/json; charset=utf-8" -d '{"user_id":2}' http://localhost:3000/api/v1/homeworks/1/assignments?authenticate_user=teacher
class Api::V1::Homeworks::AssignmentsController < Api::V1::HomeworksController
  before_action :set_homework_assignment, only: [:destroy]
  before_action :set_homework
  before_action :current_user_is_teacher, only: [:create, :destroy]

  # GET /homeworks/homework_id/assignments
  def index
    @homeworksAssignments = HomeworkAssignment.where(homework_id: params[:homework_id])

    render json: @homeworksAssignments, each_serializer: Api::V1::HomeworkAssignmentSerializer
  end

 # POST /homeworks/homework_id/assignments
  def create
    # Prevent adding an existing assignment.
    if !load_homework_assignment( params[:homework_id],  params[:id])
      @homeworkAssignment = HomeworkAssignment.new(homework_assignment_params.merge(homework_id: params[:homework_id]))

      if @homeworkAssignment.save
        render json: @homeworkAssignment, status: :created, serializer: Api::V1::HomeworkAssignmentSerializer
      else
        render json: @homeworkAssignment.errors, status: :unprocessable_entity
      end
    end

  end

  # DELETE /homeworks/homework_id/assigments/user_id
  def destroy
    @homeworkAssignment.destroy
    render json: {success: true}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_homework
      @homework = Homework.find(params[:homework_id])
    end

    # Load a homework assignment by user id and homework id.
    def load_homework_assignment(homework_id, user_id)
      return HomeworkAssignment.where(homework_id: homework_id, user_id: user_id).take
    end

    def set_homework_assignment
      @homeworkAssignment = load_homework_assignment(params[:homework_id], params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def homework_assignment_params
      params.require(:assignment).permit(:user_id, :homework_id)
    end


end
