document.addEventListener('DOMContentLoaded', function(event) {

const tabla = document.querySelector('.mitabla');
const tbody = tabla.querySelector('tbody');
const filas = tbody.querySelectorAll('tr');
filas.forEach(fila => {
  const celdas = fila.querySelectorAll('th, td');
  const celdaCantidad = celdas[1];
  console.log(celdaCantidad.textContent);
});

const btnMas = document.createElement('button');
const btnMenos = document.createElement('button');

btnMas.textContent = '+';
btnMenos.textContent = '-'

})

export const 
    dato={
        
    currency: "€", 
    products: [ 
                { 
                    SKU: "0K3QOSOV4V", 
                    title: "iFhone 13 Pro", 
                    price: "938.99",
                }, 
                { 
                    SKU: "TGD5XORY1L", 
                    title: "Cargador", 
                    price: "49.99",
                }, 
                { 
                    SKU: "IOKW9BQ9F3", 
                    title: "Funda de piel", 
                    price: "79.99",
                } 
              ] 
}
    