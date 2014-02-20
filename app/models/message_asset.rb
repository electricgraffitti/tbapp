# == Schema Information
#
# Table name: message_assets
#
#  id                      :integer(4)      not null, primary key
#  name                    :string(255)
#  message_id              :integer(4)
#  message_update_id       :integer(4)
#  created_at              :datetime        not null
#  updated_at              :datetime        not null
#  attachment_file_name    :string(255)
#  attachment_content_type :string(255)
#  attachment_file_size    :integer(4)
#  attachment_updated_at   :datetime
#

class MessageAsset < ActiveRecord::Base
  
  # Associations
  belongs_to :message
  belongs_to :message_update

  # Paperclip
  has_attached_file :attachment,
    :styles => { :medium => "200x200>", :small => "100x100>", :thumb => "70x70>", :micro => "50x28#" },
    :url => "/message_attachments/:id/:style_:basename.:extension",
    :path => ":rails_root/public/message_attachments/:id/:style_:basename.:extension"
    
end
