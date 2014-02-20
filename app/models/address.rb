# == Schema Information
#
# Table name: addresses
#
#  id                :integer(4)      not null, primary key
#  location_id       :integer(4)
#  street            :string(255)
#  city              :string(255)
#  state_id          :integer(4)
#  zipcode           :string(255)
#  latitude          :float
#  longitude         :float
#  account_detail_id :integer(4)
#  created_at        :datetime        not null
#  updated_at        :datetime        not null
#

class Address < ActiveRecord::Base
  
  # Associations
  belongs_to :location
  belongs_to :state
  belongs_to :account_detail

  # Validations
  validates_presence_of :street, :city, :state_id, :zipcode, :on => :create, :message => "Required Fields"
  validates_numericality_of :zipcode, :on => :create, :message => "Enter a Valid Zipcode "
  validates_length_of :zipcode, :within => 5..5, :on => :create, :message => "Must be 5 Digits Only"

  after_validation :fetch_coordinates

  # Scopes

  ######################## Methods
  geocoded_by :location_array

  def location_array
    [street, city, state, zipcode].compact.join(', ')
  end

  def setup_new_address(account, a, user, location)
    self.street = a[:street]
    self.city = a[:city]
    self.state_id = a[:state_id]
    self.zipcode = a[:zipcode]
    if self.valid?
      user.save
      account.save
      location.account_id = account.id
      location.save
      self.location_id = location.id
      self.save
    else
      return false
    end
  end
end
