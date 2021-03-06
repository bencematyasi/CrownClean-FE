import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VehicleService } from 'src/app/shared/services/vehicle_service/vehicle.service'; import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { User } from 'src/app/shared/models/User/user';
import { Location } from '@angular/common';
import { TokenService } from 'src/app/shared/services/token_service/token.service';
import {fakeAsync} from '@angular/core/testing';


@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})
export class VehicleAddComponent implements OnInit {


  newVehicleForm = new FormGroup({
    Brand: new FormControl(''),
    UniqueID: new FormControl(''),
    Type: new FormControl(''),
    Size: new FormControl({ value: '', disabled: true }),
    InternalPlus: new FormControl(''),
  });

  typeList: string[] =
    ['Small',
      'Midsize',
      'Large/Wagon',
      'MPV',
      'Boat'];
  vehicleIsBoat = false;
  currentUser = User;
  internalPlusDef = false;

  constructor(private vehicleService: VehicleService,
    private tokenService: TokenService,
    private snackBar: MatSnackBar,
    private location: Location ) { }

  ngOnInit() {
    this.tokenService.getUserFromToken().subscribe(user => {
      this.currentUser = user;
    },
      error => {
        console.log(error);
        this.openSnackBar(error.message, 1500);
      }
    );
  }

  changeBoatSelection() {
    this.vehicleIsBoat = !this.vehicleIsBoat;
    if (this.vehicleIsBoat) {
      console.log('Vehicle is boat');
      this.newVehicleForm.get('Size').enable();
    } else {
      console.log('Vehicle is not boat');
      this.newVehicleForm.get('Size').disable();
    }

  }
  save() {
    const vehicle = this.newVehicleForm.value;
    vehicle.user = this.currentUser;
    vehicle.internalPlus = this.newVehicleForm.get('InternalPlus').value;
      this.vehicleService.addVehicle(vehicle).subscribe(success => {
        this.openSnackBar('Vehicle added!', 1500);
        this.location.back(); // User should be redirected to the previous page
      }, err => {
        console.log(err);
        this.openSnackBar('Failed to add vehicle! ' + err.error, 1500);
      }
      );
  }

  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, 'OK', {
      duration: duration,
    });
  }
}
