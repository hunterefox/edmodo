class CreateJoinTableUserHomework < ActiveRecord::Migration
  def change
    create_join_table :Users, :Homeworks do |t|
      # t.index [:user_id, :homework_id]
      # t.index [:homework_id, :user_id]
    end
  end
end
