import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { AppComponent } from './components/app-component/app.component';

export const routes: Routes = [
    {path: '', component: SearchComponent}, 
    {path: 'bike/:id', component: DetailViewComponent}
];
