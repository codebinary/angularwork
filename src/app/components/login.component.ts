import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

//Importamos los services
import { LoginService } from '../services/login.service';



@Component({
  selector: 'login',
  templateUrl: `app/view/login.html`,
  providers: [ LoginService ]
})
export class LoginComponent implements OnInit {

	public titulo: string = "Identificate";

	public errorMessage;
	//Aqui guardaremos los datos del usuario
	public user;

	public token;
	public identity;

	//Para cargar el servicio dentro del component utilizamos el constructor
	constructor(
		private loginService: LoginService,
		private route: ActivatedRoute,
		private router: Router

	){}

	ngOnInit(){
		//alert(this._loginService.signup())
		this.user = {
			"email": "",
			"password": "",
			"gethash": "false"
		};

	}

		onSubmit(){
		console.log(this.user);

		//utilizamos el servicio, utilizamos el método suscribe para recoger la respuesta del servicio
		this.loginService.signup(this.user).subscribe(
				response => {
					let identity = response;
					this.identity = identity;

					if(this.identity.length <= 1){
						alert("Error en el servidor");
					}else{
						if(!this.identity.status){
							localStorage.setItem('identity', JSON.stringify(identity));

							//GET TOKEN
							this.user.gethash = "true";
							this.loginService.signup(this.user).subscribe(
								response => {
									let token = response;
									this.token = token;

									if(this.token.length <= 0){
										alert("Error en el servidor");
									}else{
										if(!this.token.status){
											localStorage.setItem('token', token);

											//REDIRECCIÓN
											window.location.href = "/";
										}
									}
								},
								error => {
									this.errorMessage = <any>error;
									if(this.errorMessage != null) {
										console.log(this.errorMessage);
										alert("Error en la peticion");
									}
								}
							);

						}
					}
				},
				error => {
					this.errorMessage = <any>error;
					if(this.errorMessage != null) {
						console.log(this.errorMessage);
						alert("Error en la peticion");
					}
				}
			)
	}

}