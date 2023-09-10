up.compiler(".up-form-field--destroy", function(element, data, meta) {
  up.on(element, "change", function(event) {
    let target = element.closest(".up-form-field--destroy-target");

    if (!target) {
      return;
    }

    if (element.checked) {
      target.classList.add("opacity-75", "bg-gray-100");
    } else {
      target.classList.remove("opacity-75", "bg-gray-100");
    }
  });
});
