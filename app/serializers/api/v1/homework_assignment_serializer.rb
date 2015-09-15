class Api::V1::HomeworkAssignmentSerializer < Api::V1::BaseSerializer
  attributes :id, :user_id, :homework_id
end
