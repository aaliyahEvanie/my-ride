import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import {MenubarModule} from 'primeng/menubar'
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchComponent, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-ride';

  items: MenuItem[]  | undefined

  ngOnInit() {
    this.items = [
      { 
          label: 'My Ride', 
           icon: 'pi pi-home'
      }
    ]
  }

}
