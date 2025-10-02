
import Carrito from  './Carrito.js'
import {dato} from './dato.js';

console.log("script cargado correctamente");

 document.addEventListener('DOMContentLoaded', function(event) {

const tbody = document.getElementById("tbody-productos");

dato.products.forEach(producto => {

  const tdProducto = document.createElement("td");
  tdProducto.textContent = producto.title;

  const tdCantidad = document.createElement("td");

  const btnMenos = document.createElement("button");
  btnMenos.textContent = "-";
  
  const input = document.createElement("input");
  input.type = "text";
  input.value = "1";
  input.style.width = "40px";
  input.style.textAlign = "center";

  const btnMas = document.createElement("button");
  btnMas.textContent = "+";

  tdCantidad.appendChild(btnMenos);
  tdCantidad.appendChild(input);
  tdCantidad.appendChild(btnMas);

  const tdUnidad = document.createElement("td");
  tdUnidad.textContent = producto.price + " " + dato.currency;

  const tdTotal = document.createElement("td");
  tdTotal.textContent = producto.price + " " + dato.currency;


});


});


    