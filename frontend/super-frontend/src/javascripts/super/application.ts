import RailsUjs from '@rails/ujs';
import { Application, Controller } from 'stimulus';
import ApplyTemplateController from './apply_template_controller';
import TogglePendingDestructionController from './toggle_pending_destruction_controller';

RailsUjs.start();

const application = Application.start()
application.register("apply-template", ApplyTemplateController)
application.register("toggle-pending-destruction", TogglePendingDestructionController)

export default {
  StimulusApplication: application,
  StimulusController: Controller,
};
