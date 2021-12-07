Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :sessions, only: :create
      delete :logout, to: "sessions#logout"
      get :logged_in, to: "sessions#logged_in"    
      
      resources :users, only: [:create, :update, :destroy]
      get :toggle_admin, to: "users#toggle_admin"
    end
  end
  
  root to: "static#home"

end
