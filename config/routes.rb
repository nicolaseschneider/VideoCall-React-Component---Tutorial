Rails.application.routes.draw do
  root to: "static_pages#root"
  resources :calls, only: :create
  mount ActionCable.server, at: '/cable'
end