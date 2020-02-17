module Super
  class Action
    def self.steps
      @steps ||= {}
    end

    steps[:new_resource] = proc do
      @resource = controls.scope(action: action_inquirer).build
    end

    steps[:create_resource] = proc do
      @resource = controls.scope(action: action_inquirer).build(create_permitted_params)
    end

    steps[:load_resource] = proc do
      @resource = controls.scope(action: action_inquirer).find(params[:id])
    end

    steps[:load_resources] = proc do
      @resources = controls.scope(action: action_inquirer)
    end

    steps[:paginate] = proc do
      @pagination = Pagination.new(
        total_count: @resources.size,
        limit: Super.configuration.index_resources_per_page,
        query_params: request.GET,
        page_query_param: :page
      )

      @resources = @resources
        .limit(@pagination.limit)
        .offset(@pagination.offset)
    end
  end
end
