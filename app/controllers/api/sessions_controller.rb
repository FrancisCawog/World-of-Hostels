class Api::SessionsController < ApplicationController
    before_action :require_logged_in, only: [:destroy]
    before_action :require_logged_out, only: [:create]

    def create
        @user = User.find_by_credentials(params[:email], params[:password])
        if @user
          login!(@user)
          render 'api/users/show'
        else 
            render json: { errors: ['Let\'s try that again. 
            There isn\'t an account associated with this email or the password is incorrect.'] }, status: 422
        end
    end

    def destroy 
        logout!
        render json: { message: ['You have now been logged out']}
    end

    def show 
        @user = current_user
        if @user 
            render '/api/users/show'  #########  bring back to the page they were previously on
        else  
            render json: { user: nil }
        end
    end
end