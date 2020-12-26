module Super
  class Pagination
    include Enumerable

    attr_reader :current_pageno
    attr_reader :limit

    def initialize(total_count:, limit:, query_params:, page_query_param:)
      @total_count = total_count.to_i
      @limit = limit.to_i
      @query_params = query_params
      @page_query_param = page_query_param

      self.current_pageno = query_params[page_query_param]
    end

    def offset
      limit * (current_pageno - 1)
    end

    def current_pageno=(pageno)
      pageno = pageno.to_i

      @current_pageno =
        if pageno.zero?
          1
        else
          pageno
        end
    end

    def necessary?
      pages > 1
    end

    def each
      if !block_given?
        return enum_for(:each)
      end

      (1..pages).each do |pageno|
        is_current_page = pageno == current_pageno
        display = pageno.to_s
        page_query_params = @query_params.dup
        if pageno == 1
          page_query_params.delete(:page)
        else
          page_query_params[@page_query_param] = pageno
        end

        yield(page_query_params, is_current_page, display)
      end
    end

    def to_partial_path
      "super_pagination"
    end

    private

    def pages
      @pages ||=
        begin
          quotient, remainder = @total_count.divmod(@limit)

          if remainder.zero?
            quotient
          else
            quotient + 1
          end
        end
    end

    module ControllerMethods
      def index
        super
        @pagination = controls.initialize_pagination(action: action_inquirer, records: @records, query_params: request.GET)
        @records = controls.paginate_records(action: action_inquirer, records: @records, pagination: @pagination)
        @view.mains.first.parts.push(:@pagination)
      end
    end
  end

  class Controls
    module Optional
      # Specifies how many records to show per page
      #
      # @param action [ActionInquirer]
      # @param query_params [Hash]
      # @return [ActiveRecord::Relation]
      def records_per_page(action:, query_params:)
        Super.configuration.index_records_per_page
      end
    end

    module Steps
      # Sets up pagination
      #
      # @param action [ActionInquirer]
      # @param records [ActiveRecord::Relation]
      # @param query_params [Hash]
      # @return [Pagination]
      def initialize_pagination(action:, records:, query_params:)
        Pagination.new(
          total_count: records.size,
          limit: records_per_page(action: action, query_params: query_params),
          query_params: query_params,
          page_query_param: :page
        )
      end

      # Paginates
      #
      # @param action [ActionInquirer]
      # @param records [ActiveRecord::Relation]
      # @param pagination [Pagination]
      # @return [ActiveRecord::Relation]
      def paginate_records(action:, records:, pagination:)
        records
          .limit(pagination.limit)
          .offset(pagination.offset)
      end
    end
  end
end
