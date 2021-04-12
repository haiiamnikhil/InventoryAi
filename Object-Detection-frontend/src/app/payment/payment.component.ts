import { ApiService } from 'src/app/services/api.service';
import { professional, premium } from './../state/payment.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { basic } from '../state/payment.actions';
import { WindowRefService } from '../window-ref.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  selectedPackage: string
  amount: any

  constructor(private store: Store<{userPackage:{package: string, amount: any}}>, private service: ApiService,
    private winRef:WindowRefService
    ) { }

  ngOnInit() {
    let oldState = sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : null
    this.store.select('userPackage').subscribe(data => {
      sessionStorage.setItem('state',JSON.stringify(data))
      if (data.package == oldState.package) {
        this.selectedPackage = oldState.package
        this.amount = oldState.amount
      }
      else{
        this.selectedPackage = data.package
        this.amount = data.amount
      }
    });
   // console.log(this.selectedPackage, this.amount)

  }

  changePackage(changedPackage: string){
    if (changedPackage == 'basic'){
      this.store.dispatch(basic())
    }
    else if (changedPackage == 'premium'){
      this.store.dispatch(premium())
    }
    else if (changedPackage == 'professional'){
      this.store.dispatch(professional())
    }
  }
  pay(){
    let data = {
      key:"rzp_test_yYjR1Ke61gVKzM",
      amount:this.amount*100,
      currency : 'INR',
      name : this.selectedPackage,
      description:'This is a text description',
      order_id:'8asd0198',
      modal:{escape:false},
      theme:{color:"#F37254"}
    }
    this.service.razorPay(data).subscribe(response=>console.log(response))
  }
}
