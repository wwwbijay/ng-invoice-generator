import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { countries } from '../constants/countries.contstant';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  companyLogo: any;
  companyLogoPath: any;
  countryList: any;

  subscription: any;

  invoiceInfoForm!: FormGroup;
  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.formInitialize();
  }

  get items() {
    return this.invoiceInfoForm.controls['items'] as FormArray;
  }

  formInitialize() {
    this.invoiceInfoForm = this._fb.group({
      items: this._fb.array([
        this._fb.group({
          itemDescription: this._fb.control(null),
          qty: this._fb.control(1),
          rate: this._fb.control(1),
          amount: this._fb.control(1),
        }),
      ]),
    });

    // this.invoiceInfoForm.controls['items'].setValue([]);
  }

  uploadLogo(e: any) {
    if (e.target.files.length > 0) {
      this.companyLogo = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.companyLogoPath = event.target.result;
      };
    }
  }

  addLineItem() {
    const itemLists = this.invoiceInfoForm.get('items') as FormArray;
    itemLists.push(
      this._fb.group({
        itemDescription: ['', Validators.required],
        qty: ['1', Validators.required],
        rate: ['1', Validators.required],
        amount: ['1', Validators.required],
      })
    );
  }

  deleteLineItem(index: any) {
    this.items.removeAt(index);
  }

  updateAmount(index: any) {
    let qty = 0;
    let rate = 0;
    let allItems = this.invoiceInfoForm.controls['items'] as FormArray;
    let formGroup = allItems.at(index) as FormGroup;

    qty = formGroup.get('qty')?.value;
    rate = formGroup.get('rate')?.value;
    formGroup.get('amount')?.patchValue(qty * rate)
    //formGroup.get('amount').patchValue(111);
  }
}
