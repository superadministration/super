module Super
  class Filter
    module ControllerMethods
      def index
        super
        @filter_form = controls.initialize_filtering(params: params, query_params: request.GET)
        @records = controls.filter_records(filter_form: @filter_form, records: @records)
        @view.asides.push(:@filter_form)
      end
    end
  end

  class Controls
    module Optional
      def filters_enabled?
        actual.respond_to?(:filter_schema)
      end

      def filter_schema
        actual.filter_schema
      end
    end

    module Steps
      def initialize_filtering(params:, query_params:)
        if filters_enabled?
          Super::Filter::FormObject.new(
            model: model,
            schema: filter_schema,
            params: params[:q],
            url: query_params
          )
        end
      end

      def filter_records(filter_form:, records:)
        if filters_enabled? && records
          filter_form.to_search_query(records)
        else
          records
        end
      end
    end
  end
end
