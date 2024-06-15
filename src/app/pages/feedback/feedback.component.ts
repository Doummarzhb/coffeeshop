import { Component, OnInit } from '@angular/core';
import { AuthDataService } from '../../services/auth-data.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent implements OnInit {
  feedbackList: any[] = [];

  constructor(private auth_Data_Service: AuthDataService) { }



  ngOnInit(): void {
    this.loadFeedback();
  }

  loadFeedback() {
    this.feedbackList = this.auth_Data_Service.getFeedback();
  }
}
