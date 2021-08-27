# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :admin do
    resources :members do
      post :batch_noop, on: :collection
    end
    resources :ships
    resources :favorite_things
    resources :sinks

    root to: redirect("admin/members", status: 302)
  end

  root to: redirect("admin/members", status: 302)
end
