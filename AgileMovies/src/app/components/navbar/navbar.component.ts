import { Component, Input } from '@angular/core';
import { User } from '../../models/auth/user';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  user!: User;

  public nombreCompleto!: string 

  constructor(private authService: AuthService) { }

  ngOnInit() {
    //debugger;
    this.authService.me();
    let dataUser = this.authService.getUser();
    this.user = JSON.parse(dataUser);

    this.nombreCompleto = this.user.firstName + " " + this.user.lastName;
  }

  logout(){
    this.authService.logout();
  }
}
