class ChangeNameOfModel < ActiveRecord::Migration[6.1]
  def change
    drop_table :passwords

    create_table :keys do |t|
      t.string :title
      t.string :description
      t.belongs_to :user, null: false, foreign_key: true
      t.text :authorized_users, array: true
      t.date :expiration

      t.timestamps
    end
  end
end
