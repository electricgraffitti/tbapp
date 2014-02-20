# == Schema Information
#
# Table name: messages
#
#  id                  :integer(4)      not null, primary key
#  title               :string(255)
#  content             :text
#  message_status_id   :integer(4)
#  message_priority_id :integer(4)
#  due_date            :date
#  created_at          :datetime        not null
#  updated_at          :datetime        not null
#

class Message < ActiveRecord::Base
  
  # Associations
  has_one :message_owner, :class_name => "MessageOwner"
  accepts_nested_attributes_for :message_owner, :allow_destroy => true
  has_one :user, :through => :message_owner

  belongs_to :message_status
  belongs_to :message_priority

  has_many :message_assignments, :class_name => "MessageAssignment"
  accepts_nested_attributes_for :message_assignments, :allow_destroy => true
  has_many :users, :through => :message_assignments

  has_many :message_assets
  accepts_nested_attributes_for :message_assets, :allow_destroy => true, :reject_if => lambda { |a| a[:attachment].blank? }

  has_many :message_updates, :class_name => "MessageUpdate"
  accepts_nested_attributes_for :message_updates, :allow_destroy => true
  
  # Validations
  validates_presence_of :title, :content, :on => :create, :message => "is required"

  # Scopes
  scope :priority_listed, order("message_priorities.id ASC").includes(:message_priority)
  scope :last_created, order("created_at DESC")
  scope :owned_messages, lambda { |uid| where("message_owners.user_id = ?", uid).includes(:message_owner)}
  scope :not_complete, where("message_statuses.status_type != ?", "complete").includes(:message_status)
  scope :complete, where("message_statuses.status_type = ?", "complete").includes(:message_status)
  scope :overdue, where("due_date < ?", Time.now).includes(:message_status)
  scope :assigned_messages, lambda { |uid| where("message_assignments.user_id = ?", uid).includes(:users)}
  scope :open_messages, where("ticket_statuses.status_type != ?", "closed").includes(:message_status)
  scope :not_closed, where("message_statuses.status_type != ?", "closed").includes(:message_status)
  
  
  def set_message_read(uid)
    ma = MessageAssignment.assigned_message(uid, self.id).first
    if !ma.message_read
      ma.message_read = true
      ma.save
      return 'changed'
    end
    return 'unchanged'
  end


end
