// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-contact',
//   standalone: true,
//   imports: [],
//   templateUrl: './contact.component.html',
//   styleUrl: './contact.component.css'
// })
// export class ContactComponent {

// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  ngOnInit(): void {

  }
  contactForm: FormGroup;

  constructor(private fb: FormBuilder  ) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      console.log('Form Data:', formData);
      alert('Message sent successfully!');
        // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });

    }
  }
}
