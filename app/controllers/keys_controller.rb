
module Api
  module V1

    class KeysController < ApplicationController
      def dashboard
        render json: { status: 200 }
      end

      def create
        key = Key.create!(
          title: params[:key][:title],
          description: params[:key][:description],
          user: User.find(session[:user_id]),
          authorized_users: params[:key][:authorized_users],
          expiration: params[:key][:expiration]
        )
        if key
          render json: {
            status: 200,
            key: key
          }
        else
          render json: {
            status: 500,
            error: error.details
          }
        end
      end

      def update
      end

      def destroy
      end
    end

  end
end