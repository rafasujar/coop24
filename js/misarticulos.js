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

function cargartienda() {
    let param = new FormData();
    param.append("opcion", "SV")
    param.append("idsocio", iduser)

    fetch(url,{
        method: "POST",
        body: param,
    }).then((res) => res.json()).then((data) => {
        let tienda = document.querySelector('form#tienda');
        data.forEach(element => {
        let divtienda = crearElemento('div', tienda);
        divtienda.style =  "display: flex; flex-wrap: wrap; justify-content: center;";
        let img = crearElemento('img', divtienda);
        img.src = "articulos/"+element.img;
        img.style = "width: 100px; height: 100px;";
        let h3 = crearElementoTexto(element.nombre, 'h3', divtienda);
        let p = crearElementoTexto(element.precio, 'p', divtienda);
        if(element.estado.includes("V")){
            let btn = crearElemento('button', divtienda);
            btn.textContent = "Vendido";
            btn.style = "background-color: red; color: white; border: none; padding: 10px; margin: 10px;";
        }else{
            let btn2 = crearElemento('button', divtienda);
            btn2.textContent = "Editar";
            btn2.style = "background-color: green; color: white; border: none; padding: 10px; margin: 10px;";
            btn2.addEventListener('click', function(){
                sessionStorage.setItem('idarticulo', element.id);
                window.location.href = "subirarticulo.html";
            });
            let btn3 = crearElemento('button', divtienda);
            btn3.textContent = "Eliminar";
            btn3.addEventListener('click', function (e) {
                let param = new FormData();
                param.append("opcion", "BA");
                param.append("idarticulo", element.id);
                fetch(url,{
                    method: "POST",
                    body: param
                }).then((res) => res.json()).then((data) => {
                    Swal.fire({
                        title: "Eliminado",
                        icon: "success",
                        text: "Articulo eliminado"
                    }).then(() => {
                        window.location.reload();
                    });
                }).catch((error) => {
                    console.log(error);
                });
            });
        }
    });
        
}).catch((error) => {
    console.log(error);
});
    }

function crearElemento(elemento, padre) {
    let el = document.createElement(elemento);
    padre.appendChild(el);
    return el;
}

function crearElementoTexto(texto, elemento, padre) {
    let el = document.createElement(elemento);
    el.textContent = texto;
    padre.appendChild(el);
    return el;
}
