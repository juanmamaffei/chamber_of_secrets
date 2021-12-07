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
      
      def update
 
        user = User.find(session[:user_id]).update(
          role: params['user']['role'],
          full_name: params['user']['full_name']
        )

        if user
          render json: {
            status: :updated,
            user: user
          }
        else
          render json: { status: 500, details: error.details }
        end
      end
      
      def destroy
        user = User.find(session[:user_id]).destroy
        reset_session

        if user
          render json: {
            status: 200,
            destroy_user: true
          }
        else
          render json: {
            status: 500,
            details: error.details
          }
        end
      end
      
    end
  end
end