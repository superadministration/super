# frozen_string_literal: true

class StarfleetSeeder
  def self.seed(verbose: true)
    seeder = StarfleetSeeder.new(verbose: verbose)
    seeder.seed_from_fixture("ships", Ship)
    seeder.seed_from_fixture("members", Member)
    seeder.seed_from_fixture("favorite_things", FavoriteThing)
  end

  def initialize(verbose:)
    @verbose = verbose
    @seeded = {}
    @association_reflections = {}
  end

  def seed(basename, key, klass, value)
    @seeded[basename] ||= {}
    say { "--> #{key} (#{value})" }
    @association_reflections[klass] ||= klass.reflect_on_all_associations

    @association_reflections[klass].each do |ar|
      ar_name = ar.name.to_s
      ar_plural_name = ar.plural_name.to_s

      if value.key?(ar_name)
        value[ar_name] = @seeded.fetch(ar_plural_name).fetch(value[ar_name])
      end
    end

    @seeded[basename][key] = klass.find_or_create_by(value)
    say { "    success!" }
  rescue => e
    say { "    failure (#{e.message})" }
  end

  def seed_from_fixture(basename, klass)
    say { "==> #{basename}" }
    fixtures(basename).each do |key, value|
      seed(basename, key, klass, value)
    end

    nil
  end

  private

  def fixtures(basename)
    @fixtures_dir ||= Pathname.new("./fixtures").expand_path(__dir__)

    YAML.load_file(@fixtures_dir.join("#{basename}.yml"))
  end

  def say
    if @verbose
      puts(yield)
    end
  end
end
