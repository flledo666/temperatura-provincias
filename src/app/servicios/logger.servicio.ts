import { Injectable } from "@angular/core";

@Injectable()
export class LoggerService {

    log(msg:string) {
        const hora=new Date().toISOString();
        console.log(hora + ': ' + msg);
    }

    aviso(msg:string) {
        const hora=new Date().toISOString();
        console.warn(hora + ': ' + msg);;
    }

    error(msg:string) {
        const hora=new Date().toISOString();
        console.error(hora + ': ' + msg);;
    }
}

@Injectable()
export class NoLoggerService {

    log(msg:string) {}

    aviso(msg:string) {}

    error(msg:string) {}
}