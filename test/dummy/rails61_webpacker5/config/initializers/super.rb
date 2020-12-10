Super.configuration do |c|
  c.title = "My Admin Site"
  c.controller_namespace = "admin"
  c.route_namespace = "admin"
  c.asset_handler = Super::Assets.webpacker
end
