module InputFlatpickr
  def set_date!(date)
    page.first(".flatpickr-monthDropdown-month[value='#{date.month - 1}']").select_option
    page.first(".flatpickr-calendar .cur-year").fill_in(with: date.year)
    page.find(".flatpickr-day:not(.prevMonthDay):not(.nextMonthDay)", text: /^#{date.day}$/).click
  end

  def set_time!(time)
    page.first(".flatpickr-hour").fill_in(with: time.hour)
    page.first(".flatpickr-minute").fill_in(with: time.min)
    page.first(".flatpickr-second").fill_in(with: time.sec)
  end
end
