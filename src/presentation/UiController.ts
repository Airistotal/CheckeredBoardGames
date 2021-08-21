import * as $ from 'jquery';

import { EventDispatcher } from '../business/eventsystem/EventDispatcher';
import { RestartEvent } from '../business/eventsystem/events/RestartEvent';

import { IOCTypes } from '../business/initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class UiController {
	public constructor() {
    this.initRestartPrompt();
	}

  public showRestartPrompt(result: boolean): void {
    $("#restartPrompt").show();
  }

  public hideRestartPrompt(): void {
    $("#restartPrompt").hide();
  }

  private initRestartPrompt() {
    let self = this;

    $(document).ready(function(e) {
      $("#restartButton").on("click", function() {
        EventDispatcher.dispatch(new RestartEvent());
        self.hideRestartPrompt();
      });

      $("#changeGameButton", function() {
        self.hideRestartPrompt();
      });
    });
  }
}
