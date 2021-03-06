import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JobTitle } from "../_models/JobTitle";
import { JobTitleService } from '../_services/job-title.service';
import { DataValidatorService } from "../_services/data-validator.service";

@Component({
  selector: 'app-add-job-title',
  templateUrl: './add-job-title.component.html',
  styleUrls: [ './add-job-title.component.css' ]
})
export class AddJobTitleComponent implements OnInit {
  jobTitle: JobTitle = {
    name: null,
    monthlyAmount: null,
  };
  errorMessage = '';
  touched = { name: false, amount: false };

  constructor(private jobTitleService: JobTitleService,
              private router: Router,
              private validate: DataValidatorService) {
  }

  ngOnInit(): void {
  }

  create(): void {
    this.touched = { amount: true, name: true };
    if (!this.isValidName() || !this.isValidAmount()) {
      return;
    }
    this.jobTitleService.create(this.jobTitle).subscribe(
      response => {
        // TODO: Add flash message to notify about successful operation
        this.router.navigate([ '/jobs' ]);
      },
      errorResponse => this.errorMessage = errorResponse.error.message
    );
  }

  reset(): void {
    this.errorMessage = '';
    this.touched = { name: false, amount: false };
    this.jobTitle = { name: null, monthlyAmount: null };
  }



  isValidName(): boolean {
    return this.jobTitle.name.length > 0;
  }

  keyPressOnAmount(event: KeyboardEvent): void {
    this.validate.numberKeyPress(event, this.jobTitle.monthlyAmount?.toString());
  }

  isValidAmount(): boolean {
    var amount = this.jobTitle.monthlyAmount;
    if(amount % 1000 != 0){
      return false;
    }
    return this.validate.nonNegative(this.jobTitle.monthlyAmount);
  }
}
