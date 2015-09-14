FactoryGirl.define do
  factory :homework_assignment do
    association :user, :factory => :student
    association :homework, :factory => :homework
    created_at "2015-09-13 17:21:58"
  end

end
