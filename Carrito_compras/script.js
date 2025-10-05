import { dato } from './dato.js';
console.log("script cargado correctamente");

 document.addEventListener('DOMContentLoaded', function(event) {

  const tabla = document.querySelector('#tablaProductos tbody');
  const tablatexto = document.querySelector('#total');

  let total = 0;

  dato.products.forEach(producto => {
    const fila = document.createElement('tr');

    const celdaTitulo = document.createElement('td');
    celdaTitulo.textContent = producto.title

        //corregir el toFixed, da problemas de error en la consola

    const celdaPrecio = document.createElement('td');
    celdaPrecio.textContent = (parseFloat(producto.price) * cantidad).toFixed(2);

    const celdaCantidad = document.createElement('td');
    const divCantidad = document.createElement('div');
    divCantidad.classList.add('cantidad');

    const btnMenos = document.createElement('button');
    btnMenos.textContent = '-';

    const inputCantidad = document.createElement('input');
    inputCantidad.type = 'text';
    inputCantidad.value = 1;
    inputCantidad.readOnly = true;

    const btnMas = document.createElement('button');
    btnMas.textContent = '+';

    divCantidad.append(btnMenos, inputCantidad, btnMas);
    celdaCantidad.append(divCantidad);

    //corregir el toFixed
    const celdaSubtotal = document.createElement('td');
    celdaSubtotal.textContent = `${dato.currency}${producto.price.toFixed(2)}`;

    fila.append(celdaSKU, celdaTitulo, celdaPrecio, celdaCantidad, celdaSubtotal);
    tabla.appendChild(fila);

    btnMas.addEventListener('click', () => {
    inputCantidad.value++;
    actualizarSubtotal();
  });

  btnMenos.addEventListener('click', () => {
    if (inputCantidad.value > 1) {
      inputCantidad.value--;
      actualizarSubtotal();
    }
  });

    
  });

function actualizarSubtotal() {
    const subtotal = producto.price * inputCantidad.value;
    celdaSubtotal.textContent = `${dato.currency}${subtotal.toFixed(2)}`;
    calcularTotal();
  }

  calcularTotal();
});

  function calcularTotal() {
  total = 0;
  document.querySelectorAll('#tablaProductos tbody tr').forEach(fila => {
    const subtotalTexto = fila.children[4].textContent.replace(dato.currency, '');
    total += parseFloat(subtotalTexto);
  });
  totalTexto.textContent = `Total: ${dato.currency}${total.toFixed(2)}`;
}