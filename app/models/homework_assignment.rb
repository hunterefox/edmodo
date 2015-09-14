class HomeworkAssignment < ActiveRecord::Base
  belongs_to :user
  belongs_to :homework

  validates :homework, presence: true
  validates :user, presence: true
end
