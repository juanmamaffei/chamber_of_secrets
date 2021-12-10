Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :sessions, only: :create
      delete :logout, to: "sessions#logout"
      get :logged_in, to: "sessions#logged_in"    
      
      resources :users, only: [:create, :update, :destroy]
      get :toggle_admin, to: "users#toggle_admin"
      get :toggle_authorized, to: "users#toggle_authorized"
      post :query, to: "users#query"

      resources :keys, only: [:create, :update, :destroy]
      get :dashboard, to: "keys#dashboard"
    end
  end
  
  root to: "home#index"
  get '*path', to: "home#index"
end
