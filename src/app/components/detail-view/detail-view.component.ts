import { Component, inject, Input } from '@angular/core';
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
  private bikeService = inject(BikeServiceService);
  bike: Bikedetail | undefined
  bikeId: number | undefined
  responsiveOptions: any[] | undefined;


  constructor(private route: ActivatedRoute, private router: Router){}


  ngOnInit(){
    this.bikeId = Number(this.route.snapshot.paramMap.get('id'))
    this.bikeService.getBicycleDetails(this.bikeId).subscribe(bicycle => {
      this.bike = bicycle
      console.log(this.bike.stolen === false)
    }) 


    this.responsiveOptions = [
      {
          breakpoint: '1400px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '1199px',
          numVisible: 3,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '575px',
          numVisible: 1,
          numScroll: 1
      }
  ]
  }
  goHome(){
    this.router.navigate(['/'])
  }

}
