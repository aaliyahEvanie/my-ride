import { AfterViewInit, Component, EventEmitter, inject, OnInit, Output, signal, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { DrawerModule } from 'primeng/drawer'
import { FormsModule } from '@angular/forms';
import { Loader } from "@googlemaps/js-api-loader"
import { BikeServiceService } from '../../services/bike-service.service';
import { BikeObject } from '../../types/bike-object';
import { Bikedetail } from '../../types/bikedetail';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ButtonModule, FormsModule, DataViewModule, CommonModule, DrawerModule],
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
  bikeDetails: Bikedetail | undefined
  bikes = signal<BikeObject[]>([])
  visible2: boolean = false;

  constructor(
     private router: Router,
     private route: ActivatedRoute ) {
    
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
  }

  public onSearch(){
    this.bikeService.searchByCity('Amsterdam').subscribe((bikes)=> {
      this.results = bikes   
      this.bikes.set(bikes)   
    })
  }

  public onViewDetails(item: BikeObject){
    const id = item.id
    this.router.navigate(['/bike', id]) 
  }

  invokeEvent(place: Object) {
      this.setAddress.emit(place);
  }

}