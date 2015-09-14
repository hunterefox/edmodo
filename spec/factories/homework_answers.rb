FactoryGirl.define do
  factory :homework_answer do
    answer "MyText"
    created_at "2015-09-13 15:28:22"
    updated_at "2015-09-13 15:28:22"
    association :user, :factory => :student
    association :homework, :factory => :homework
  end
end
