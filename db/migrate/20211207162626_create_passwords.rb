class CreatePasswords < ActiveRecord::Migration[6.1]
  def change
    create_table :passwords do |t|
      t.string :title
      t.string :description
      t.belongs_to :user, null: false, foreign_key: true
      t.text :authorized_users, array: true
      t.date :expiration

      t.timestamps
    end
  end
end
