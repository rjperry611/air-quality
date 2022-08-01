class CreateProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :profiles do |t|
      t.decimal :latitude
      t.decimal :longitude
      t.integer :aqi_threshold
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
