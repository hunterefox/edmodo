class Homework < ActiveRecord::Base

  validates :title, presence: true
  validates :question, presence: true
  validates :due, presence: true
end
