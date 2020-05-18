module Super
  module Step
    module_function

    def load_resources(controls, _params, action_inquirer)
      controls.scope(action: action_inquirer)
    end

    def initialize_pagination(resources, query_params, limit: Super.configuration.index_resources_per_page)
      Pagination.new(
        total_count: resources.size,
        limit: limit,
        query_params: query_params,
        page_query_param: :page
      )
    end

    def paginate_resources(resources, pagination)
      resources
        .limit(pagination.limit)
        .offset(pagination.offset)
    end

    def load_resource(controls, params, action_inquirer)
      controls.scope(action: action_inquirer).find(params[:id])
    end

    def build_resource(controls, action_inquirer)
      controls.scope(action: action_inquirer).build
    end

    def build_resource_with_params(controls, action_inquirer, create_permitted_params)
      controls.scope(action: action_inquirer).build(create_permitted_params)
    end
  end
end
