Super.configuration do |c|
  c.title = "My Admin Site"
  c.controller_namespace = "admin"
  c.route_namespace = "admin"
  c.javascripts = Super::Assets.use_webpacker(c.javascripts)
  c.stylesheets = Super::Assets.use_webpacker(c.stylesheets)
end
