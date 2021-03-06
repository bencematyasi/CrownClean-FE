import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/shared/services/vehicle_service/vehicle.service';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from 'src/app/shared/models/Vehicle/vehicle';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.css']
})
export class VehicleDetailComponent implements OnInit {

  constructor(private vehicleService: VehicleService,
              private route: ActivatedRoute,
    private location: Location) { }

  currentVehicle: Vehicle

  ngOnInit() {
    this.getVehicle();
  }

  back() {
    this.location.back();
  }
  getVehicle() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.vehicleService.getVehicleByID(id).subscribe(vehicle => {
      this.currentVehicle = vehicle;
    },
      error => {
        console.log(error);
        alert(error.message);
      }
    );
  }

}
