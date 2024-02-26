let imguser = sessionStorage.getItem('imguser');
let nameuser = sessionStorage.getItem('nameuser');
let iduser = sessionStorage.getItem('iduser');
let modificar =  sessionStorage.getItem("idarticulo");
let f = document.forms[0];
let perror = document.getElementById("mostrarError");

window.addEventListener('load', function (params) {
    if(nameuser == null){
        Swal.fire({
            title:"error",
            icon:"error",
            text: "necesitas tener cuenta para utilizar esta pagina"
        }).then(() => {

            location.href = "index.html";

        });
    }else{
        let logout = this.document.querySelector('a#logout');
        let imgp = crearElemento('img', logout);
        imgp.src = "socios/"+imguser;
        logout.innerHTML +="   " + nameuser ;
        logout.addEventListener("click", function(){
            sessionStorage.clear();
            window.location = "index.html";
        })
        let t = new FormData();
        t.append('opcion', 'TC');
        realizarPeticion(t, cargarcategorias)
        if (modificar != null) {
            let formdata = new FormData();
            formdata.append('opcion', "AC");
            formdata.append('idarticulo', modificar);
            realizarPeticion(formdata, modificararticulo)
        }
    }

});
document.querySelector("p#vendedor").textContent = nameuser;


document.getElementById("img").addEventListener('change', function (evento) {
 let archivo = this.files[0];
 if (archivo.type.match('image.*')) {
    let tmpPATH = URL.createObjectURL(archivo);

    document.getElementById('articulo').setAttribute('src', tmpPATH);

 } else {
     alert("no es una imagen");
 }
 });


function cargarcategorias(datos) {
    let categorias = JSON.parse(datos);
    let select = f.categorias;
    for (let index = 0; index < categorias.length; index++) {
        let option = crearElementoTexto(categorias[index].nombre , "option", select);
        option.setAttribute("value" , categorias[index].id );

    }
    
}


function crearElementoTexto(texto , tipo , padre ){
    let elemento = document.createElement(tipo);
    elemento.textContent = texto;
    padre.appendChild(elemento);
    return elemento;
}

function crearElemento(tipo , padre ){
    let elemento = document.createElement(tipo);
    padre.appendChild(elemento);
    return elemento;
}

function realizarPeticion(formdata, callback){
 fetch("./php/coop24.php", {
        method: "POST",
        body: formdata
    }).then((res) => res.text()).then((data) => {
        callback(data);
    }).catch((error) => {
        console.log(error);
    });
}




function validarCampos(params) {
    let option = params.getAttribute("id");
    let valor = params.value;
    switch (option) {
    case 'categorias':
    if(valor == -1 ){
        perror.setAttribute('style', 'display: block; color: red;');
        perror.textContent = "tienes que selecionar una categoria";
        return false;
    }
    perror.setAttribute('style', 'display: none; color: red;');
    return true;
    break;

        case 'nombreArticulo':
        let nomestruc = /^[a-z0-9A-ZáéíóúüñÁÉÍÓÚÜÑ\s']+$/;
        if(valor === ""){
            perror.setAttribute('style', 'display: block; color: red;');
            perror.textContent = "El nombre no puede estar vacio";
          
            return false;
        }
        if(valor === undefined ){
            perror.setAttribute('style', 'display: block; color: red;');
            perror.textContent = "El nombre no puede estar vacio";
            return false;
        }
        if (valor.length < 4 ) {
            perror.setAttribute('style', 'display: block; color: red;');
            perror.textContent = "Tu nombre tiene que contener entre 2 y 20 caracteres";
            return false;
        }
        if (valor.length > 30 ) {
            perror.setAttribute('style', 'display: block; color: red;');
            perror.textContent = "Tu nombre tiene que contener entre 4 y 30 caracteres";
            return false;
        }
        if (!nomestruc.test(valor)) {
            perror.setAttribute('style', 'display: block; color: red;');
            perror.textContent = "Tu nombre no valido";
            f.nombre.value = "" ;
            return false;
        }
        perror.setAttribute('style', 'display: none; color: red;');
        return true;
        break;

        case "precio":
            let precioestr = /^[0-9]*.[0-9]{2}$/
            if(valor === ""){
                perror.setAttribute('style', 'display: block; color: red;');
                perror.textContent = "El precio no puede estar vacio";
              
                return false;
            }
            if(valor === undefined ){
                perror.setAttribute('style', 'display: block; color: red;');
                perror.textContent = "El precio no puede estar vacio";
                return false;
            }
            if(!precioestr.test(valor) ){
                perror.setAttribute('style', 'display: block; color: red;');
                perror.textContent = "El precio debe separarse con un punto";
                return false;
            }
    
            perror.setAttribute('style', 'display: none; color: red;');
            return true;
            break;

            case "descripcion":
                if(valor === ""){
                    perror.setAttribute('style', 'display: block; color: red;');
                    perror.textContent = "la descripcion no puede estar vacio";
                  
                    return false;
                }
                if(valor === undefined ){
                    perror.setAttribute('style', 'display: block; color: red;');
                    perror.textContent = "la descripcion no puede estar vacio";
                    return false;
                }
                
                if (valor.length > 255 ) {
                    perror.setAttribute('style', 'display: block; color: red;');
                    perror.textContent = "Tu nombre tiene que contener menos 255 caracteres";
                    return false;
                }
                perror.setAttribute('style', 'display: none; color: red;');
                return true;
                break;
        default:
            break;

    }

}


function modificararticulo(datos) {
    let arti = JSON.parse(datos);
    console.log(arti[0])
    f.categorias.value = arti[0].categoria
    document.getElementById("img").src = "archivos/"+arti[0].imagen;
    f.foto.disabled = true;

    f.nombreArticulo.value = arti[0].nombre
    f.precio.value = arti[0].precio
    f.descripcion.value = arti[0].descripcion
}



document.querySelector("input#upload").addEventListener('click', function(e){
   e.preventDefault()
    if(validarCampos(f.categorias)){
        if (validarCampos(f.nombreArticulo)) {
            if (validarCampos(f.precio)) {
                if (validarCampos(f.descripcion)) {
                    let formdata = new FormData();
                    if (modificar != null) {
                        formdata.append('opcion', "MA");
                        formdata.append('idarticulo', modificar);
                        formdata.append('categoria' , f.categorias.value);
                        formdata.append('nombre' , f.nombreArticulo.value);
                        formdata.append('precio' , f.precio.value);
                        formdata.append('imagen', f.foto.files[0]);
                        sessionStorage.removeItem("idarticulo")
                    }else{
                        formdata.append('opcion', 'RA');
                        formdata.append('categoria' , f.categorias.value);
                        formdata.append('nombre' , f.nombreArticulo.value);
                        formdata.append('precio' , f.precio.value);
                        if(f.foto.files.length == 0){
                            formdata.append('imagen', 'null')
                        }else{
                            formdata.append('imagen', f.foto.files[0]);
                        }
                        formdata.append('descripcion' , f.descripcion.value);
                        formdata.append('vendedor' , iduser);   
                    }
                    realizarPeticion(formdata, subirArticulo);
                }
            }
        }
    }
});

function subirArticulo(datos) {
    if(datos.includes("ok")){
        Swal.fire({
            title:"registro completo",
            icon:"success",
            text: "se ha modificado o subido un articulo",
        }).then(() => {
            window.location.href ="tienda.html";
            });
    }else{
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "ha ocurrido un error no se ha podido cargar el articulo",
        }).then(() => {
            window.location.href ="tienda.html";
        });
    }
   
}