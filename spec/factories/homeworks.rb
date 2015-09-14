FactoryGirl.define do
  factory :homework do
    title "HW Assignment 1"
    question "The question for HW1"
    created_at "2015-09-13 15:15:50"
    updated_at "2015-09-13 15:15:50"
    due "2015-09-14 16:15:50"
    trait :hw2 do
      title 'HW Assignment 2'
      question "The question for HW2"
    end
    trait :hw3 do
      title 'HW Assignment 3'
      question "The question for HW3"
    end
  end
end
