import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IssueWithDetails } from '../../shared/models/issue.class';
import { IssueService } from '../../shared/services/issue.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Status } from '../../shared/models/status.enum';

interface IGroupIssues {
  '0': Array<IssueWithDetails>;
  '1': Array<IssueWithDetails>;
  '2': Array<IssueWithDetails>;
}

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {
  @Input() issuesData: Array<IssueWithDetails>;

  openIssues: Array<IssueWithDetails> = [];
  inProgressIssues: Array<IssueWithDetails> = [];
  closedIssues: Array<IssueWithDetails> = [];

  groupIssues: IGroupIssues;

  constructor(private issueService: IssueService) { }

  ngOnInit() {
    this.splitIssuesInGroups()
  }

  splitIssuesInGroups() {
    this.groupIssues = {
      '0': this.issuesData.filter((issue) => issue.status.toString() === '0'),
      '1': this.issuesData.filter((issue) => issue.status.toString() === '1'),
      '2': this.issuesData.filter((issue) => issue.status.toString() === '2'),
    }
  }

  updateIssueStatus(issue: IssueWithDetails, event: CdkDragDrop<string[]>) {
    // '+' before a string parses the variable to number!
    issue.status = +this.findNewIssueContainer(event);
    this.issueService.updateIssue(issue).subscribe(issue => {
      console.log('Issue updated succesfully!');
    })
  }

  findNewIssueContainer(event: CdkDragDrop<string[]>): string {
    // returns the name (key) of the new group of the issue
    let objectKeys: Array<string> = Object.keys(this.groupIssues);

    return objectKeys.find((key) => this.groupIssues[key] == event.container.data);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.updateIssueStatus(<any>event.container.data[event.currentIndex], event)
    }
  }

}