class AddFieldToKeys < ActiveRecord::Migration[7.0]
  def change
    add_column :keys, :additional_info, :text
  end
end
