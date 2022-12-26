import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jsPDF } from 'jspdf';

declare var require: any;

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  companyLogo: any;
  companyLogoPath: any;
  countryList: any;
  subTotal:any;
  total:any;
  discount = 0;
  salesTax = 13;
  invoiceDate:any;
  dueDate:any;

  @ViewChild('pdfTable')
  pdfTable!: ElementRef;

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
          rate: this._fb.control(0),
          amount: this._fb.control(0),
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
    var sum = 0;
    let allItems = this.invoiceInfoForm.controls['items'] as FormArray;
    let formGroup = allItems.at(index) as FormGroup;

    qty = formGroup.get('qty')?.value;
    rate = formGroup.get('rate')?.value;
    formGroup.get('amount')?.patchValue(qty * rate)
    //formGroup.get('amount').patchValue(111);
    
    for (let c of allItems.controls) {
      sum = sum + c.get('amount')?.value;
    }
    this.subTotal = sum;
    this.calcTotal();
    
  }

  calcTotal(){
    let sum = this.subTotal;

    if(!!this.discount){
      sum = (sum - (this.discount * sum)/100).toFixed(2);
    }
    
    if(!!this.salesTax){
      this.total = (sum + (this.salesTax * sum)/100).toFixed(2);
    }else{
      this.total = sum
    }
  }

  // public downloadAsPDF() {
  //   const pdfTable = this.pdfTable.nativeElement;
  //   var html = htmlToPdfmake(pdfTable.innerHTML);
  //   const documentDefinition = { content: html };
  //   pdfMake.createPdf(documentDefinition).download(); 
  // }

  downloadAsPDF(){
    let pdf = new jsPDF('p', 'px', 'tabloid', true);
    pdf.html(this.pdfTable.nativeElement, {
      callback: (pdf) => {
        pdf.save('Invoice.pdf');
      },
    });
  }
}