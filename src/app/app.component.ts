import { Component } from '@angular/core';

import { LoginService } from './services/login.service';

@Component({
  selector: 'my-app',
  templateUrl: `app/view/layout.html`,
})
export class AppComponent  { 

	public identity;
	public token;

	ngOnInit(){

	}

}
