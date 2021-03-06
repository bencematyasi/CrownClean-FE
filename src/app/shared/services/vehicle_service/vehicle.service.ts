import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Vehicle } from '../../models/Vehicle/vehicle';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilteredList } from '../../models/FilteredList/FilteredList';
import { VehicleFilter } from '../../models/Vehicle/VehicleFilter';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<FilteredList> {
    return this.http.get<FilteredList>(environment.apiURL + 'vehicles');
  }

  getFilteredVehicles(vehicleFilter: VehicleFilter): Observable<FilteredList> {
    const params = new HttpParams()
    .set('currentPage', vehicleFilter.currentPage.toString())
    .set('itemsPerPage', vehicleFilter.itemsPerPage.toString())
    .set('userID', vehicleFilter.userID.toString());
    return this.http.get<FilteredList>(environment.apiURL + 'vehicles', {params: params});
  }

  getVehicleByID(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(environment.apiURL + 'vehicles/' + id);
  }

  updateVehicle(vehicle: Vehicle): Observable<any> {
    const id = vehicle.id;
    return this.http.put(environment.apiURL + 'vehicles/' + id, vehicle, {responseType: 'text'});
  }

  addVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.post(environment.apiURL + 'vehicles', vehicle, {responseType: 'text'});
  }

  deleteVehicle(id: number): Observable<any> {
    return this.http.delete(environment.apiURL + 'vehicles/' + id, {responseType: 'text'});
  }
}
