class Api::V1::HomeworkAnswerSerializer < Api::V1::BaseSerializer
  attributes :id, :user_id, :homework_id, :answer
end
