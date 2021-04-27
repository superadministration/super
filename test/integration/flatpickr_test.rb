require "test_helper"

class FlatpickrTest < CapybaraTest
  selenium!

  def test_dates_work_in_california
    current_time = Time.now.in_time_zone("America/Los_Angeles")
    tomorrow = (current_time + 1.day).beginning_of_day

    browser_tz("America/Los_Angeles") do
      # Make sure it creates correctly
      visit(new_admin_sink_path)
      find_field("Date column").click
      set_date!(page, tomorrow)
      assert_difference("Sink.count", 1) do
        click_on("Create Sink")
      end
      sink = Sink.last
      expected = Date.new(tomorrow.year, tomorrow.month, tomorrow.day)
      assert_equal(expected, sink.date_column)
      assert_match(/Date column #{expected.iso8601}\b/, page.first("table").text)
      # Make sure it no-ops when "edited" without changes
      visit(edit_admin_sink_path(sink))
      assert_equal(expected.iso8601, find_field("Date column").value)
      assert_difference("Sink.count", 0) do
        click_on("Update Sink")
      end
      sink.reload
      assert_equal(expected, sink.date_column)
      assert_match(/Date column #{expected.iso8601}\b/, page.first("table").text)
    end
  end

  def test_datetimes_work_in_california
    current_time = Time.now.in_time_zone("America/Los_Angeles")
    tomorrow = (current_time + 1.day).beginning_of_day

    browser_tz("America/Los_Angeles") do
      # Make sure it creates correctly
      visit(new_admin_sink_path)
      find_field("Datetime column").click
      set_date!(page, tomorrow)
      set_time!(page, tomorrow)
      am_pm = page.first(".flatpickr-am-pm")
      am_pm.click if am_pm.text == "PM"
      assert_difference("Sink.count", 1) do
        click_on("Create Sink")
      end
      sink = Sink.last
      expected = tomorrow.dup.in_time_zone("UTC")
      assert_equal(expected, sink.datetime_column)
      assert_match(/Datetime column #{expected.to_s}\b/, page.first("table").text)
      # Make sure it no-ops when "edited" without changes
      visit(edit_admin_sink_path(sink))
      assert_equal(expected.iso8601(3), find_field("Datetime column").value)
      assert_difference("Sink.count", 0) do
        click_on("Update Sink")
      end
      sink.reload
      assert_equal(expected, sink.datetime_column)
      assert_match(/Datetime column #{expected.to_s}\b/, page.first("table").text)
    end
  end

  def test_times_work_in_california
    current_time = Time.now.in_time_zone("America/Los_Angeles")
    tomorrow = (current_time + 1.day).beginning_of_day

    browser_tz("America/Los_Angeles") do
      # Make sure it creates correctly
      visit(new_admin_sink_path)
      find_field("Time column").click
      set_time!(page, tomorrow)
      assert_difference("Sink.count", 1) do
        click_on("Create Sink")
      end
      sink = Sink.last
      expected = tomorrow.dup.in_time_zone("UTC").change(year: 2000, month: 1, day: 1, hour: 0, min: 0, sec: 0)
      assert_equal(expected, sink.time_column)
      assert_match(/Time column 00:00:00/, page.first("table").text)
      # Make sure it no-ops when "edited" without changes
      visit(edit_admin_sink_path(sink))
      assert_equal("00:00:00", find_field("Time column").value)
      assert_difference("Sink.count", 0) do
        click_on("Update Sink")
      end
      sink.reload
      assert_equal(expected, sink.time_column)
      assert_match(/Time column 00:00:00/, page.first("table").text)
    end
  end

  private

  def set_date!(page, tomorrow)
    page.first(".flatpickr-monthDropdown-month[value='#{tomorrow.month - 1}']").select_option
    page.first(".flatpickr-calendar .cur-year").fill_in(with: tomorrow.year)
    page.find(".flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)", text: tomorrow.day).click
  end

  def set_time!(page, tomorrow)
    page.first(".flatpickr-hour").fill_in(with: tomorrow.hour)
    page.first(".flatpickr-minute").fill_in(with: tomorrow.min)
    page.first(".flatpickr-second").fill_in(with: tomorrow.sec)
    am_pm = page.first(".flatpickr-am-pm")
    am_pm.click if am_pm.text == "PM"
  end
end
