import { dato } from './dato.js';

const tablaProductos = document.querySelector('#tablaProductos tbody');
const tablaTotal = document.querySelector('#tablaTotal tbody');
const totalFinal = document.getElementById('totalFinal');

fetch('https://68e6684821dd31f22cc58009.mockapi.io/carrito/productos')
  .then(response => response.json())
  .then(posts => {
    console.log(posts);
    posts.forEach(producto => {
  const fila = document.createElement('tr');
  const tdNombre = document.createElement('td');
  tdNombre.innerHTML = `<strong>${producto.title}</strong><br><small>Ref: ${producto.SKU}</small>`;

  const tdCantidad = document.createElement('td');
  const divCantidad = document.createElement('div');
  divCantidad.classList.add('cantidad');

  const btnMenos = document.createElement('button');
  btnMenos.textContent = '−';
  Object.assign(btnMenos.style, {
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      padding: '8px 15px',
      fontSize: '18px',
      cursor: 'pointer',
      borderRadius: '50px',
    });


  const input = document.createElement('input');
  input.type = 'number';
  input.value = 0;
  input.min = 0;
  Object.assign(input.style, {
      width: '60px',
      textAlign: 'center',
      border: '2px solid #ddd',
      borderLeft: 'none',
      borderRight: 'none',
      padding: '8px',
      borderRadius: '50px',
    });


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
    

  divCantidad.append(btnMenos, input, btnMas);
  tdCantidad.appendChild(divCantidad);

  const tdUnidad = document.createElement('td');
  tdUnidad.textContent = `${producto.price}${dato.currency}`;

  const tdTotal = document.createElement('td');
  tdTotal.textContent = `0${dato.currency}`;
  tdTotal.style.width = "100px";
  tdTotal.style.textAlign = "right";

  fila.append(tdNombre, tdUnidad, tdCantidad, tdTotal);
  tablaProductos.appendChild(fila);

  // Eventos de botones
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

function actualizarTotales() {
  tablaTotal.innerHTML = '';
  let totalGeneral = 0;

  [...tablaProductos.querySelectorAll('tr')].forEach(fila => {
    const nombre = fila.children[0].querySelector('strong').textContent;
    const precioStr = fila.children[1].textContent.replace(dato.currency, '').trim();
    const precio = parseFloat(precioStr) || 0;
    const cantidad = parseInt(fila.querySelector('input').value) || 0;
    
    const total = precio * cantidad;
    fila.children[3].textContent = `${isNaN(total) ? 0 : total.toFixed(2)}${dato.currency}`;
    if (cantidad > 0) {
      const filaResumen = document.createElement('tr');
      filaResumen.innerHTML = `
        <td>${nombre}</td>
        <td>${isNaN(total) ? 0 : total.toFixed(2)}${dato.currency}</td>
      `;
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

 




