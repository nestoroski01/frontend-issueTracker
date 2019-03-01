import { Component, OnInit } from '@angular/core';
import { User } from '../../user/shared/models/user.class';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;
  isLogged: boolean = false;

  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    this.globalService.getUser().subscribe(user => {
      if(user){
        console.log(user);
        this.user = user;
        this.isLogged = true;
      }
    })
  }

}
