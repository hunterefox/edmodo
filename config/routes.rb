Rails.application.routes.draw do
  get 'welcome/index'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'welcome#index'

  get 'login', to: 'sessions#new', as: 'login'
  post 'login', to: 'sessions#create', as: 'session'
  match 'logout', to: 'sessions#destroy', as: 'logout', via: [:get, :delete]

  # Define our API for our js to query against.
  namespace :api, defaults: {format: 'json'} do
    namespace :v1 do
      resources :users, only: [:index, :show] do
        resources :assignments, :module => 'users', only: [:index]
        resources :answers, :module => 'users', only: [:index]
      end
      resources :homeworks, only: [:index, :create, :show, :update, :destroy] do
        resources :assignments, :module => 'homeworks', only: [:index, :create, :destroy]
        resources :answers, :module => 'homeworks', only: [:index, :show, :create]
      end
    end
  end

end
