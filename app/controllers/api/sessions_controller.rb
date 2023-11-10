class Api::SessionsController < ApplicationController
    before_action :require_logged_in, only: [:destroy]
    before_action :require_logged_out, only: [:create]

    def create 
        email = params[:email]
        password = params[:password]

        @user = User.find_by_credentials(email, password)
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
        # debugger
        @user = current_user
        if @user 
            render '/api/users/show'
        else  
            render json: { user: nil }
        end
    end
end