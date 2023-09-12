function run(activeValue, container) {
  const variants = container.querySelectorAll(".up-filter-field-variant");
  variants.forEach(function(variant) {
    const currentVariantValue = variant.dataset.filterFieldVariantId;

    if (activeValue === currentVariantValue) {
      // show
      let content = variant.querySelector(".up-filter-field-variant-content");

      if (content) {
        return;
      }

      const pocket = variant.querySelector(".up-filter-field-variant-pocket");
      let pocketContent = up.element.createFromHTML(pocket.innerHTML);
      up.hello(pocketContent);
      variant.appendChild(pocketContent);
    } else {
      // hide
      let content = variant.querySelector(".up-filter-field-variant-content");
      if (content) {
        content.remove();
      }
    }
  });
}

up.compiler(".up-filter-field-variants-invoke", function(element, data, meta) {
  const container = element.closest(".up-filter-field-variants");
  run(element.value, container);
  up.on(element, "change", function(event) {
    const activeValue = event.target.value;
    run(activeValue, container);
  });
});
