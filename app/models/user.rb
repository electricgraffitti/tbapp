class User < ActiveRecord::Base
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable


  # Associations
  belongs_to :account, :counter_cache => true
  has_many :location_roles
  has_many :locations, :through => :location_roles
  
end
