up.compiler(".up-delete-invoke", function(element, data, meta) {
  up.on(element, "click", function(event) {
    let target = element.closest(".up-delete");
    target.remove();
    up.event.halt(event);
  });
});
