import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { BikeServiceService } from '../../services/bike-service.service';
import { Bikedetail } from '../../types/bikedetail';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import {Tag} from 'primeng/tag'


@Component({
  selector: 'app-detail-view',
  standalone: true,
  imports: [CarouselModule, ButtonModule, Tag, CommonModule],
  providers: [BikeServiceService, RouterLink],
  templateUrl: './detail-view.component.html',
  styleUrl: './detail-view.component.css'
})
export class DetailViewComponent {
  @Input() selectedId: number | null = null;
  isDrawerOpen = false;

  private bikeService = inject(BikeServiceService);
  bike: Bikedetail | undefined | null

  responsiveOptions: any[] | undefined;

  constructor(private route: ActivatedRoute, private router: Router){
   

  }
 
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedId'] && this.selectedId !== null) {
      if(this.selectedId){
        this.bikeService.getBicycleDetails(this.selectedId).subscribe(bicycle => {
          this.bike = bicycle
        }) 
      }
    }
  }

  ngOnInit(){
    this.bike = undefined
  }
  ngOnDestroy(){
    this.bike = null
  }

}
