import { Injectable } from '@angular/core';
import { Message } from '../types/data.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messagesMocup: { unread: Message[], read: Message[] } = {
    unread: [
      { author: 'karol', message: 'Welcome new employers', createdAt: '12-12-2024 13:43', read: false, id: '1' },
      { author: 'karol', message: 'Welcome new employers', createdAt: '12-12-2024 13:44', read: false, id: '1' },
      { author: 'mirek', message: 'Wrong parts', createdAt: '12-12-2024 13:43', read: true, id: '2' },
      { author: 'ania', message: 'Where is projecgt of new part.', createdAt: '12-13-2024 10:43', read: false, id: '3' },
    ],
    read: [
      { author: 'karol', message: 'Welcome new employers', createdAt: '12-12-2024 13:43', read: false, id: '1' },
      { author: 'mirek', message: 'Wrong parts', createdAt: '12-12-2024 13:43', read: true, id: '2' },
      { author: 'ania', message: 'Where is projecgt of new part.', createdAt: '12-13-2024 10:43', read: false, id: '3' },
    ]
  }
  constructor() { }
}
