import RailsUjs from '@rails/ujs';
import { Application, Controller } from 'stimulus';
import NestedAttributesController from './nested_attributes_controller';

RailsUjs.start();

const application = Application.start()
application.register('nested-attributes', NestedAttributesController)

export default {
  StimulusApplication: application,
  StimulusController: Controller,
};
