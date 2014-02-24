class StatesSerializer < ActiveModel::Serializer
  attributes :id, :abbreviation, :full_name
  self.root = false
end