import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    //nese nuk thirret metoda handle() nbrenda metodes intercept() route handler nuk do te ekzekutohet
    //Kjo qasje do te thote qe metoda intercept() mbeshtjell request/response stream

    //mund te shkruash logjike kodi para se te therrasesh metoden handle()

    console.log('Interceptor before the request...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`Interceptor After... ${Date.now() - now}ms`)),
      );
  }
}