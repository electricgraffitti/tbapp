class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :null_session, :if => Proc.new { |c| c.request.format == 'application/json' }

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_path, :alert => exception.message
  end

   # def after_sign_in_path_for(resource)
   #   # After you enter login info and click submit, I want you to be sent to the registrations#show page
   #   profile_path
   # end
   # def after_sign_out_path_for(resource_or_scope)
   #   new_user_session_path
   # end

  private

  def only_allow_admin
    redirect_to root_path, :alert => 'Not authorized as an administrator.' unless current_user.has_role? :admin
  end

end
