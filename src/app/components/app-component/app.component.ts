import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import {MenubarModule} from 'primeng/menubar'
import {MessageModule} from 'primeng/message'
import { MenuItem} from 'primeng/api';
import { message, Severity } from '../../types/messages';
import { MessageService } from '../../services/message-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchComponent, MenubarModule, RouterModule, MessageModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bicycle-finder';

  items: MenuItem[]  | undefined
  message: message | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private messageService: MessageService){}
  

  ngOnInit() {
    
    this.items = [
      { 
          label: 'My Ride', 
           icon: 'pi pi-home'
      }
    ]
    this.messageService.message$.subscribe((message: message| null) => {
      this.message = message
    })
  }

}
