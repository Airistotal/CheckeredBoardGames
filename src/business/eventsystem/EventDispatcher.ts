import * as $ from 'jquery';

import { Event } from './Event';

export class EventDispatcher {

  private constructor() {
    this.handlers = new Map<string, EventHandler<any>[]>();
  }

  private handlers: Map<string, EventHandler<any>[]>;

  private static instance: EventDispatcher;

  private static getInstance(): EventDispatcher {
    if (!EventDispatcher.instance) {
      EventDispatcher.instance = new EventDispatcher();
    }

    return EventDispatcher.instance;
  }

  /*
  * Decorator to associate a function to an event.
  * @event: An instance of the event to register the handler to.
  */
  public static register<T extends Event>(event: T) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      EventDispatcher.registerHandler(event.constructor.name, target[propertyKey]);
    };
  }

  private static registerHandler<T extends Event>(eventName: string, handler: EventHandler<T>) : void {
    let handlers = EventDispatcher.getInstance().handlers.get(eventName);

    if (handlers === undefined) {
      EventDispatcher.getInstance().handlers.set(eventName, [handler]);
    }
    else {
      handlers.push(handler);
    }
  }

  public static dispatch<T extends Event>(event: T) : void {
    let eventHandlers = EventDispatcher.getInstance().handlers.get(event.constructor.name);

    if (eventHandlers === undefined || eventHandlers.length == 0) {
      console.error(`No handlers found for ${event.constructor.name}`);
    } else if (eventHandlers.length > 1) {
      console.error(`Multiple handlers found for ${event.constructor.name}`);
    } else {
      eventHandlers[0](event);
    }
  }

  public static broadcast<T extends Event>(event: T) {
    let eventHandlers = EventDispatcher.getInstance().handlers.get(event.constructor.name);

    if (eventHandlers === undefined || eventHandlers.length == 0) {
      console.error(`No handlers found for ${event.toString()}`);
    } else {
      eventHandlers.forEach((handler) => {
        handler(event);
      });
    }
  }
}

interface EventHandler<T extends Event> {
  (event: T): void;
}
