import "@webcomponents/custom-elements";
import "details-element-polyfill";
import "@github/details-dialog-element";

import "unpoly";
import "./unpoly_batch";

import { Application, Controller as StimulusController } from "stimulus";

import apply_template_controller from "./apply_template_controller";
import clean_filter_param_controller from "./clean_filter_param_controller";
import clean_filter_params_controller from "./clean_filter_params_controller";
import delete_controller from "./delete_controller";
import flatpickr_controller from "./flatpickr_controller";
import tab_container_controller from "./tab_container_controller";
import tab_controller from "./tab_controller";
import toggle_pending_destruction_controller from "./toggle_pending_destruction_controller";

let StimulusApplication = Application.start();
StimulusApplication.register("apply-template", apply_template_controller);
StimulusApplication.register(
  "clean-filter-param",
  clean_filter_param_controller
);
StimulusApplication.register(
  "clean-filter-params",
  clean_filter_params_controller
);
StimulusApplication.register("delete", delete_controller);
StimulusApplication.register("flatpickr", flatpickr_controller);
StimulusApplication.register("tab-container", tab_container_controller);
StimulusApplication.register("tab", tab_controller);
StimulusApplication.register(
  "toggle-pending-destruction",
  toggle_pending_destruction_controller
);

export { StimulusApplication, StimulusController };
