let imguser = sessionStorage.getItem('imguser');
let nameuser = sessionStorage.getItem('nameuser');
let iduser = sessionStorage.getItem('iduser');
let url = 'php/coop24.php';

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
        let misarticulos = document.querySelector('a#misarticulos');
        misarticulos.addEventListener('click', function (e) {
          window.location.href = "misarticulos.html";
        });
        let miperfil = document.querySelector('a#perfil');
        miperfil.addEventListener('click', function (e) {
          window.location.href = "miperfil.html";
        });
        cargartienda();
    }

});

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

function cargartienda() {
    let param = new FormData();
    param.append("opcion", "AV")
   
    fetch("./php/coop24.php", {
        method: "POST",
        body: param
    }).then((res) => res.json()).then((data) => {
        let articulos = data.filter((articulo) => articulo.vendedor != iduser);
        let paginas = Math.ceil(articulos.length / 9);
        mostrarArticulos(articulos, paginas);
    });
}

function mostrarArticulos(articulos, paginas) {
let tienda = document.querySelector('form#tienda');
let divtienda = crearElemento('div', tienda);
divtienda.style =  "   display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center;";
paginaciondearticulos(divtienda, 0 , articulos);
for (let index = 0; index < paginas; index++) {
    let pagina = crearElementoTexto(index+1, 'button', tienda);
    pagina.style = "color: black;"
    pagina.addEventListener('click', function (e) {
        e.preventDefault();
        let inicio = 9 * index;
        paginaciondearticulos(divtienda, inicio , articulos);
    });
}    
}

function paginaciondearticulos(tienda, nums, articulos) {
    tienda.innerHTML = " "
    for (let index = nums; index < (nums+9); index++) {
        if (articulos[index].vendedor != iduser){
        let div = crearElemento("div" , tienda);
        div.style = "border: 1px solid white; text-align: center; widith: 300px;  height: 300px;"
        let img = crearElemento("img", div);
        img.setAttribute("src", "archivos/"+articulos[index].imagen);
        img.setAttribute("style", "  object-fit: cover; width: 100px; border-radius: 0px;");
        crearElementoTexto(articulos[index].nombre, "h3", div);
        crearElementoTexto(articulos[index].precio, "p", div);
        let compra = crearElementoTexto("Comprar", "button", div);
        compra.style = "color: black;"
        compra.addEventListener('click' , function(e){
        e.preventDefault()
        let idarticulo = articulos[index].id;
        let formdata = new FormData();
        formdata.append('opcion' , 'CA')
        formdata.append('idarticulo', idarticulo);
        let peticion = new XMLHttpRequest();
        peticion.open('POST',url);
        peticion.onreadystatechange = function (e) {
            e.preventDefault()
          if(this.readyState == 4 && this.status == 200 ){
            Swal.fire({
                title:"has comprado un articulo",
                icon:"success",
                text: "compraste un articulo",
                showConfirmButton: true
            }).then(() => {
          window.location.href ="tienda.html";
            });
          }
      }
          peticion.send(formdata);
       });
    }
} 
}
