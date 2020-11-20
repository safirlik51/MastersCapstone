Rails.application.routes.draw do
  get 'welcome/index'
  root 'welcome#index'
  post 'wolfram', to: 'welcome#post'
  get 'wolfram', to: 'welcome#get'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
