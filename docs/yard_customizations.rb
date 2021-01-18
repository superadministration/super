# frozen_string_literal: true

require "yard"

module FixRelativeLinks
  def resolve_links(html)
    html = html.gsub(%r{<a href="([^"]+)">([^<]+)</a>}) do
      resolve_link_to_docs_subdir(full_match: $&, href: $1, content: $2)
    end

    html = html.gsub(%r{(<pre[^<]+)?<code[^>]*>([^<]+)</code>}) do
      resolve_link_to_code(full_match: $&, pre: $1, code: $2)
    end

    super(html)
  end

  def resolve_link_to_docs_subdir(full_match:, href:, content:)
    if href =~ /\bdocs\b/
      %({file:#{href} #{content}})
    else
      full_match
    end
  end

  def resolve_link_to_code(full_match:, pre:, code:)
    if pre
      return full_match
    end

    if code.include?("\n")
      return full_match
    end

    if !code.start_with?("Super::")
      return full_match
    end

    "{#{code}}"
  end
end

YARD::Templates::Template.extra_includes << FixRelativeLinks
