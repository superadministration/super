class UserControls
  def title
    User.name.pluralize
  end

  def index_scope
    User.all
  end

  def index_columns
    [:name, :created_at, :updated_at]
  end
end
