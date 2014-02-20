# == Schema Information
#
# Table name: location_roles
#
#  id              :integer(4)      not null, primary key
#  user_id         :integer(4)
#  location_id     :integer(4)
#  location_admin  :boolean(1)
#  location_access :boolean(1)
#  created_at      :datetime        not null
#  updated_at      :datetime        not null
#

class LocationRole < ActiveRecord::Base
  
  # Associations
  belongs_to :user
  belongs_to :location
  
  ################################# Methods
  
  def self.unassigned_locations(u)
    # Create a list of locations that are not assigned to a given user
    loc_array = []
    u.account.locations.each do |loc|
      if loc.location_roles
        added_location = loc.check_location_assignement_status(u)
        unless added_location == true
          loc_array << loc
        end
      else
        loc_array << loc
      end
    end
    return loc_array
  end
  
end
