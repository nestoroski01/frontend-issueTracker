import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IssueService } from '../shared/services/issue.service';
import { Issue, IssueWithDetails } from '../shared/models/issue.class';
import { Severity } from '../shared/models/severity.enum';
import { Status } from '../shared/models/status.enum';
import { UserService } from '../../user/shared/services/user.service';
import { User } from '../../user/shared/models/user.class';
import { GlobalService } from '../../shared/services/global.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;
  updating: boolean = false;
  updatingIssue: IssueWithDetails;
  severityType = Severity;
  statusType = Status;
  allUsers: User[];
  loggedUser: User;
  constructor(private formBuilder: FormBuilder, private router: Router, private issueService: IssueService, private route: ActivatedRoute,
  private userService: UserService, private globalService: GlobalService) { }

  ngOnInit() {
    this.initializeCreateForm();
    this.getAllUsers();
    this.globalService.getUser().subscribe(user => {
      this.loggedUser = user;
    });
    this.checkUrlForUpdating();
    if (this.updating) {
      this.getIssueById();
    }
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.allUsers = users;
    })
  }

  checkUrlForUpdating() {
    let url = this.router.url.split('/')
    if (url[1] == 'update')
      this.updating = true;
  }

  initializeUpdateForm(): void {
    this.createForm.get('title').setValue(this.updatingIssue.title);
    this.createForm.get('responsible').setValue(this.updatingIssue.responsible);
    this.createForm.get('severity').setValue(this.updatingIssue.severity);
    this.createForm.get('status').setValue(this.updatingIssue.status);
  }

  initializeCreateForm(): void {
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      responsible: ['', Validators.required],
      severity: '',
      status: ''
    });
  }

  addIssue() {
    let issue = this.getFormData();
    this.issueService.addIssue(issue).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }

  updateIssue() {
    let issue = this.getFormData();

    this.issueService.updateIssue(issue).subscribe(() => {
      this.router.navigate(['/list']);
    })
  }

  getIssueById() {
    this.issueService.getIssueWithDetailsById(this.route.snapshot.params['id']).subscribe((issue: IssueWithDetails) => {
      this.updatingIssue = issue[0];
      this.initializeUpdateForm();
    })
  }

  getFormData() {
    let formData = {
      title: this.createForm.get('title').value,
      responsible: this.createForm.get('responsible').value,
      severity: this.createForm.get('severity').value,
      reporter: this.loggedUser._id
    }

    if (this.updating) {
      formData['status'] = this.createForm.get('status').value;
      formData['_id'] = this.updatingIssue._id;
    }

    return formData;
  }

}
