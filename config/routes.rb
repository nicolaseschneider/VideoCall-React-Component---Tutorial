Rails.application.routes.draw do
  root to: "calls#root"
  resources :calls, only: :create
  mount ActionCable.server, at: '/cable'
end