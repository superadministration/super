require "test_helper"

class Super::AssetsTest < ActiveSupport::TestCase
  def test_webpacker_returns_webpacker_asset
    asset = Super::Assets.webpacker("path/to/asset")
    assert_equal(Super::Assets::Handler.webpacker, asset.handler)
    assert_equal("path/to/asset", asset.path)
  end

  def test_sprockets_returns_sprockets_asset
    asset = Super::Assets.sprockets("path/to/asset")
    assert_equal(Super::Assets::Handler.sprockets, asset.handler)
    assert_equal("path/to/asset", asset.path)
  end

  def test_handler_auto
    skip if Super::Assets::Handler.gem_specification("webpacker").nil?
    original_webpacker = Super::Assets::Handler.gem_specification("webpacker")

    # Sprockets by default, if available
    assert_equal(Super::Assets::Handler.sprockets, Super::Assets::Handler.auto)

    # Webpacker as a fallback
    Super::Assets::Handler.stubs(:gem_specification).with("sprockets").returns(nil)
    Super::Assets::Handler.expects(:gem_specification).with("webpacker").returns(original_webpacker)
    assert_equal(Super::Assets::Handler.webpacker, Super::Assets::Handler.auto)

    # And none if neither Sprockets nor Webpacker
    Super::Assets::Handler.expects(:gem_specification).with("webpacker").returns(nil)
    assert_equal(Super::Assets::Handler.none, Super::Assets::Handler.auto)
  end

  def test_use_webpacker
    assert_equal(
      [Super::Assets.webpacker("derek/zoolander")],
      Super::Assets.use_webpacker(Super::Assets.sprockets("derek/zoolander"))
    )

    assert_equal(
      [Super::Assets.webpacker("derek/zoolander"), Super::Assets.webpacker("hansel")],
      Super::Assets.use_webpacker(
        [Super::Assets.sprockets("derek/zoolander"), Super::Assets.sprockets("hansel")]
      )
    )
  end

  def test_use_sprockets
    assert_equal(
      [Super::Assets.sprockets("derek/zoolander")],
      Super::Assets.use_sprockets(Super::Assets.webpacker("derek/zoolander"))
    )

    assert_equal(
      [Super::Assets.sprockets("derek/zoolander"), Super::Assets.sprockets("hansel")],
      Super::Assets.use_sprockets(
        [Super::Assets.webpacker("derek/zoolander"), Super::Assets.webpacker("hansel")]
      )
    )
  end
end
