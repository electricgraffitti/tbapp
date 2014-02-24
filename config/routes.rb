Tbapp::Application.routes.draw do

  devise_for :users, :controllers => {:registrations => "registrations"}
	authenticated :user do
	  devise_scope :user do
      get '/logout', to: 'devise/sessions#destroy', as: 'logout'
      root to: 'users#show', as: 'app'
	  end
	end

	unauthenticated do
	  devise_scope :user do
	    root to: "devise/sessions#new", as: "login"
	  end
	end

	get '/states', to: 'states#index', as: 'states'


  resources :users
  resources :locations
  resources :warranties
  resources :items
  resources :service_records

end
