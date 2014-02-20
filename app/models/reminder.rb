# == Schema Information
#
# Table name: reminders
#
#  id            :integer(4)      not null, primary key
#  item_id       :integer(4)
#  location_id   :integer(4)
#  account_id    :integer(4)
#  frequency_id  :integer(4)
#  name          :string(255)
#  notes         :text
#  start_date    :date
#  reminder_date :date
#  resolved      :boolean(1)
#  user_id       :integer(4)
#  created_at    :datetime        not null
#  updated_at    :datetime        not null
#

class Reminder < ActiveRecord::Base
  
  # Associations
  belongs_to :account, :counter_cache => true
  belongs_to :location, :counter_cache => true
  belongs_to :item, :counter_cache => true
  belongs_to :frequency


  has_many :photos, :dependent => :destroy
  has_many :documents, :dependent => :destroy

  accepts_nested_attributes_for :photos, :allow_destroy => true, :reject_if => lambda { |a| a[:attachment].blank? }
  accepts_nested_attributes_for :documents, :allow_destroy => true, :reject_if => lambda { |a| a[:record].blank? }

  # Validations
  validates_presence_of :name,
                        :frequency_id, :on => :create, :message => "can't be blank"
  # Paperclip

  # Scopes
  
  scope :unresolved_reminders, where("resolved != ?", 1)
  
  
  ################################### Methods
  
  def self.user_reminders(uid)
    where("user_id = ? && resolved != ? && item_id IS NULL", uid, true)
  end

  # Sets up account_id and location_id based on the item selected. This prevents the user hacking these values
  def set_create_values(params, u)
     
    self.account_id = u.account.id
    self.user_id = u.id
    unless params[:item_id].blank?
      item = Item.find(params[:item_id])
      self.location_id = item.location_id
    end
  end
  
  def set_reminder_date(params)
    
    # Get the Text Value of the Frequency
    frequency = frequency_type(params[:frequency_id])
    
    # Check the value of the reminder date
    # If it was set by the user we want to use it
    # but only if it was set against a One Time frequency
    # otherwise the date could be set and then a chagne made by the user 
    # which may return an undesired result
    if params[:reminder_date] && frequency == "Once"
      self.reminder_date = params[:reminder_date]
    else
      self.reminder_date = frequency_calc(params[:start_date], frequency)
    end
        
  end
  
  private
  
  def frequency_calc(start_date, frequency)
        
    # Set time frames from freq arg
    reminder_time_frame = case frequency
      when "Daily" then 1.day
      when "Weekly" then 7.days
      when "Monthly" then 1.month
      when "Quarterly" then 3.months
      when "Semi Annually" then 6.months
      else 1.year
    end
    
    # add freq time to start date to calc the next reminder date
    calc = (Date.parse(start_date) + reminder_time_frame)
    
    return calc
  end
  
  
  
  def frequency_type(freq_id)
    
    frequency = case freq_id
       when "1" then "Once"
       when "2" then "Daily"
       when "3" then "Weekly"
       when "4" then "Monthly"
       when "5" then "Quarterly"
       when "6" then "Semi Annually"
       else "Annually"
    end

    return frequency
    
  end
  
end
