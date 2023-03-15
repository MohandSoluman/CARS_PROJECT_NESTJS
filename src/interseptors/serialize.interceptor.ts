import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

/**
This interceptor uses the @Injectable() decorator to tell 
Nest that it can be used by other codes. It also implements
the NestInterceptor interface, which means it has a function called intercept.

The intercept function takes two parameters: context and next.
The context gives information about the current request, 
such as the controller, handler, arguments, etc. The next is a CallHandler object that
allows us to access the next step in the pipeline.


 */
export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a request is handled
    // by the request handler
    return handler.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
