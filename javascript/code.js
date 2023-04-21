let productos = [];

fetch("./javascript/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        renderizarProductos(productos);
    })

// const carrito = [];
const contenedor = document.querySelector("#misprods");
const buttonCategory = document.querySelectorAll(".button-category");
const mainTitle = document.querySelector("#main-title");
let botonesAgregar = document.querySelectorAll(".prodAAgregar");
const number = document.querySelector("#number");

// CARGA PRODUCTOS
function renderizarProductos(productosElegidos){
    
    contenedor.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
                    <img id="cardimg" src=${producto.foto} class="card-img-top" alt="...">
                    <div class="card-body">
                        <h3 class="card-title">${producto.nombre}</h3>
                        <p class="card-text">$ ${producto.precio}</p>
                        <button class="prodAAgregar" id="${producto.id}">Agregar</button>
                    </div>
        `;
        contenedor.append(div);
    })
    actualizarBotonesAgregar();
}

// CATEGORIA DE PRODUCTOS

buttonCategory.forEach(button =>
    button.addEventListener("click", (e) =>{

        buttonCategory.forEach(button => button.classList.remove("active"));
        e.currentTarget.classList.add("active");

        const productosButton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);

        if(e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            mainTitle.innerText = productoCategoria.categoria.nombre;
            
            const productosButton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            renderizarProductos(productosButton);
        }else{
            mainTitle.innerText = "Todos los Productos"
            renderizarProductos(productos)
        };
    
})
)

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".prodAAgregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", ()=> agregarAlCarrito);
    });
}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumber();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e){
    
    const idBoton = e.currentTarget.id;
    const prodAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        prodAgregado.cantidad = 1;
        productosEnCarrito.push(prodAgregado);
    }
    actualizarNumber();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumber() {
    let nuevoNumber = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    number.innerText = nuevoNumber;
}


