module Api
  module V1
    class RegistrationsController < ApplicationController
      def create
        user = User.create!(
          email = User.params['user']['email']
          password = User.params['user']['password']
          password_confirmation = User.params['user']['password_confirmation']
        )

        if user
          session[:user_id] = user.id
          render json: {
            status: :created,
            user: user
          }
      else
        render json: { status: 500 }    
        end
      end
      
    end
  end
end