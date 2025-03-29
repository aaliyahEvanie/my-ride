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

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ButtonModule, 
            FormsModule, 
            
            DataViewModule, 
            CommonModule, 
            DrawerModule, 
            AutoCompleteModule],
  providers: [BikeServiceService, CityService],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit, AfterViewInit {
  
  selectedCity: {name: string} | null = null;
  


  private bikeService = inject(BikeServiceService);
  results: BikeObject[] = []
  bikeDetails: Bikedetail | undefined
  bikes = signal<BikeObject[]>([])
  visible2: boolean = false;
  filteredCities: { name: string; }[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private cityService: CityService ) {
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
  }

  search(event: any) {
    console.log('Search triggered:', event.query); // Debugging to ensure search is called
    this.cityService.searchCities(event.query)
      .then((cities) => {
        this.filteredCities = cities.map(city => ({ name: city })); // Convert to objects
        console.log('Filtered cities:', this.filteredCities); 
      })
      .catch((err) => console.error('Error fetching cities:', err));
  }

  public onSearch(){
    if(this.selectedCity?.name ){
      //todo truncate the country from the values also in the filter search property
     this.bikeService.searchByCity(this.selectedCity?.name).subscribe((bikes)=> {
        this.results = bikes   
        this.bikes.set(bikes)   
      })
    }
  }

  public onViewDetails(item: BikeObject){
    const id = item.id
    this.router.navigate(['/bike', id]) 
  }

}