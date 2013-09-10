RestMan::Application.routes.draw do
  get '/customer/find/restaurant_profiles', to: "customer_profiles#find"
  get '/customer_profiles/find', to: "customer_profiles#search"
  get '/restaurant_profiles/dashboard', :to => 'restaurant_profiles#dashboard', :as => 'restaurant_dashboard'

  get 'restaurant_profiles/new', to: "restaurant_profiles#new"
  post 'restaurant_profiles/create', to: "restaurant_profiles#create"
  post '/carts/:id/close', to: "carts#close", as: "close_cart"

  resources :customer_profiles
  resources :carts
  match 'restaurant_profiles/:id/carts' => 'restaurant_profiles#carts'
  resources :orders
  #resources :sessions

  post '/sessions', :to => 'sessions#create', :as => 'create_session'
  get '/sessions/new', :to => 'sessions#new', :as => 'new_session'
  post '/logout', :to => 'sessions#destroy', :as => 'logout'

  post '/check_in', :to => 'seats#check_in', :as => 'check_in'
  post '/check_out', :to => 'floor_plan#check_out', :as => 'check_out'
  resources :seats, only: [:index]

   post '/check_in', :to => 'seats#check_in', :as => 'check_in'
   post '/check_out', :to => 'floor_plan#check_out', :as => 'check_out'
   resources :seats, only: [:index]

  # The priority is based upon order of creation:
  # first created -> highest priority.
  resources :restaurant_profiles do
    resources :menus, only: [:index, :new, :create] do
      resources :categories, only: [:index, :new, :create] do
        resources :menu_items, only: [:index, :new, :create], :controller => "menu_items"
      end
    end
    resources :floor_plan do
      resources :table do
        resources :seats, only: [:new, :create]
      end
    end
  end

  resources :floor_plans do
    resources :tables do
      resources :seats, only: [:new, :create]
    end
  end

  post 'categories/menus_items/import', :to => 'categories#import', :as => 'import_menu_items'

  resources :menus, only: [:show, :edit, :update, :destroy]
  resources :menu_items, only: [:show, :edit, :update, :destroy]
  resources :categories, only: [:show, :edit, :update, :destroy]



  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.

  root :to => 'sessions#new'

  post 'test', :to => 'floor_plan#test', :as => 'test'
  get 'check_in', to: 'restaurant#check_in', as: :check_in
  get 'get_floor_plan', :to => 'floor_plan#get_floor_plan', as: :get_floor_plan

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
