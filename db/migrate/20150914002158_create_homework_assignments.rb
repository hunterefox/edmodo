class CreateHomeworkAssignments < ActiveRecord::Migration
  def change
    create_table :homework_assignments do |t|
      t.references :user, index: true, foreign_key: true
      t.references :homework, index: true, foreign_key: true
      t.datetime :created_at

      t.timestamps null: false
    end
  end
end
