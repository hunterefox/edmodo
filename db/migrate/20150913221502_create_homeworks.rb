class CreateHomeworks < ActiveRecord::Migration
  def change
    create_table :homeworks do |t|
      t.string :title
      t.text :question
      t.datetime :created_at
      t.datetime :updated_at
      t.datetime :due

      t.timestamps null: false
    end
  end
end
