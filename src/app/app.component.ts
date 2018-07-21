import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  messageForm = this.fb.group({
    message: ['', Validators.required]
  });
  
  constructor(private fb: FormBuilder) { }

  onSubmit() {
    console.log(this.messageForm.getRawValue().message);
  }
}
