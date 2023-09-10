import flatpickr from "flatpickr";

up.compiler(".up-flatpickr", function(element, data, meta) {
  let flatpickrOptions = up.element.jsonAttr(
    element,
    "data-up-flatpickr-options"
  );
  let flatpickrInstance = flatpickr(element, flatpickrOptions);

  return function() {
    flatpickrInstance.destroy();
  };
});
