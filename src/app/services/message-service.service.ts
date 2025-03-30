import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { message, Severity } from '../types/messages';
import { warn } from 'console';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new BehaviorSubject<message| null>(null)

  message$ = this.messageSubject.asObservable()

  constructor() { }

  addMessage(severity: Severity, summary: string, detail: string){
    
    this.messageSubject.next({severity, summary, detail})
  }

  clear(){
    this.messageSubject.next(null)
  }
}
