import { Component, OnInit, Input } from '@angular/core';
import { IssueWithDetails } from 'src/app/issue/shared/models/issue.class';
import { Severity } from 'src/app/issue/shared/models/severity.enum';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.css']
})
export class IssueCardComponent implements OnInit {

  @Input() issue: IssueWithDetails;
  severityType = Severity;
  severityColorConditions: any;

  constructor() { }

  ngOnInit() {
    this.severityColorConditions = {
      'low': this.issue.severity == 0,
      'medium': this.issue.severity == 1,
      'high': this.issue.severity == 2,
    }
  }

}
