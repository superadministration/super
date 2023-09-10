import "@webcomponents/custom-elements";
import "details-element-polyfill";
import "@github/details-dialog-element";

import "unpoly";
import "./unpoly_batch";
import "./unpoly_delete";
import "./unpoly_flatpickr";
import "./unpoly_form_field__destroy";
import "./unpoly_template";

import { Application, Controller as StimulusController } from "stimulus";

import tab_container_controller from "./tab_container_controller";
import tab_controller from "./tab_controller";

let StimulusApplication = Application.start();
StimulusApplication.register("tab-container", tab_container_controller);
StimulusApplication.register("tab", tab_controller);

export { StimulusApplication, StimulusController };
