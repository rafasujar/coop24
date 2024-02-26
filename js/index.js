
let inicio = document.querySelector("div#inicio");
let registro = document.querySelector("div#registrar");
let login = document.querySelector("div#login");

window.addEventListener('load', function(e){
    registro.style.display = "none";
    login.style.display =  "none";
    inicio.style.display = "block";

});


document.querySelector('a#inicio').addEventListener('click', function (e) {
    registro.style.display = "none";
    login.style.display =  "none";
    inicio.style.display = "block";
    document.title = "inicio";
});
document.querySelector('a#registrarse').addEventListener('click', function (e) {
    registro.style.display = "block";
    login.style.display =  "none";
    inicio.style.display = "none";
    document.title = "registro";
});
document.querySelector('a#log').addEventListener('click', function (e) {
    registro.style.display = "none";
    login.style.display =  "block";
    inicio.style.display = "none";
    document.title = "login";
});

document.querySelector('input#mostrar1').addEventListener('change', function (e) {
    if (this.checked === true ) {
        
        formregistro.password.setAttribute('type', 'text');
        formregistro.repassword.setAttribute('type', 'text');
    }else{
        document.querySelector('input#password').setAttribute('type', 'password');
        document.querySelector('input#repassword').setAttribute('type', 'password')
    }
});


document.querySelector('input#mostrar2').addEventListener('change', function (e) {
    if (this.checked === true ) {
        formlogin.password.setAttribute('type', 'text');
    }else{
        formlogin.password.setAttribute('type', 'password');   
    }
});




let formregistro  = document.forms[0]; 
let formlogin = document.forms[1];

document.querySelector('input#registrar').addEventListener('click', function (e) {
    e.preventDefault();
if (validarCampos(formregistro.nombre)) {
    if (validarCampos(formregistro.apellidos)) {
        if (validarCampos(formregistro.mail)) {
            if (validarCampos(formregistro.password)) {
                if (validarCampos(formregistro.repassword)) {
                    let formdata = new FormData();
                    formdata.append('opcion', 'RS');
                    formdata.append('nombre', formregistro.nombre.value);
                    formdata.append('apellidos', formregistro.apellidos.value);
                    formdata.append('email',formregistro.mail.value);

                    if(formregistro.foto.files.length == 0){
                        formdata.append('foto', 'null')
                    }else{
                        formdata.append('foto', formregistro.foto.files[0]);
                    }
                    formdata.append('password', formregistro.password.value);
                    realizarPeticion(formdata, resultadoregistro );
                }
            }
        }
    }
}
});

document.querySelector("input#foto").addEventListener('change', function (evento) {
    let archivo = this.files[0];
    if (archivo.type.match('image.*')) {
       let tmpPATH = URL.createObjectURL(archivo);
       document.querySelector('img').setAttribute('src', tmpPATH);
    } else {
        Swal.fire({
            title: 'error',
            text: 'error el archivo introducido no es una imagen',
            icon: 'error',
            showConfirmButton: true,
            confirmButtonText: 'aceptar'
        });
    }
    });


