import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  messageForm = this.fb.group({
    message: ['', Validators.required]
  });
  loginForm = this.fb.group({
    user: ['', Validators.required],
    password: ['', Validators.required]
  });
  display: boolean;
  
  constructor(private fb: FormBuilder, private notification: MessageService) { }

  onSubmit() {
    this.notification.send(this.messageForm.getRawValue().message);
  }

  logIn() {
    this.display = false;
    console.log(this.loginForm.getRawValue());
  }
  
  ngOnInit() {
    this.notification.connect();
    this.display = true;
  }
}
