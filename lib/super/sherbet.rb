# typed: false
# frozen_string_literal: true

# Copyright 2022 Sherbet contributors
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

module Sherbet
  SORBET_VERSION = "0.5.10370"
  class Error < StandardError
  end
  def self.auto_undefine
    Kernel.class_eval do
      alias_method :sherbet_previous_require, :require
      def require(path)
        Sherbet.undefine if path == "sorbet-runtime"
        sherbet_previous_require(path)
      end
    end
  end
  def self.undefine
    if ::Object::T == Sherbet::T
      Object.__send__(:undef_const, :T)
    end
  end
  module T
    def self.type_parameter(name)
    end
    def self.must(arg)
      arg
    end
    def self.bind(value, type, checked: nil)
      value
    end
    def self.any(type_a, type_b, *types)
    end
    def self.absurd(value)
    end
    def self.nilable(type)
    end
    def self.cast(value, type, checked: nil)
      value
    end
    def self.untyped
    end
    def self.let(value, type, checked: nil)
      value
    end
    def self.assert_type!(value, type, checked: nil)
      value
    end
    def self.noreturn
    end
    def self.unsafe(value)
      value
    end
    def self.all(type_a, type_b, *types)
    end
    def self.deprecated_enum(values)
    end
    def self.reveal_type(value)
      value
    end
    def self.self_type
    end
    def self.attached_class
    end
    def self.class_of(klass)
    end
    def self.proc
    end
    def self.type_alias(type = nil, &blk)
    end
    class Struct
    end
    class InterfaceWrapper
    end
    module Utils
    end
  module Enumerator
      module Lazy
        def self.[](*)
        end
      end
  end
    module AbstractUtils
    end
    module Generic
    end
    class InexactStruct
    end
    class ImmutableStruct
    end
    module NonForcingConstants
    end
    module Enumerable
      def self.[](*)
      end
    end
    class Enum
    end
    class Boolean
    end
    module Set
      def self.[](*)
      end
    end
    module Sig
      def sig(arg0 = nil, &blk)
      end
    end
    module Array
      def self.[](*)
      end
    end
    module Hash
      def self.[](*)
      end
    end
    module CompatibilityPatches
    end
    module Helpers
      def abstract!
      end
      def mixes_in_class_methods(mod, *mods)
      end
      def interface!
      end
      def final!
      end
      def requires_ancestor(&block)
      end
      def sealed!
      end
    end
    module Private
    end
    module Types
    end
    module Configuration
    end
    module Range
      def self.[](*)
      end
    end
    module Props
    end
  end
end
if !defined?(T)
  Sherbet.auto_undefine
  T = Sherbet::T
end
