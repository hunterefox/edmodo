class User < ActiveRecord::Base
  enum role: [:teacher, :student]
  has_many :homeworks_answers, dependent: :destroy

  validates :username, presence: true, uniqueness: true
  validates :role, presence: true
end
