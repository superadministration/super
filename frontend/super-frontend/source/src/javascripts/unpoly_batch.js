up.compiler(".up-batch", function(element, data, meta) {
  const directMethods = ["get", "post"];
  const postMethods = ["put", "patch", "delete"];
  let form = element.closest("form");

  let batchMethod = data.batchMethod;
  if (typeof batchMethod === "string") {
    batchMethod = batchMethod.toLowerCase();
  }

  if (directMethods.includes(batchMethod)) {
    form.method = batchMethod;
  } else if (postMethods.includes(batchMethod)) {
    form.method = "post";
    let methodInput = document.createElement("input");
    methodInput.type = "hidden";
    methodInput.name = "_method";
    methodInput.value = batchMethod;
    form.appendChild(methodInput);
  } else {
    form.method = "get";
  }

  form.action = data.batchHref;

  if (batchMethod === "get") {
    return;
  }

  let authenticityTokenInput = document.createElement("input");
  authenticityTokenInput.type = "hidden";
  authenticityTokenInput.name = document.querySelector(
    "meta[name='csrf-param']"
  ).content;
  authenticityTokenInput.value = document.querySelector(
    "meta[name='csrf-token']"
  ).content;
  form.appendChild(authenticityTokenInput);
});
