import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { render } from 'creditcardpayments/creditCardPayments';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {



     render(
      {
        id: '#myPaypal',
        currency: 'USD',
        value: '30.00',
        onApprove: (details) => {
          localStorage.payer_email = details.payer.email_address
          localStorage.payer_id = details.payer.payer_id
          localStorage.amount_paid = details.purchase_units[0].amount.value
          localStorage.owner_email = details.purchase_units[0].payee.email_address
          localStorage.pay_status = details.status
          localStorage.expire_date = details.update_time
          this.router.navigateByUrl('/auth/register')
        }
      }
    )
  }
}
