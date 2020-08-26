import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public slot = {
    total: null,
    parked:null,
  };
  
  constructor( private router: Router) { }

  ngOnInit(): void {}

  onSubmit(): void {
    if(this.slot.total < this.slot.parked) {
      return alert('You have enter beyond limit parking');
    } else {
      this.router.navigate(['/dashboard'], { queryParams: 
        { totalSlot: this.slot.total , 
          parkedSlot: this.slot.parked}
      });
    }
   
  }

  
}
