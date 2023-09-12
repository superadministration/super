import "@webcomponents/custom-elements";
import "details-element-polyfill";
import "@github/details-dialog-element";

import "unpoly";
import "./unpoly_batch";
import "./unpoly_delete";
import "./unpoly_flatpickr";
import "./unpoly_form_field__destroy";
import "./unpoly_template";
import "./unpoly_filter_field_variants";

import { Application, Controller as StimulusController } from "stimulus";

let StimulusApplication = Application.start();

export { StimulusApplication, StimulusController };
