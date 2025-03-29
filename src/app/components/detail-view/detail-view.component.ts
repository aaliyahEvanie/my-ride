import { Component, inject, Input } from '@angular/core';
import { BikeServiceService } from '../../services/bike-service.service';
import { Bikedetail } from '../../types/bikedetail';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-view',
  standalone: true,
  imports: [],
  providers: [BikeServiceService, CommonModule, RouterLink],
  templateUrl: './detail-view.component.html',
  styleUrl: './detail-view.component.css'
})
export class DetailViewComponent {
  private bikeService = inject(BikeServiceService);
  bike: Bikedetail | undefined
  bikeId: number | undefined

  constructor(private route: ActivatedRoute, private router: Router){}


  ngOnInit(){
    this.bikeId = Number(this.route.snapshot.paramMap.get('id'))
    this.bikeService.getBicycleDetails(this.bikeId).subscribe(bicycle => {
      this.bike = bicycle
      console.log(this.bike)
    }) 
  }
  goHome(){
    this.router.navigate(['/'])
  }

}
