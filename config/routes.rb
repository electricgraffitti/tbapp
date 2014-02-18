Tbapp::Application.routes.draw do

  devise_for :users, :controllers => {:registrations => "registrations"}
	authenticated :user do
	  devise_scope :user do
	    root to: "users#show"
	  end
	end

	unauthenticated do
	  devise_scope :user do
	    root to: "devise/sessions#new", :as => "login"
	  end
	end
  resources :users
end
