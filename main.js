class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
    }
}

let labiales = [];
let sombras = [];
let polvos = [];
let todosProductos = [];
let carrito = [];

const productosJson = "../productos.json";
fetch(productosJson)
    .then(response => response.json())
    .then(productos => {

        productos.labiales.forEach(labial => {
            labiales.push(new Producto(labial.id, labial.nombre, labial.precio, labial.img));
        })

        productos.sombras.forEach(sombra => {
            sombras.push(new Producto(sombra.id, sombra.nombre, sombra.precio, sombra.img));
        })

        productos.polvos.forEach(polvo => {
            polvos.push(new Producto(polvo.id, polvo.nombre, polvo.precio, polvo.img));
        })

        todosProductos.push(productos.labiales, productos.sombras, productos.polvos);
        mostrarLabial()
        mostrarPolvos()
        mostrarSombras()


    })
    .catch(error => console.info(error));


const contenedorSombras = document.getElementById("contenedorSombras");
const contenedorLabiales = document.getElementById("contenedorLabiales");
const contenedorPolvos = document.getElementById("contenedorPolvos");


const mostrarSombras = () => {
    sombras.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12", "mb-2");
        card.innerHTML = `
                            <div class="card">
                                <img class="card-img-tom imgProductos img-fluid" src="${producto.img}" alt="${producto.nombre}">
                                <div class="card-body">
                                    <h3 class="fw-bolder">${producto.nombre}</h3>
                                    <p class="fs-5 fw-semibold">$${producto.precio}</p>
                                    <button class="btn botonAg fw-bolder" id="boton${producto.id}"> Agregar Producto </button>
                                </div>
                            </div>`
        contenedorSombras.appendChild(card);

        //Agregar productos al carrito: 
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
            document.getElementById("carritoPestaña").style.display = "block";
        })
    })
}


const mostrarLabial = () => {
    labiales.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12", "mb-2");
        card.innerHTML = `
                            <div class="card">
                                <img class="card-img-tom imgProductos img-fluid" src="${producto.img}" alt="${producto.nombre}">
                                <div class="card-body">
                                    <h3 class="fw-bolder">${producto.nombre}</h3>
                                    <p class="fs-5 fw-semibold">$${producto.precio}</p>
                                    <button class="btn botonAg fw-bolder" id="boton${producto.id}"> Agregar Producto </button>
                                </div>
                            </div>`
        contenedorLabiales.appendChild(card);

        //Agregar productos al carrito: 
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
            document.getElementById("carritoPestaña").style.display = "block";
        })
    })
}


const mostrarPolvos = () => {
    polvos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12", "mb-2");
        card.innerHTML = `
                            <div class="card">
                                <img class="card-img-tom imgProductos img-fluid" src="${producto.img}" alt="${producto.nombre}">
                                <div class="card-body">
                                    <h3 class="fw-bolder">${producto.nombre}</h3>
                                    <p class="fs-5 fw-semibold">$${producto.precio}</p>
                                    <button class="btn botonAg fw-bolder" id="boton${producto.id}"> Agregar Producto </button>
                                </div>
                            </div>`
        contenedorPolvos.appendChild(card);

        //Agregar productos al carrito: 
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
            document.getElementById("carritoPestaña").style.display = "block";

        })
    })
}



const agregarAlCarrito = (id) => {
    const producto = buscarProductoPorId(id);

    if (producto) {
        const productoEnCarrito = carrito.find((item) => item.id === id);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        Toastify({
            text: "Producto agregado al carrito",
            duration: 3000,
            gravity: "top",
            position: "right",
            destination: "",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();

        actualizarCarrito();
    } else {
        console.log("Producto no encontrado");
    }
};

const buscarProductoPorId = (id) => {

    let producto = labiales.find((item) => item.id === id);

    if (!producto) {
        producto = sombras.find((item) => item.id === id);
    }

    if (!producto) {
        producto = polvos.find((item) => item.id === id);
    }

    return producto;
};

const actualizarCarrito = () => {
    calcularTotal();
    mostrarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const contenedorCarrito = document.getElementById("contenedorCarrito");


const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(Producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-4", "col-md-6", "mb-4", "animate__animated", "animate__fadeIn");
card.innerHTML = `
    <div class="row">
        <div class="col">
            <div class="card">
                <img class="card-img-top imgProductos img-fluid" src="${Producto.img}" alt="${Producto.nombre}">
                <div class="card-body">
                    <h3 class="animate__animated animate__jackInTheBox">${Producto.nombre}</h3>
                    <p>${Producto.precio}</p>
                    <p class="text-center fw-semibold">
                        <button id="disminuir${Producto.id}" class="btnCar border border-dark">-</button>
                        ${Producto.cantidad}
                        <button id="aumentar${Producto.id}" class="btnCar border border-dark">+</button>
                    </p>
                    <button class="btn botonAg fw-bolder" id="eliminar${Producto.id}">Eliminar Producto</button>
                </div>
            </div>
        </div>
    </div>`;

        contenedorCarrito.appendChild(card);
        //Eliminar productos del carrito: 
        const boton = document.getElementById(`eliminar${Producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(Producto.id);
        })

        //Disminuir productos del carrito: 
        const botonDisminuir = document.getElementById(`disminuir${Producto.id}`);
        botonDisminuir.addEventListener("click", () => {
            cambiarCantidadCarrito(Producto.id, 'disminuir');
        })

        //Aumentar productos del carrito: 
        const botonAumentar = document.getElementById(`aumentar${Producto.id}`);
        botonAumentar.addEventListener("click", () => {
            cambiarCantidadCarrito(Producto.id, 'aumentar');
        })


    })
    calcularTotal();
}

const cambiarCantidadCarrito = (id, tipo) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);

    if (tipo === 'aumentar') {
        // Aumentar
        productoEnCarrito.cantidad++

    } else {
        // Disminuir

        if (productoEnCarrito.cantidad == 1) {
            eliminarDelCarrito(id)

        } else {
            productoEnCarrito.cantidad--
        }

    }

    actualizarCarrito();

}


const eliminarDelCarrito = (id) => {

    let carritoCopy = JSON.parse(JSON.stringify(carrito));

    const producto = carrito.find(producto => producto.id === id);

    let indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);

    actualizarCarrito()

}


const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
    actualizarCarrito()
})


const eliminarTodoElCarrito = () => {
    carrito = [];
    localStorage.removeItem('carrito');
    actualizarCarrito()
}


const total = document.getElementById("total");
const total2 = document.getElementById("total2")

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `${totalCompra}`;
    total2.innerHTML = `$${totalCompra}`;
}

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    mostrarCarrito()
}

  document.getElementById("btnAbrirPestana").addEventListener("click", () => {
    document.getElementById("pestañaEmergente").style.display = "block";
    document.getElementById("carritoPestaña").style.display = "none";
  });
  
  document.getElementById("pago-form").addEventListener("submit",(event) => {
    event.preventDefault();
    
    let cardNumber = document.getElementById("tarjeta-number").value;
    let cardholderName = document.getElementById("tarjeta-name").value;
    let expirationDate = document.getElementById("expiracion-date").value;
    let cvv = document.getElementById("cvv").value;

    if (SubmitEvent, cardNumber, cardholderName, expirationDate, cvv){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Su compra se realizo correctamente',
            showConfirmButton: false,
            timer: 4500
          })
    }
    eliminarTodoElCarrito()

})

document.getElementById("abrirCarrito").addEventListener("click", () => {
    document.getElementById("carritoPestaña").style.display = "block"
})


