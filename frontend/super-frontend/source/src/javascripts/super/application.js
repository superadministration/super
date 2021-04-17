import RailsUjs from "@rails/ujs";
import { Application, Controller as StimulusController } from "stimulus";
import ApplyTemplateController from "./apply_template_controller";
import CleanFilterParamController from "./clean_filter_param_controller";
import CleanFilterParamsController from "./clean_filter_params_controller";
import DeleteController from "./delete_controller";
import FlatpickrController from "./flatpickr_controller";
import TogglePendingDestructionController from "./toggle_pending_destruction_controller";

let StimulusApplication = Application.start();
StimulusApplication.register("apply-template", ApplyTemplateController);
StimulusApplication.register("clean-filter-param", CleanFilterParamController);
StimulusApplication.register(
  "clean-filter-params",
  CleanFilterParamsController
);
StimulusApplication.register("delete", DeleteController);
StimulusApplication.register("flatpickr", FlatpickrController);
StimulusApplication.register(
  "toggle-pending-destruction",
  TogglePendingDestructionController
);

export { StimulusApplication, StimulusController };
