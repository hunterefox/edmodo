class CreateHomeworkAnswers < ActiveRecord::Migration
  def change
    create_table :homework_answers do |t|
      t.text :answer
      t.datetime :created_at
      t.datetime :updated_at
      t.references :user, index: true, foreign_key: true
      t.references :homework, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
