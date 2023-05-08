# typed: strict
# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :admin do
    resources :members do
      post :batch_noop, on: :collection
      resources :favorite_things, shallow: true
    end
    resources :ships
    resources :sinks

    root to: redirect("admin/members", status: 302)
  end

  root to: redirect("admin/members", status: 302)
end
