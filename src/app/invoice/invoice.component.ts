import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { countries } from '../constants/countries.contstant';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  companyLogo: any;
  companyLogoPath: any;
  countryList: any;

  invoiceInfoForm!: FormGroup;
  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.invoiceInfoForm = this._fb.group({
      items: this._fb.array([
        {
          itemDescription: ['', Validators.required],
          qty: ['1', Validators.required],
          rate: ['', Validators.required],
        }
      ]),
    });
  }

  get items() {
    return this.invoiceInfoForm.controls["items"] as FormArray;
  }

  uploadLogo(e: any) {
    if (e.target.files.length > 0) {
      this.companyLogo = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.companyLogoPath = event.target.result;
      }
    }
  }

  addLineItem() {
    const itemLists = this.invoiceInfoForm.get('items') as FormArray;
    itemLists.push(this._fb.group({
      itemDescription: ['', Validators.required],
      qty: ['1', Validators.required],
      rate: ['', Validators.required],
    }));

  }

  deleteRow(index: any) {
    this.items.removeAt(index);
  }

}
