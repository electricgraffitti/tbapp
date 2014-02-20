class AccountMailer < ActionMailer::Base
  default :from => "support@cube2media.com"
  
  def new_account_signup(user)  
    @user = user
    
    mail(:to => "#{user.full_name} <#{user.email}>", :subject => "New Tracking Book Account")
  end
  
  def add_user_notification(params, current_user)
    @full_name = (params[:first_name]).capitalize + " " + (params[:last_name]).capitalize
    @email = params[:email]
    @username = params[:username]
    @password = params[:password]
    
    mail( :to => "#{@full_name} <#{@email}>, #{current_user.email}", :subject => "You've been added to a Tracking Book account")
  end
  
end
