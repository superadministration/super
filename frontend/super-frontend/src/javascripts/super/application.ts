import RailsUjs from '@rails/ujs';
import { Application, Controller } from 'stimulus';

RailsUjs.start();

const application = Application.start()

export default {
  StimulusApplication: application,
  StimulusController: Controller,
};
