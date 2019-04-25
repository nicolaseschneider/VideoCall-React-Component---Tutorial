Rails.application.routes.draw do
  resources :calls, only: :create
  mount ActionCable.server, at: '/cable'
end