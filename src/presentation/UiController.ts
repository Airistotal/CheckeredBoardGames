import * as $ from 'jquery';

import { IOCTypes } from '../business/initialization/IOCTypes';
import { injectable, inject } from "inversify";
import "reflect-metadata";

@injectable()
export class UiController {
  public uiContainer: JQuery;
  private restartPrompt!: JQuery;

	public constructor() {
    this.uiContainer = $("<div/>", {
      id:'UiController',
      style:'position: absolute;height:100%;width:100%;'
    });

    this.initRestartPrompt();

		$("body").append(this.uiContainer);
	}

  public showRestartPrompt(result: boolean): void {
    this.uiContainer.append(this.restartPrompt);
  }

  private initRestartPrompt() {
    this.restartPrompt = $("<div/>", {
      id:'restartPrompt',
      text:'Good game! Would you like to restart?',
    });

    var button_container = $("<div/>",{
      class: "flexContainer"
    });
    var yes_button = $("<button/>", {
      text: "Restart",
      style: "margin-top:15px;"
    });
    var no_button = $("<button/>", {
      text: "Change Game",
      style: "margin-top:15px;"
    });
    var self = this;

    yes_button.on("click", function(e) {});
    no_button.on("click", function(e) {});

    button_container.append(yes_button);
    button_container.append(no_button);

    this.restartPrompt.append($('<br/>'));
    this.restartPrompt.append(button_container);
  }
}