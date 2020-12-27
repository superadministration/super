import RailsUjs from "@rails/ujs";
import { Application, Controller as StimulusController } from "stimulus";
import ApplyTemplateController from "./apply_template_controller";
import TogglePendingDestructionController from "./toggle_pending_destruction_controller";

RailsUjs.start();

let StimulusApplication = Application.start();
StimulusApplication.register("apply-template", ApplyTemplateController);
StimulusApplication.register(
  "toggle-pending-destruction",
  TogglePendingDestructionController
);

export { StimulusApplication, StimulusController };
