import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import {MenubarModule} from 'primeng/menubar'
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchComponent, MenubarModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-ride';

  items: MenuItem[]  | undefined

   constructor(private route: ActivatedRoute, private router: Router){}
  

  ngOnInit() {
    this.items = [
      { 
          label: 'My Ride', 
           icon: 'pi pi-home'
      }
    ]
  }

}
