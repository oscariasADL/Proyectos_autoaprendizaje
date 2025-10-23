import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { 
    //console.log("Servicio de sidebar listo");
  }

  menu: any[] = [
    {
      title: 'Dashboard!!!',
      icon: 'mdi mdi-gauge',
      submenu: [
        { 
          title: 'Home', 
          url: '/' 
        },
        { 
          title: 'ProgressBar', 
          url: 'progress' 
        },
        { 
          title: 'Graficas', 
          url: 'graficas' 
        },
        { 
          title: 'Promesas', 
          url: 'promesas' 
        },
        { 
          title: 'RXJS', 
          url: 'rxjs' 
        }
      ]
    }
  ];

  
}
