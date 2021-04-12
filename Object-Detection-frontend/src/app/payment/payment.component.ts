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
    let options:any = {
      "key": "rzp_test_yYjR1Ke61gVKzM",
      "amount": this.amount*100,
      "name": this.selectedPackage,
      "description": "dummy data",
      "image": "./assets/images/logo.png",
      "modal": {
        "escape": false
      }, 
      "theme": {
        "color": "#0069d9"
      }
    };
  let rzp = new this.winRef.nativeWindow.Razorpay(options);
  rzp.open();
    // this.service.razorPay(data).subscribe(data => console.log(data));
  }

}
