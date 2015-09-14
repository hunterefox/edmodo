require 'rails_helper'

RSpec.describe HomeworkAnswer, type: :model do
  it "has a valid factory" do
    homework_answer = FactoryGirl.build(:homework_answer)
    expect(FactoryGirl.build(:homework_answer)).to be_valid
  end
  it "allows students to answer" do
    student = FactoryGirl.create(:student)
    homework = FactoryGirl.create(:homework, :hw2)
    expect(FactoryGirl.build(:homework_answer, user: student, homework: homework)).to be_valid
  end
  it "is invalid without a user" do
    expect(FactoryGirl.build(:homework_answer, user: nil)).not_to be_valid
  end
  it "is invalid without a homework" do
    expect(FactoryGirl.build(:homework_answer, homework: nil)).not_to be_valid
  end
end
