class Api::V1::UserSerializer < Api::V1::BaseSerializer
  attributes :id, :username, :role, :created_at, :updated_at
end
