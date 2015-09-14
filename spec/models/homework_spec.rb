require 'rails_helper'

RSpec.describe Homework, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.build(:homework)).to be_valid
  end
  it "is invalid without a title" do
    homework = FactoryGirl.build(:homework, title: nil)
    expect(homework).not_to be_valid
    homework.valid?
    expect(homework.errors[:title]).to include("can't be blank")
    expect(homework.errors[:question]).not_to include("can't be blank")
    expect(homework.errors[:due]).not_to include("can't be blank")
  end
  it "is invalid without a question" do
    homework = FactoryGirl.build(:homework, question: nil)
    homework.valid?
    expect(homework.errors[:title]).not_to include("can't be blank")
    expect(homework.errors[:question]).to include("can't be blank")
    expect(homework.errors[:due]).not_to include("can't be blank")
  end
  it "is invalid without a due date "do
    homework = FactoryGirl.build(:homework, due: nil)
    homework.valid?
    expect(homework.errors[:title]).not_to include("can't be blank")
    expect(homework.errors[:question]).not_to include("can't be blank")
    expect(homework.errors[:due]).to include("can't be blank")
  end
end
