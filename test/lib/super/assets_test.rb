require "test_helper"

class Super::AssetsTest < ActiveSupport::TestCase
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
