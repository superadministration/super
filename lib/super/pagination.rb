module Super
  class Pagination
    include Enumerable

    attr_reader :current_pageno
    attr_reader :limit

    def initialize(total_count:, current_pageno:, limit:)
      @total_count = total_count.to_i
      @limit = limit.to_i
      self.current_pageno = current_pageno
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

    def each
      if !block_given?
        return enum_for(:each)
      end

      quotient, remainder = @total_count.divmod(@limit)
      pages =
        if remainder.zero?
          quotient
        else
          quotient + 1
        end

      (1..pages).each do |pageno|
        is_current_page = pageno == current_pageno
        display = pageno.to_s

        yield(pageno, is_current_page, display)
      end
    end
  end
end
