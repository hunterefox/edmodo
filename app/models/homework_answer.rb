class HomeworkAnswer < ActiveRecord::Base
  belongs_to :user
  belongs_to :homework

  validates :answer, presence: true
  validates :homework_id, presence: true
  validates :user_id, presence: true
end
