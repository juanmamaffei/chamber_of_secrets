module Api
  module V1
    class UsersController < ApplicationController
      include CurrentUserConcern
      before_action :user_signed_in, only: :query
      def create
        begin
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
          render status: 500, json: { status: 500, details: "Check the fields." }  
        end
        rescue ActiveRecord::RecordInvalid => error
          render :status => 500, :json => {:errors => error }
        end
      end
      
      def query
        if params['user']['byid']
          users = User.find(params['user']['query'])
        else
          users = User.where('email LIKE ?', "%#{params['user']['query']}%").select('email, id').limit(5)
        end
        if users
          render json: {
            status: 200,
            users: users
          }
        else
          render json: { status: 500, details: error.details }, status: 500 
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
          render json: { status: 500, details: error.details }, status: 500 
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
          }, status: 500 
        end
      end
      
      def toggle_admin
        if User.find(session[:user_id]).admin?
          new_admin = User.find(params[:id])
          action = new_admin.update(
            admin: true
          )
          if action
            render json: { status: 200, message: "Now, #{new_admin.full_name} is an admin."}
          else
            render json: { status: 500, message: error.details }, status: 500 
          end
        else
          render json: { 
            status: 401,
            message: "You don't have permission to assign an admin."
          }, status: 401 
        end
      end
      
      def toggle_authorized
        if User.find(session[:user_id]).admin?
          new_authorized = User.find(params[:id])
          action = new_authorized.update(
            authrized: true
          )
          if action
            render json: { status: 200, message: "Now, #{new_authorized.full_name} is authorized for create passwords."}
          else
            render json: { status: 500, meesage: error.details }
          end
        else
          render json: { 
            status: 401,
            message: "You don't have permission to assign authorized users."
          }, status: 401
        end
      end
      private
      def user_signed_in
        unless @current_user
          render status: 401,
            json: {
              status: 401,
              error: "You must sign in."
            }
        end
      end
    end
  end
end