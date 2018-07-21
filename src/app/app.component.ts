import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from './auth.service';
import { MessageService } from './message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  messageForm = this.fb.group({
    message: ['Hello world!', Validators.required]
  });
  loginForm = this.fb.group({
    username: ['alice', Validators.required],
    password: ['password', Validators.required]
  });
  display: boolean;
  loginSubscription: Subscription;
  
  constructor(private fb: FormBuilder, private notification: MessageService, private auth: AuthService) { }

  onSubmit() {
    this.notification.send(this.messageForm.getRawValue().message);
  }

  logIn() {
    const value = this.loginForm.getRawValue();

    if (!!this.loginSubscription)
    {
      this.loginSubscription.unsubscribe();
    }

    this.loginSubscription = this.auth.login(value.username, value.password)
      .subscribe(token => {
        this.notification.connect(token);
        this.display = false;
      });
  }
  
  ngOnInit() {
    this.display = true;
  }
}
