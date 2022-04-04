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

}
