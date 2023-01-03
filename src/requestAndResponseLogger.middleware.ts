import { Injectable, NestMiddleware, RequestMethod } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CommandBus } from "@nestjs/cqrs";
import { LogRequestResponseCommand } from "./modules/core/shared/domain/command/log/log.requestResponse.command";

@Injectable()
export class RequestAndResponseLoggerMiddleware implements NestMiddleware {
  constructor(private commandBus: CommandBus) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Getting the request apiLog
    const request = {
      // headers: req.headers,
      body: req.body,
      url: req.originalUrl,
    };

    // Getting the response apiLog
    getResponseLog(request, res, this.commandBus);

    if (next) {
      next();
    }
  }
}

const getResponseLog = (request, res: Response, commandBus) => {
  const rawResponse = res.write;
  const rawResponseEnd = res.end;
  const chunkBuffers = [];

  // New chunk passed in as Buffer each time write() is called by stream
  // Take chunks as a rest parameter since it is an array. This allows applying Array methods directly (ref MDN)
  // res.write below is in object mode for write to avoid needing encoding arg (https://nodejs.org/api/stream.html#writable_writevchunks-callback)
  res.write = (...chunks) => {
    const resArgs = [];
    for (let i = 0; i < chunks.length; i++) {
      resArgs[i] = chunks[i];

      // This handling comes in when buffer is full, hence rawResponse === false after rawResponse.apply() below
      // Ref: Example under https://nodejs.org/api/stream.html#class-streamwritable
      // Callback (res.write) resumes write stream
      if (!resArgs[i]) {
        res.once('drain', res.write);

        // Resume from last falsy iteration
        --i;
      }
    }

    // Copy buffer to new buffer instance then push into chunks[]
    // resArgs[0] contains the response body
    if (resArgs[0]) {
      chunkBuffers.push(Buffer.from(resArgs[0]));
    }

    // res.write shuold return true if the internal buffer is less than the default highWaterMark. If false is returned, further attempts to write data to the stream should stop until the 'drain' event is emitted.
    // The apply() method accepts two arguments (Ref: https://www.javascripttutorial.net/javascript-apply-method/):
    // thisArg (res) is the value of 'this' provided for function rawResponse
    // The args argument (restArgs) is an array that specifies the arguments of the function rawResponse
    return rawResponse.apply(res, resArgs);
  };

  res.end = (...chunk) => {
    const resArgs = [];
    for (let i = 0; i < chunk.length; i++) {
      resArgs[i] = chunk[i];
    }

    // Copy buffer to new buffer instance then push into chunks[]
    // resArgs[0] contains the response body
    if (resArgs[0]) {
      chunkBuffers.push(Buffer.from(resArgs[0]));
    }

    // Encode buffer as utf8 JSON string
    const body = Buffer.concat(chunkBuffers).toString('utf8');

    // Set custom header for response
    res.setHeader('origin', 'restjs-req-res-logging-repo');

    const responseLog = {
      response: {
        statusCode: res.statusCode,
        body: JSON.parse(body) || body || {},
        // Returns a shallow copy of the current outgoing headers
        headers: res.getHeaders(),
      },
    };

    //log request and response log in database
    commandBus.execute(
      new LogRequestResponseCommand(request.body, request.url, responseLog)
    );

    // res.end() is satisfied after passing in restArgs as params
    // Doing so creates 'end' event to indicate that the entire body has been received.
    // Otherwise, the stream will continue forever (ref: https://nodejs.org/api/stream.html#event-end_1)
    rawResponseEnd.apply(res, resArgs);
    return responseLog as unknown as Response;
  };

};