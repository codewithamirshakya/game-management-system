import { EventEmitter2 } from "@nestjs/event-emitter";
import { Injectable } from "@nestjs/common";
import {AsyncEventDispatcherInterface} from "../../../application/EventBus/asyncEventDispatcher.interface";

@Injectable()
export class AsyncEventEmitterDispatcher implements AsyncEventDispatcherInterface{

  constructor(
    private eventEmitter: EventEmitter2
  ) {
  }

  async dispatch(eventName: string, metaData: any) {
    await this.eventEmitter.emitAsync(eventName,metaData);
  }
}