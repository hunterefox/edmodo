class Api::V1::HomeworkSerializer < Api::V1::BaseSerializer
  attributes :id, :title, :question, :created_at, :updated_at, :due
end
