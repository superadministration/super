# typed: false
# frozen_string_literal: true

module Super
  # A container class for all user-facing (4xx) errors thrown by this library.
  #
  # See also `Super::Error`
  class ClientError < StandardError
    class BadRequest < ClientError; end
    class Unauthorized < ClientError; end
    class Forbidden < ClientError; end
    class NotFound < ClientError; end
    class UnprocessableEntity < ClientError; end

    module Handling
      extend ActiveSupport::Concern

      included do
        rescue_from ::Super::ClientError do |exception|
          code, default_message =
            case exception
            when ClientError::UnprocessableEntity
              [422, "Unprocessable entity"]
            when ClientError::NotFound
              [404, "Not found"]
            when ClientError::Forbidden
              [403, "Forbidden"]
            when ClientError::Unauthorized
              [401, "Unauthorized"]
            when ClientError::BadRequest, ClientError
              [400, "Bad request"]
            end

          flash.now.alert =
            if exception.message == exception.class.name.to_s
              default_message
            else
              exception.message
            end

          render "nothing", status: code
        end
      end
    end
  end
end
