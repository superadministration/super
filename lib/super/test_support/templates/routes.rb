Rails.application.routes.draw do
  namespace :admin do
    resources :members
    resources :ships

    root to: redirect("admin/members", status: 302)
  end

  root to: redirect("admin/members", status: 302)
end
