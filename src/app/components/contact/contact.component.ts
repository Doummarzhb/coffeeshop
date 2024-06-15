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
import { AuthDataService } from '../../services/auth-data.service';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  messages: Message[] = [];


    constructor(private fb: FormBuilder, private auth_Data_Service: AuthDataService,private messageService: MessageService) {
      this.contactForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        message: ['', Validators.required]
      });
    }

    ngOnInit(): void {}

    get name() {
      return this.contactForm.get('name');
    }

    get email() {
      return this.contactForm.get('email');
    }

    get message() {
      return this.contactForm.get('message');
    }

    onSubmit() {
      if (this.contactForm.valid) {
        const formData = {
          name: this.contactForm.value.name,
          email: this.contactForm.value.email,
          message: this.contactForm.value.message
        };
        this.auth_Data_Service.submitFeedback(formData);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Reservation successful!' });
        // alert('Message sent successfully!');

        this.contactForm.reset();
      } else {
        Object.keys(this.contactForm.controls).forEach(key => {
          const control = this.contactForm.get(key);
          if (control) {
            control.markAsTouched();
          }
        });
      }
    }
}
