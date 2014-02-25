class AddressSerializer < ActiveModel::Serializer
	embed :ids, include: true
	
  attributes :id, :street, :city, :zipcode, :latitude, :longitude, :location_id, :state_id, :state_name

  def state_name
  	object.state.abbreviation
  end
end