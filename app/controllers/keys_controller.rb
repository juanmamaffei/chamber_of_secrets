
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
        key = Key.find(params[:id])
        action = key.update(
          title: params[:key][:title],
          description: params[:key][:description],
          user: User.find(session[:user_id]),
          authorized_users: params[:key][:authorized_users],
          expiration: params[:key][:expiration]
        )
        if action
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

      def destroy
        key = Key.find(params[:id]).destroy
        if key
          render json: {
            status: 200,
            message: "Your password was deleted."
          }
        else
          render json: {
            status: 500,
            error: error.details
          }
        end
        
      end
    end

  end
end