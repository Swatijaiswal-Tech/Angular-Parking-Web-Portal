import { Component, OnInit } from '@angular/core';
import {FormGroup , FormBuilder  ,  Validators} from '@angular/forms'
import { ActivatedRoute ,Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
public isCarParked = false; // to show add car park form 
public isCheckMoney = false; // used to show calculated total money 
public searchTerm = ''; // used to search data by car number
public recentRemoveSlot = []; // maintain list of all removed slot history
public copyCar = []; // to maintain copy of carDETAILS
public colorList = []; // fetch color from available car 
public availbleSlot = 0; // count availble slot change every modification
public totalMoney = 0; // count money
public parkingFrom: FormGroup; // create reactive form 
public carDetails = [{ // dummy data  of car 
  id: 101,
  carNum: 'KA-64-YX-0619',
  color: 'red',
  slotNum: 1,
  date: Date.now()

},
{
  id: 102,
  carNum: 'KA-64-YX-0620',
  color: 'pink',
  slotNum: 2,
  date: Date.now()

},
{
  id: 103,
  carNum: 'KA-64-YX-0621',
  color: 'black',
  slotNum: 3,
  date: Date.now()

},{
  id: 104,
  carNum: 'KA-64-YX-0622',
  color: 'green',
  slotNum: 4,
  date: Date.now()

},
{
  id: 105,
  carNum: 'KA-64-YX-0623',
  color: 'red',
  slotNum: 5,
  date: Date.now()

}]  
public slot = {
  total: 0,
  parked: 0,
}
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) { 
      this.getParkingPlacesAndParkedValues();
  
  }
 
  ngOnInit(): void {
    this.getParkingPage();
  }
 // get total and available slot from landing page 
  public getParkingPlacesAndParkedValues(): void {
    this.route.queryParams.subscribe(params => {
      this.slot.total = parseInt(params.totalSlot);
      this.slot.parked = parseInt(params.parkedSlot);
    });
    this.availbleSlot = this.slot.total - this.slot.parked;
  }
 // call to initialize page after putting space from landing page
  public getParkingPage(): void {
    this.copyCar = this.carDetails;
    if(this.slot.parked > this.carDetails.length) {
      const car = {
        id: 0,
        carNum: 'KA-64-YX-0619',
        color: 'black',
        slotNum: 0,
        date: 0,
      }
      for(let i= this.carDetails.length ; i< this.slot.parked ; i++) {
        car.id = Math.random();
        car.slotNum = i + 1;
        car.date = Date.now() + i ;
        this.carDetails.push({...car});
      }
    } else if(this.slot.parked < this.carDetails.length) {
        this.carDetails.length = this.slot.parked
    }
    this.colorList = this.carDetails.map((car) => car.color);
    }

  // on click of on park to check slot available 
  public parkaCar(): void {
    if(this.carDetails.length === this.slot.total) {
      return alert('Sorry Slot is already full');
    }
    this.isCarParked = true;
    this.createParkingForm();
  }
  // call when click park a car
  public createParkingForm(): void {
    this.parkingFrom = this.fb.group({
      carNumber: [, ([Validators.required])],
      color: ['', ([Validators.required])],
    })
  }
  // call when saving new park 
  public onSubmit(): void {
    if(this.carDetails.length === this.slot.total) {
      this.router.navigate(['/home']);
      return alert('Sorry we do/nt have parking slot now');
    }
    const car = {
      id: Math.random(),
      carNum: '',
      color: '',
      slotNum: 0,
      date: Date.now()
    }
    car.carNum = this.parkingFrom.value.carNumber;
    car.color = this.parkingFrom.value.color
    this.colorList.push(car.color);
    this.colorList = [... new Set(this.colorList)];
    car.slotNum = this.recentRemoveSlot.length > 0 ? this.recentRemoveSlot[0] : this.carDetails.length + 1;
    this.carDetails.push({...car});
    this.isCarParked = false;
    this.availbleSlot -= 1;
    this.recentRemoveSlot.splice(0, 1);
    this.copyCar = this.carDetails;
  }
  // call when click on remove button 
  public releaseCarSlot(i: number): void {
    this.recentRemoveSlot.push(this.carDetails[i].slotNum);
    this.carDetails.splice(i,1);
    this.totalMoney += 20;
    this.availbleSlot += 1;
    this.recentRemoveSlot =  this.recentRemoveSlot.sort((a,b) => a - b);
  }

 // call when select drop down value of color
  public filerByColor(event: any): void {
    this.carDetails = this.copyCar;
    let flterValue = event.target.value;
    if(flterValue !== '') {
    const filterArray = this.carDetails.filter((car) => car.color === flterValue);
    this.carDetails = filterArray;
    }
  }

  //when click reset button reset all search and return previous array value
  public resetSearch(): void  {
   this.carDetails = this.copyCar;
   this.searchTerm = '';
  }

  // call when click on search button result will filter by car number
  public searchByCarNumber(): void {
  this.carDetails =  this.copyCar.filter((car) => car.carNum === this.searchTerm);
  }

  // call when click on query data button to show total money
  public checkMoney(): void {
    this.isCheckMoney = !this.isCheckMoney;
    this.searchTerm = '';
    
  }
}  
