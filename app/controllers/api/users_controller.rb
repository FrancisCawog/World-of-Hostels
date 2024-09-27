class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password']

    def index
      @users = User.all
      render :index
    end

    def create
      @user = User.new(user_params)
      if @user.save
        login!(@user)
        render :show
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def show
        @user = User.find_by(id: params[:id])
        if @user
          render :show
        else
          render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        @user = User.find_by(id: params[:id])
        if @user && current_user == @user
            if @user.update(user_params)
                render :show
            else
                render json: @user.errors.full_messages, status: 422
            end
        else
            render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update_password
      @user = current_user
      if @user.authenticate(params[:user][:old_password])
        if @user.update(password: params[:user][:new_password])
          render json: { message: 'Password updated successfullyy' }, status: :ok
        else
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { errors: ['Old password is incorrect'] }, status: :unauthorized
      end
    end    
  
    private
  
    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :nationality, :date_of_birth, :age)
    end

    def password_params
      params.require(:user).permit(:old_password, :new_password)
    end
  end