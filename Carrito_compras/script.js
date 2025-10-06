import { dato } from './dato.js';
console.log("script cargado correctamente");

 document.addEventListener('DOMContentLoaded', function(event) {

  const tabla = document.querySelector('#tablaProductos tbody');
  const tablatexto = document.querySelector('#total');

  let total = 0;

  dato.products.forEach(producto => {
    const fila = document.createElement('tr');
    const celdaCantidad = document.createElement('td');
    const divCantidad = document.createElement('div');

    const celdaTitulo = document.createElement('td');
    celdaTitulo.textContent = producto.title;
    celdaTitulo.style.textAlign = "left";
    celdaTitulo.style.fontSize = "19px";


    const divCeldaSKU = document.createElement('div');
    divCeldaSKU.textContent = 'Ref: ' + producto.SKU;
    divCeldaSKU.style.textAlign = "left";
    divCeldaSKU.style.fontSize = "12px";


    celdaTitulo.append(divCeldaSKU);

    //Boton menos
    const btnMenos = document.createElement('button');
    btnMenos.textContent = '-';
    Object.assign(btnMenos.style, {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '50px',
});

    const inputCantidad = document.createElement('input');
    inputCantidad.type = 'number';
    inputCantidad.value = 0;
    inputCantidad.readOnly = true;
    Object.assign(inputCantidad.style, {
    width: '60px',
    textAlign: 'center',
    border: '2px solid #ddd',
    borderLeft: 'none',
    borderRight: 'none',
    padding: '8px',
    borderRadius: '50px',
});
    
    //Boton mas
    const btnMas = document.createElement('button');
    btnMas.textContent = '+';
    Object.assign(btnMas.style, {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '50px',
});

    divCantidad.append(btnMenos, inputCantidad, btnMas);
    celdaCantidad.append(divCantidad);

    const celdaPrecio = document.createElement('td');
    celdaPrecio.textContent = producto.price + ' €';

    const celdaSubtotal = document.createElement('td');
    celdaSubtotal.textContent = ` 0.00 ${dato.currency}`;


    fila.append(celdaTitulo, celdaPrecio, celdaCantidad, celdaSubtotal);
    tabla.append(fila);
    
    function actualizarSubtotal() {
    const subtotal = producto.price * inputCantidad.value;
    celdaSubtotal.textContent = `${dato.currency}${subtotal.toFixed(2)}`;
    calcularTotal();
  }

    btnMas.addEventListener('click', () => {
    inputCantidad.value++;
    actualizarSubtotal();
  });

  btnMenos.addEventListener('click', () => {
    if (inputCantidad.value > 0) {
      inputCantidad.value--;
      actualizarSubtotal();
    }
  });

    
  });

  calcularTotal();
});

  function calcularTotal() {
  total = 0;
  document.querySelectorAll('#tablaProductos tbody tr').forEach(fila => {
    const subtotalTexto = fila.children[3].textContent; 
    const numero = subtotalTexto.replace('€', '').trim();
    const subtotal = parseFloat(numero);
    if (!isNaN(subtotal)) {
      total += subtotal;
    }
  });
  
  totalTexto.textContent = `Total: ${dato.currency}${total.toFixed(2)}`;
}