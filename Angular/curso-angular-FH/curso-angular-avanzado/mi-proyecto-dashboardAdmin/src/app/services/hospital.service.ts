import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { map } from 'rxjs';

interface CargarHospitalesResponse {
  hospitales: Hospital[];
}

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    private http: HttpClient,
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarHospitales( desde: number = 0 ) {

    const url = `${ base_url }/hospitales`;
    return this.http.get<CargarHospitalesResponse>( url, this.headers )
      .pipe(
        map( (resp: CargarHospitalesResponse) => resp.hospitales  )
      );
  }
  
}
