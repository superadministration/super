module Super
  module View
    module_function

    def gutter_h(pm, positive = true)
      if pm == :p
        if positive
          "px-2"
        else
          raise Error::InvalidStyle, "invalid style: -px-2"
        end
      else
        if positive
          "mx-2"
        else
          "-mx-2"
        end
      end
    end

    def classes(*list)
      list.flatten.select(&:present?).join(" ")
    end
  end
end
