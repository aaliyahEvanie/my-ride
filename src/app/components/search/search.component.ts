import { AfterViewInit, Component, EventEmitter, inject, OnInit, Output, signal, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { DrawerModule } from 'primeng/drawer'
import { FormsModule } from '@angular/forms';
import { BikeServiceService } from '../../services/bike-service.service';
import { BikeObject } from '../../types/bike-object';
import { Bikedetail } from '../../types/bikedetail';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from '../../services/cityservice.service';
import { AutoCompleteModule } from 'primeng/autocomplete'
import * as bikesData from '../../types/dummyData.json'
import { DetailViewComponent } from '../detail-view/detail-view.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ButtonModule, 
            FormsModule, 
            DataViewModule, 
            CommonModule, 
            DrawerModule, 
            DetailViewComponent,
            AutoCompleteModule],
  providers: [BikeServiceService, CityService],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit, AfterViewInit {
  layout: string = 'grid';
  options = ['list', 'grid'];
  selectedId: number | null = null;

  selectedCity: {name: string} | null = null;
  
  private bikeService = inject(BikeServiceService);
  results: BikeObject[] = []
  bikes = signal<BikeObject[]>([])
  data: any = bikesData
  visible: boolean = false;
  filteredCities: { name: string; }[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private cityService: CityService ) {
    
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  search(event: any) {
    this.cityService.searchCities(event.query)
      .then((cities) => {
        this.filteredCities = cities.map(city => ({ name: city })); 
      })
      .catch((err) => console.error('Error fetching cities:', err));
  }

  public onSearch(){
    if(this.selectedCity?.name ){
     this.bikeService.searchByCity(this.selectedCity?.name).subscribe((bikes)=> {
        this.results = bikes   
        this.bikes.set(bikes)   
      })
    }
  }

  selectItem(id: number): void {
    this.selectedId = id;
    this.visible = true
  }
}