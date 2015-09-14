require 'rails_helper'

RSpec.describe HomeworkAssignment, type: :model do
  it "has a valid factory" do
    homework_answer = FactoryGirl.build(:homework_assignment)
    expect(FactoryGirl.build(:homework_assignment)).to be_valid
  end
  it "allows students to answer" do
    student = FactoryGirl.create(:student)
    homework = FactoryGirl.create(:homework, :hw2)
    expect(FactoryGirl.build(:homework_assignment, user: student, homework: homework)).to be_valid
  end
end
