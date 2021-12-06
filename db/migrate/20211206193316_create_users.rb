class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :email
      t.string :full_name
      t.string :role
      t.boolean :authrized
      t.boolean :admin
      t.string :password_digest

      t.timestamps
    end
  end
end
