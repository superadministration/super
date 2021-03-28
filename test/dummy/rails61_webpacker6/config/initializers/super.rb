Super.configuration do |c|
  c.title = "My Admin Site"
  c.javascripts = Super::Assets.use_webpacker(c.javascripts)
  c.stylesheets = Super::Assets.use_webpacker(c.stylesheets)
end
