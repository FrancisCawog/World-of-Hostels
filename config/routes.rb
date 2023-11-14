Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # post 'api/test', to: 'application#test'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update]
    resources :listings, only: [:index, :show]
    resource :session, only: [:create, :destroy, :show]
  end
end
