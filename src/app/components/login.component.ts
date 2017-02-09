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

		//Recogemos el parámetro por url para realizar el logout
		this.route.params.subscribe(
			params => {
				//Con el mas adelante lo convierte en entero
				let logout = +params["id"];
				if(logout == 1){
					localStorage.removeItem('identity');
					localStorage.removeItem('token');
					this.identity = null;
					this.token = null;

					window.location.href = "/login";
					//this.router.navigate(["/index"]);
				}
			}
		);
		//alert(this._loginService.signup())
		this.user = {
			"email": "",
			"password": "",
			"gethash": "false"
		};

		let identity = this.loginService.getIdentity();
		let token = this.loginService.getToken();


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
									console.log(response);
									this.token = token;

									if(this.token.length <= 0){
										alert("Error en el servidor");
									}else{
										if(!this.token.status){
											localStorage.setItem('token', token);

											//REDIRECCIÓN
											//window.location.href = "/";
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
