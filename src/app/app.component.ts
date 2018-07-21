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
  
  constructor(private fb: FormBuilder, private notification: MessageService) { }

  onSubmit() {
    this.notification.send(this.messageForm.getRawValue().message);
  }
  
  ngOnInit() {
    this.notification.connect();
  }
}
