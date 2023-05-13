Super::Group
Super::Grouping
Super::Subset
Super::Subsets

def query
  Super::Query.new do |q|
    q.subset(:all, &:all)
    q.subset(:favorite_captain) { rel.where(name: "Jean-Luc Picard") }

    q.filter.text :name
    q.filter.select :rank, Member.ranks.values
    q.filter.text :position
    q.filter.select :ship_id, Ship.all.map { |s| ["#{s.name} (Ship ##{s.id})", s.id] }
    q.filter.timestamp :created_at
    q.filter.timestamp :updated_at

    q.sortable :id
    q.sortable :name, directions: { asc: "ASC NULLS LAST", desc: "DESC NULLS FIRST" }

    q.default_sort :id, :asc
    q.default_sort :name, :desc
  end
end

def subsets
  Super::Subsets.new do |s|
    s.option(:all) { |rel| rel.all }
    s.option(:ex_borg) { |rel| rel.where(name: "Jean-Luc Picard") }
  end
end

def grouping
  Super::Grouping.new do |g|
    g.option(:all) { |rel| rel.all }
    g.option(:ex_borg) { |rel| rel.where(name: "Jean-Luc Picard") }
  end
end

def sort
  Super::Sort.new do |s|
    s.sortable :id
    s.sortable :name, directions: { asc: "ASC NULLS LAST", desc: "DESC NULLS FIRST" }

    s.default :id, :asc
    s.default :name, :desc
  end
end

def filters
  Super::Filters.new do |f|
    f.text :name
    f.select :rank, Member.ranks.values
    f.text :position
    f.select :ship_id, Ship.all.map { |s| ["#{s.name} (Ship ##{s.id})", s.id] }
    f.timestamp :created_at
    f.timestamp :updated_at
  end
end

##############

  def display_schema
    Super::Display.new do |d|
      d.batch :id
      d.string :name
      d.string :rank
      d.string :position
      d.computed :ship, by: :record do |record|
        "#{record.name} (Ship ##{record.id})"
      end
      d.timestamp :created_at
      if current_action.show?
        d.timestamp :updated_at
      end
    end
  end

  def form_schema
    Super::Form.new do |f|
      f.text_field :name
      f.select :rank, Member.ranks.keys
      f.text_field :position
      f.select :ship_id, Ship.all.map { |s| ["#{s.name} (Ship ##{s.id})", s.id] }
      f.has_many :favorite_things, :favorite_things_attributes do |g|
        g.text_field :name
        g.destroyable
      end
    end
  end

##############

def subsets
  Super::Query.subset do
  end
end

def filters
  Super::Filters.new do |filters|
    filters.real :foo, type: :enum, fields: []
  end
end

def filters
  Super::Filters.new do |fields, type|
    fields[:name] = type.text
    fields[:rank] = type.select(Member.ranks.values)
    fields[:position] = type.text
    fields[:ship_id] = type.select(Ship.all.map { |s| ["#{s.name} (Ship ##{s.id})", s.id] })
    fields[:created_at] = type.timestamp
    fields[:updated_at] = type.timestamp
  end
end

def sorting
  Super::Sorting.new(
    sortable_columns: ["id"],
    default: { id: :asc }
  )
end

class SortExample
  # configure columns
  # configure default sort
  # configure direction (asc, desc, asc null first, etc.)

  def sortable_columns
    %w[id] + Super::Query.sortable_columns(model:,)
  end

  def default_sort
    Super::Query.default_sort(model:, )
  end

  def sorting
    Super::Query.sorting(
      sortable_columns:,
      default_sort:
    )
  end

  def sorting
    super.insert("id", [])
  end
end
