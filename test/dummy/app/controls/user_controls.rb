class UserControls
  def title
    User.name.pluralize
  end

  def model
    User
  end

  def columns
    {
      id: Super::Type::Integer.new,
      name: Super::Type::String.new,
      posts: Super::Type::HasMany.new(Post),
      created_at: Super::Type::Timestamp.new,
      updated_at: Super::Type::Timestamp.new,
    }
  end

  def index_scope
    User.all
  end

  def index_columns
    [:name, :created_at, :updated_at]
  end

  def create_scope
    User.all
  end

  def new_scope
    User.all
  end

  def new_columns
    [
      :name,
    ]
  end

  def edit_scope
    User.all
  end

  def edit_columns
    [
      :name,
    ]
  end

  def show_scope
    User.all
  end

  def show_columns
    [:id, :name, :created_at, :updated_at]
  end

  def update_scope
    User.all
  end

  def destroy_scope
    User.all
  end

  def permitted_create_params(params)
    params.require(:user).permit(:name)
  end

  def permitted_update_params(params)
    params.require(:user).permit(:name)
  end
end
