import { EventDispatcherInterface } from "../../../application/EventBus/eventDispatcher.interface";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EventEmitterDispatcher implements EventDispatcherInterface{

  constructor(
    private eventEmitter: EventEmitter2
  ) {
  }

  dispatch(eventName: string, metaData: any) {
    this.eventEmitter.emit(eventName,metaData);
  }
}