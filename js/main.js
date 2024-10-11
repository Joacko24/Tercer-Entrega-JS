// Variables globales
const productos = document.querySelectorAll('.producto');
const carrito = document.querySelector('#lista-carrito');
const precioTotal = document.querySelector('#precio-total');
const botonVaciar = document.querySelector('#vaciar-carrito');
const botonTerminarCompra = document.querySelector('#terminar-compra');

let carritoItems = [];

// Función para agregar productos al carrito
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

// Función para actualizar el carrito
function actualizarCarrito() {
    carrito.innerHTML = '';
    let total = 0;

    carritoItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} x${item.cantidad} - $${item.precioTotal.toFixed(2)}`;
        carrito.appendChild(li);
        total += item.precioTotal;
    });

    precioTotal.textContent = total.toFixed(2);
}

// Función para vaciar el carrito
botonVaciar.addEventListener('click', () => {
    carritoItems = [];
    actualizarCarrito();
    alert('El carrito ha sido vaciado.');
});

// Función para terminar la compra
botonTerminarCompra.addEventListener('click', () => {
    if (carritoItems.length === 0) {
        alert('El carrito está vacío.');
    } else {
        alert('¡Gracias por tu compra!');
        carritoItems = [];
        actualizarCarrito();
    }
});