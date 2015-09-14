require 'rails_helper'

RSpec.describe User, type: :model do
  it "has a valid factory" do
    teacher = FactoryGirl.create(:teacher)
    expect(teacher).to be_valid
    expect(teacher.role).to eq "teacher"
    student = FactoryGirl.create(:student)
    expect(student).to be_valid
    expect(student.role).to eq "student"
  end
  it "is invalid without a username" do
    teacher = FactoryGirl.build(:teacher, username: nil)
    expect(teacher).not_to be_valid
  end
  it "is invalid without a role" do
    teacher = FactoryGirl.build(:teacher, role: nil)
    expect(teacher).not_to be_valid
  end
end
