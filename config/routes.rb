Tbapp::Application.routes.draw do

  devise_for :users, :controllers => {:registrations => "registrations"}
	authenticated :user do
	  devise_scope :user do
	    root to: "users#show"
	  end
	end

	unauthenticated do
	  devise_scope :user do
	    root to: "devise/registrations#new", :as => "unauthenticated"
	  end
	end
  resources :users
end