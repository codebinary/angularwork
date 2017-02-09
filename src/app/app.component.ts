import { Component } from '@angular/core';

import { LoginService } from './services/login.service';

@Component({
  selector: 'my-app',
  templateUrl: `app/view/layout.html`,
  providers: [LoginService]
})
export class AppComponent  { 

	public identity;
	public token;

	constructor(private loginService: LoginService){

	}

	ngOnInit(){
		this.identity = this.loginService.getIdentity();
		this.token = this.loginService.getToken();
		console.log(this.identity);
	}

}
