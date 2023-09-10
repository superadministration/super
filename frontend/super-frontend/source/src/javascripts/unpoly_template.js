up.compiler(".up-template-invoke", function(element, data, meta) {
  up.on(element, "click", function(event) {
    const container = element.closest(".up-template");
    const templateSource = container.querySelector(
      "template.up-template-source"
    );

    if (!(container && templateSource)) {
      return;
    }

    up.event.halt(event);

    const unixtime = new Date().getTime();
    const content = templateSource.innerHTML.replace(
      /TEMPLATEINDEX/g,
      unixtime.toString()
    );
    const newElement = up.element.createFromHTML(content);
    up.hello(newElement);
    templateSource.insertAdjacentElement("beforebegin", newElement);
  });
});
