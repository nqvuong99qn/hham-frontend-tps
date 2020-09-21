import { Component, OnInit } from '@angular/core';
import { Project } from "../_models/Project";
import { AuthService } from '../_services/auth.service';
import { FundService } from '../_services/fund.service';
import { ProjectService } from '../_services/project.service';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: [ './fund.component.css' ]
})
export class FundComponent implements OnInit {
  projects: Project[];
  funds: any;
  searchResults: Project[];
  searchTerm = '';

  constructor(private projectService: ProjectService,
              public auth: AuthService,
              private fundService: FundService) {
  }

  ngOnInit(): void {
    this.retrieveProjects();
  }
  searchByName(): void {
    if (this.searchTerm === '') {
      this.searchResults = this.projects;
      return;
    }
    this.searchResults = this.projects.filter(project =>
      project.name.indexOf(this.searchTerm) >= 0
    );
    console.log(this.searchResults);
    // This event is used to trigger footer repositioning
    document.body.dispatchEvent(new Event('resize'));
  }

  turnOffFiltering(): void {
    if (this.searchTerm === '') {
      this.searchResults = this.projects;
    }
  }

  retrieveProjects(): void {
    this.projectService.getAll().subscribe(
      response => {
        this.projects = response.data,
        this.searchResults = this.projects
      });
  }

  retrieveFunds(): void {
    this.fundService.getAllFund().subscribe(
      response => this.projects = response.data,
    );
  }
}
