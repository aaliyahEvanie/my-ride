import { AfterViewInit, Component, EventEmitter, inject, OnInit, Output, signal, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { FormsModule } from '@angular/forms';
import { Loader } from "@googlemaps/js-api-loader"
import { BikeServiceService } from '../../services/bike-service.service';
import { BikeObject } from '../../types/bike-object';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ButtonModule, FormsModule, DataViewModule, CommonModule],
  providers: [BikeServiceService],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit, AfterViewInit {
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;

  autocompleteInput: google.maps.places.Autocomplete | undefined;
  queryWait: boolean | undefined;
  private bikeService = inject(BikeServiceService);
  results: BikeObject[] = []
  bikes = signal<BikeObject[]>([])

  constructor() {
    
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
      this.getPlaceAutocomplete();
  }


  private getPlaceAutocomplete() {
    const loader = new Loader({
      apiKey: "AIzaSyD86kzbC9k_O6Pvo2mWK0x1cGeWb4m6jvw",
      version: "weekly",
      
    });
    
    loader.load().then(async () => {
      const response = await google.maps.importLibrary("places") as google.maps.Place;
      console.log(response)
    
    });
  }
  public onSearch(){
    this.bikeService.searchByCity('Amsterdam').subscribe((bikes)=> {
      this.results = bikes   
      this.bikes.set(bikes)   
    })
  }

  invokeEvent(place: Object) {
      this.setAddress.emit(place);
  }

}