import { dato } from './dato.js';

const tablaProductos = document.querySelector('#tablaProductos tbody');
const tablaTotal = document.querySelector('#tablaTotal tbody');
const totalFinal = document.getElementById('totalFinal');

document.addEventListener("DOMContentLoaded", () => { 
  fetch('http://localhost:8080/api/carrito')
  .then(response => response.json())
  .then(posts => {
    posts.products.forEach(producto => {
      const fila = document.createElement('tr');

      const tdNombre = document.createElement('td');
      const strong = document.createElement('strong');
      strong.textContent = producto.title;
      const ref = document.createElement('small');
      ref.textContent = `Ref: ${producto.sku}`;
      tdNombre.append(strong, document.createElement('br'), ref);

      const tdCantidad = document.createElement('td');
      const divCantidad = document.createElement('div');
      divCantidad.classList.add('cantidad');

      const btnMenos = document.createElement('button');
      btnMenos.textContent = '−';
      btnMenos.classList.add('btn-menos');

      const input = document.createElement('input');
      input.type = 'number';
      input.value = 0;
      input.min = 0;
      input.classList.add('input-cantidad');

      const btnMas = document.createElement('button');
      btnMas.textContent = '+';
      btnMas.classList.add('btn-mas');

      divCantidad.append(btnMenos, input, btnMas);
      tdCantidad.append(divCantidad);

      //Precio unitario 
      const tdUnidad = document.createElement('td');
      tdUnidad.textContent = `${producto.price}${dato.currency}`;

      //Total individual 
      const tdTotal = document.createElement('td');
      tdTotal.textContent = `0${dato.currency}`;
      tdTotal.style.width = "100px";
      tdTotal.style.textAlign = "right";

      fila.append(tdNombre, tdUnidad, tdCantidad, tdTotal);
      tablaProductos.appendChild(fila);

      //Eventos
      btnMas.addEventListener('click', () => {
        input.value++;
        actualizarTotales();
      });

      btnMenos.addEventListener('click', () => {
        if (input.value > 0) input.value--;
        actualizarTotales();
      });

      input.addEventListener('input', actualizarTotales);
    });

});

    function actualizarTotales() {
      // Limpia la tabla de totales
      while (tablaTotal.firstChild) {
        tablaTotal.removeChild(tablaTotal.firstChild);
      }

      let totalGeneral = 0;

      // Recorremos los productos
      [...tablaProductos.querySelectorAll('tr')].forEach(fila => {
        const nombre = fila.children[0].querySelector('strong').textContent;
        const precioStr = fila.children[1].textContent.replace(dato.currency, '').trim();
        const precio = parseFloat(precioStr) || 0;
        const cantidad = parseInt(fila.querySelector('input').value) || 0;

        const total = precio * cantidad;
        fila.children[3].textContent = `${isNaN(total) ? 0 : total.toFixed(2)}${dato.currency}`;

        // Solo agregamos al total si hay cantidad
        if (cantidad > 0) {
          const filaResumen = document.createElement('tr');

          const tdNombre = document.createElement('td');
          tdNombre.textContent = nombre;

          const tdTotal = document.createElement('td');
          tdTotal.textContent = `${total.toFixed(2)}${dato.currency}`;

          const tdQuitar = document.createElement('td');
          const btnQuitar = document.createElement('button');
          btnQuitar.textContent = 'Quitar';
          btnQuitar.classList.add('btn-menos');
          tdQuitar.appendChild(btnQuitar);

          // Evento para quitar producto
          btnQuitar.addEventListener('click', () => {
            const filaProducto = [...tablaProductos.querySelectorAll('tr')]
              .find(f => f.querySelector('strong').textContent === nombre);

            if (filaProducto) {
              filaProducto.querySelector('input').value = 0;
              actualizarTotales();
            }
          });

          filaResumen.append(tdNombre, tdTotal, tdQuitar);
          tablaTotal.appendChild(filaResumen);

          totalGeneral += total;
        }
      });

      totalFinal.textContent = `TOTAL ${isNaN(totalGeneral) ? 0 : totalGeneral.toFixed(2)}${dato.currency}`;
    }
  })
  .catch(error => {
    console.error("Error al obtener los datos:", error);
  });
