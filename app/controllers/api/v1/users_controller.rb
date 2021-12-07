module Api
  module V1
    class UsersController < ApplicationController
      def create
        user = User.create!(
          email: params['user']['email'],
          password: params['user']['password'],
          password_confirmation: params['user']['password_confirmation']
        )

        if user
          session[:user_id] = user.id
          render json: {
            status: :created,
            user: user
          }
        else
          render json: { status: 500, details: error.details }    
        end
      end
      
    end
  end
end