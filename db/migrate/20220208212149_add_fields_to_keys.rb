class AddFieldsToKeys < ActiveRecord::Migration[7.0]
  def change
    add_column :keys, :username, :string
  end
end
