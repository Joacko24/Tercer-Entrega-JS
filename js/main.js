let carritoItems = [];
const precioTotal = document.querySelector('#precio-total');
const botonVaciar = document.querySelector('#vaciar-carrito');


// Cargar productos desde data.json
document.addEventListener('DOMContentLoaded', () => {
    // Cargar productos desde data.json
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            cargarProductos(data);
        })
        .catch(error => console.error('Error al cargar los productos:', error));
});

// Función para cargar los productos en la página
function cargarProductos(productos) {
    const contenedorProductos = document.querySelector('.contenedor-productos');
    productos.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto');
        divProducto.setAttribute('data-id', producto.id);
        divProducto.setAttribute('data-nombre', producto.nombre);
        divProducto.setAttribute('data-precio', producto.precio);

        divProducto.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p>Precio: $${producto.precio} USD</p>
            <button class="agregar-al-carrito">Agregar al carrito</button>
        `;
        contenedorProductos.appendChild(divProducto);
    });
    agregarEventosProductos();
}

// Modificar la función para agregar productos al carrito
function agregarEventosProductos() {
    const productos = document.querySelectorAll('.producto');
    productos.forEach(producto => {
        producto.querySelector('.agregar-al-carrito').addEventListener('click', () => {
            const id = producto.getAttribute('data-id');
            const nombre = producto.getAttribute('data-nombre');
            const precio = parseFloat(producto.getAttribute('data-precio'));

            // Comprobar si el producto ya está en el carrito
            const productoExistente = carritoItems.find(item => item.id === id);
            if (productoExistente) {
                productoExistente.cantidad += 1;
                productoExistente.precioTotal += precio;
            } else {
                carritoItems.push({ id, nombre, precioUnitario: precio, cantidad: 1, precioTotal: precio });
            }

            actualizarCarrito();
        });
    });
}

// Actualizar carrito para agregar botones de sumar/restar
function actualizarCarrito() {
    // Limpiar solo la lista de productos en el carrito
    const listaCarrito = document.querySelector('#lista-carrito');
    listaCarrito.innerHTML = '';
    let total = 0;

    carritoItems.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.nombre} x${item.cantidad} - $${item.precioTotal.toFixed(2)}
            <button class="sumar-producto" data-id="${item.id}">+</button>
            <button class="restar-producto" data-id="${item.id}">-</button>
        `;
        listaCarrito.appendChild(li);
        total += item.precioTotal;
    });

    // Actualizar el precio total
    precioTotal.textContent = total.toFixed(2);

    // Volver a agregar los eventos a los botones de sumar/restar
    agregarEventosCarrito();
}


// Funciones para sumar/restar productos
function agregarEventosCarrito() {
    document.querySelectorAll('.sumar-producto').forEach(boton => {
        boton.addEventListener('click', () => {
            const id = boton.getAttribute('data-id');
            const producto = carritoItems.find(item => item.id === id);
            producto.cantidad += 1;
            producto.precioTotal += producto.precioUnitario;
            actualizarCarrito();
        });
    });

    document.querySelectorAll('.restar-producto').forEach(boton => {
        boton.addEventListener('click', () => {
            const id = boton.getAttribute('data-id');
            const producto = carritoItems.find(item => item.id === id);
            if (producto.cantidad > 1) {
                producto.cantidad -= 1;
                producto.precioTotal -= producto.precioUnitario;
            } else {
                // Eliminar del carrito si la cantidad es 0
                carritoItems = carritoItems.filter(item => item.id !== id);
            }
            actualizarCarrito();
        });
    });
}

// Función para vaciar el carrito
botonVaciar.addEventListener('click', () => {
    carritoItems = []; // Vaciar el arreglo de elementos en el carrito
    actualizarCarrito(); // Actualizar la interfaz para reflejar los cambios
});
