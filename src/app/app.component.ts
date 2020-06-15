import { mimeType } from './mime-type.validator';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  imagePreview = 'https://bulma.io/images/placeholders/256x256.png';
  myForm: FormGroup;

  constructor() {
    this.myForm = new FormGroup({
      image: new FormControl('', [Validators.required], [mimeType]),
    });
  }

  ngOnInit(): void {}

  Submit() {
    if (this.myForm.invalid) {
      console.log('Form is invalid');
      return;
    }
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.myForm.patchValue({ image: file });
    this.myForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