function validarCampos(params) {
    let diverror = document.querySelector("div#errores")
    let perror = document.createElement('p');
    diverror.append(perror)
    let option = params.getAttribute('id');
    let valor = params.value;
    switch (option) {
        case 'nombre':
            let nomestruc = /^[a-z0-9A-ZÃ¡Ã©Ã­Ã³ÃºÃ¼Ã±ÃÃ‰ÃÃ“ÃšÃœÃ‘\s']+$/;
            if(valor === ""){
                diverror.style.display = "block";
                perror.textContent = "El nombre no puede estar vacio";
            
                return false;
            }
            if(valor === undefined ){
                diverror.style.display = "block";
                perror.textContent = "El nombre no puede estar vacio";
                return false;
            }
            if (valor.length < 2 ) {
                diverror.style.display = "block";
                perror.textContent = "Tu nombre tiene que contener entre 2 y 20 caracteres";
                return false;
            }
            if (valor.length > 20 ) {
                diverror.style.display = "block";
                perror.textContent = "Tu nombre tiene que contener entre 2 y 20 caracteres";
                return false;
            }

            if (!nomestruc.test(valor)) {
                diverror.style.display = "block";
                perror.textContent = "Tu nombre no valido";
                params.value = "" ;
                return false;
            }


            diverror.style.display = "none";  diverror.innerHTML = "";
                
        break;
    
        case 'apellidos':
            let apeestruc = /^[a-z0-9A-ZÃ¡Ã©Ã­Ã³ÃºÃ¼Ã±ÃÃ‰ÃÃ“ÃšÃœÃ‘\s']+$/;
            if(valor === ""){
                diverror.style.display = "block";
                perror.textContent = "El apellido no puede estar vacio";
                return false;
                }
            if(valor === undefined ){
                diverror.style.display = "block";
                perror.textContent = "El apellido no puede estar vacio";
                return false;
            }
            if (valor.length < 2 ) {
                diverror.style.display = "block";
                perror.textContent = "Tu Apellido tiene que contener entre 2 y 30 caracteres";
                return false;
            }

            if (valor.length > 30 ) {
                diverror.style.display = "block";
                perror.textContent = "Tu Apellido tiene que contener entre 2 y 30 caracteres";
                return false;
            }
    
            if (!apeestruc.test(valor)) {
                diverror.style.display = "block";
                perror.textContent = "Tu nombre no valido";
                return false;
            }
            diverror.style.display = "none";  diverror.innerHTML = "";
        break;
        
        case 'mail':
            let estructuramail = /^[a-zA-Z0-9._%+-Ã¡Ã©Ã­Ã³ÃºÃ¼Ã±ÃÃ‰ÃÃ“ÃšÃœÃ‘]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;       
            if(valor === ""){
                diverror.style.display = "block";
                perror.textContent = "El email no puede estar vacio";
                return false;
            }

            if(valor === undefined ){
                diverror.style.display = "block";
                perror.textContent = "El email no puede estar vacio";
                return false;
            }

            if(!estructuramail.test(valor)){
                diverror.style.display = "block";
                perror.textContent = "El email no cumple la estructura aducuada, ejemplo: rafa@dominio.com";
                params.value = "";           
                return false;
            }
            diverror.style.display = "none";  diverror.innerHTML = "";
            break;



        case 'password':
            let estructuracontra = /([a-zA-Z]+).*(\d+)/; 

            if(valor === ""){
                diverror.style.display = "block";
                perror.textContent = "La contraseÃ±a no puede estar vacia";
                return false;
            }

            if(valor === undefined ){
                diverror.style.display = "block";
                perror.textContent = "La contraseÃ±a no puede estar vacia";
                return false;
            }
            
            if(!estructuracontra.test(valor)){
                diverror.style.display = "block";
                perror.textContent = "La contraseÃ±a no cumple el patron indicado, es necesario debe contener una letra y un numero";
                return false;
            }

            if (valor.length < 5  ) {
                diverror.style.display = "block";
                perror.textContent = "La contraseÃ±a tiene que contener entre 5 y 10 caracteres";
                params.value = "" ;
                return false;
            }

            if (valor.length > 10 ) {
                diverror.style.display = "block";
                perror.textContent = "La contraseÃ±a tiene que contener entre 5 y 10 caracteres";
               params.value = "" ;
                return false;
            }
            diverror.style.display = "none";  diverror.innerHTML = "";
            break;

            case 'repassword':
                let passwd = formregistro.password.value;
                if(valor === ""){
                    diverror.style.display = "block";
                    perror.textContent = "campo vacio";
                    return false;
                }
                if(valor === undefined ){
                    diverror.style.display = "block";
                    perror.textContent = "La contraseÃ±a no puede estar vacia";
                    return false;
                }
                
                if(valor != passwd){
                    diverror.style.display = "block";
                perror.textContent = " la contraseÃ±a no concide";
                params.value = "";
                return false;
            }
            diverror.style.display = "none";  diverror.innerHTML = "";
            break;
        default:
            break;
    }

    return true;
}


function realizarPeticion(formdata, callback){
let url  = "./php/coop24.php";
fetch(url, {
    method: 'POST',
    body: formdata
}).then(response => response.text())
.then(data => {
    console.log(data);
    callback(data);
}).catch(error => console.log(error));
}


function resultadoregistro(datos) {
    if(datos.includes('ok')){
        Swal.fire({
            title:"registro completo",
            icon:"success",
            text: "se ha completado tu registro",
            showConfirmButton: true
        })
    }else{
        Swal.fire({
            title:"error en el registro ",
            icon:"error",
            text: "es posible que ya estes registrado con esa cuenta",
            showConfirmButton: true
        })
    }
    formlogin.mail.value = formregistro.mail.value;
    document.querySelector('a#log').click();
    
}


document.querySelector('input#init').addEventListener('click', function (e) {
    e.preventDefault();

        if (validarCampos(formlogin.mail)) {
            if (validarCampos(formlogin.password)) {             
                    let formdata2 = new FormData();
                    formdata2.append('opcion', 'SR');
                    formdata2.append('email',formlogin.mail.value);
                    formdata2.append('password', formlogin.password.value);
                    realizarPeticion(formdata2, resultadoLogin );   
            }
        }
});

function resultadoLogin(datos) {
    if(!datos.includes('error') ){
        let usuario = JSON.parse(datos);
        Swal.fire({
            title:"has iniciado sesion correctamente",
            icon:"success",
            text: "bienvenido "+usuario[0].nombre,
            showConfirmButton: true
        }).then(() => {
        sessionStorage.setItem('imguser', usuario[0].foto);
        sessionStorage.setItem('nameuser', usuario[0].nombre);
        sessionStorage.setItem('iduser', usuario[0].id);
        window.location.href  = "tienda.html";
        });
    }else{
        Swal.fire({
            title:"error al inicar sesion ",
            icon:"error",
            text: "es posible que no exista cuenta con ese correo",
            showConfirmButton: true
        }).then(() => {
            formregistro.mail.value = formlogin.mail.value;
            document.querySelector('a#registrarse').click();
        })
  
    }
 
    
}