import { Component, OnInit } from '@angular/core';
import { countries } from '../constants/countries.contstant';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  companyLogo:any;
  companyLogoPath:any;
  countryList:any;

  index=0;
  itemQty:Array<any> = [1];
  itemRate:Array<any> = [0];
  itemTotal:Array<any> = [0];


  itemLists:Array<any> = [ {value: 0} ];

  constructor() { }

  ngOnInit(): void {
  }

  uploadLogo(e:any){
    if (e.target.files.length > 0) {
      this.companyLogo = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload= (event:any)=>{
        this.companyLogoPath=event.target.result;
      }
    }
  }

  addLineItem(){
    let len = this.itemLists.length;
    this.itemLists.push({value:len});
  }

  deleteRow(index:any){
    this.itemLists.splice(index,1);
  }

}
