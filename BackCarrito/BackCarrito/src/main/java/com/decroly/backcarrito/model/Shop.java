package com.decroly.backcarrito.model;

import java.util.ArrayList;
import java.util.List;

public class Shop
{
    private String currency;
    private List<Product> products;

    public Shop(String currency) {
        this.currency = currency;
        this.products = new ArrayList<>();

        // Inserto productos en la tienda
        this.products.add(new Product(
    "0K3QOSOV4V",
    "iPhone 13 Pro",
    "Un smartphone de alto rendimiento con cámara avanzada y gran autonomía.",
    "938.99",
    "https://imgs.search.brave.com/Bp65ORYaPuUXucua5f8rs-wQ-oNUY59r-Me3mhzN_OI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg4MjU4MS1NTEE5/NjQxODg3NzI1MF8x/MDIwMjUtVi53ZWJw"
));

this.products.add(new Product(
    "TGD5XORY1L",
    "Cargador",
    "Cargador rápido de 20W ideal para dispositivos Apple.",
    "49.99",
    "https://imgs.search.brave.com/QPhUunAyb30t5HMZLwCOBZV8mBEFBSWgIWsmXc64YSk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDErRE1Tb09tSkwu/anBn"
));

this.products.add(new Product(
    "IOKW9BQ9F3",
    "Funda de piel",
    "Funda premium de piel genuina que ofrece protección y estilo.",
    "79.99",
    "https://imgs.search.brave.com/wsIxrnpgWrVC7xpg9PJjYr9dCT4M7ItkWSkKm9XgEno/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzg1NjM1NS1NTE04/OTU3MDc0NjA1OF8w/ODIwMjUtVi1mdW5k/YS1wYXJhLWlwaG9u/ZS10aXBvLXBpZWwt/bGVhdGhlci1jYXNl/LXByb3RlY3Rvci53/ZWJw"
));

this.products.add(new Product(
    "A7B2C8D4E6",
    "Auriculares AirPods",
    "Auriculares inalámbricos con sonido envolvente y micrófono integrado.",
    "199.99",
    "https://imgs.search.brave.com/0lTTUvFsK7yeevhYov_D_T9I-tU-sg2sFflj0vFXUow/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bWFjc3RvcmVvbmxp/bmUuY29tLm14L2lt/Zy9jeC9tZWRpYS9h/bGwtcHJvZHVjdHMv/bXVzaWMvYWlycG9k/c18zLnBuZw"
));

this.products.add(new Product(
    "F9G1H3J5K7",
    "Cable Lightning",
    "Cable Lightning resistente y de carga rápida certificado.",
    "29.99",
    "https://imgs.search.brave.com/8sZZQ9qmQlvkcrzC3kY31IMUr9tS0ygyTCBFWO3vmsA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzYxeHgwUW5RempM/LmpwZw"
));

this.products.add(new Product(
    "L2M4N6P8Q0",
    "Protector de pantalla",
    "Protector de vidrio templado resistente a rayones y golpes.",
    "19.99",
    "https://imgs.search.brave.com/7YJAf7KOkjegaXcLtU5Me4DM20L3kJ9oLn7PZ1tdOUo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdG9y/ZS5zdG9yZWltYWdl/cy5jZG4tYXBwbGUu/Y29tLzEvYXMtaW1h/Z2VzLmFwcGxlLmNv/bS9pcy9IUjI2Mj93/aWQ9MTE0NCZoZWk9/MTE0NCZmbXQ9anBl/ZyZxbHQ9OTAmLnY9/TkVSSWFFWjJZVUZy/ZW1kd05GazNZVGRh/VVZCRFVXdHVWSFl6/TUVSQ1pVUmlhM2M1/U3pKRk9UbFBaMUpR/YlhFNVdXMW1PR2gy/V1RaeVlua3Jka1pY/WVVSV2JYcFJNM0ZJ/YjJONFNXSjFZbVZ5/UkZsaWEyYw"
));

this.products.add(new Product(
    "R1S3T5U7V9",
    "Batería externa",
    "Power bank de alta capacidad para cargar tu móvil varias veces.",
    "89.99",
    "https://imgs.search.brave.com/_63MCyUH6ZxL2IVcQ5o_QBhQBFaQNjUoxihZr1saolQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dXNic2FyYmlkZS5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjQvMTIvWTAxNy5q/cGc"
));

this.products.add(new Product(
    "W4X6Y8Z0A2",
    "Soporte para auto",
    "Soporte magnético para auto compatible con todos los smartphones.",
    "59.99",
    "https://imgs.search.brave.com/pPljbGuLRMhAeCP2g1priAo5ntNTsE3Qbv1m7RkFzto/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/Xzc2MjUxMy1NTEE5/NjQxOTQ0NzgwNV8x/MDIwMjUtVi53ZWJw"
));

this.products.add(new Product(
    "B3C5D7E9F1",
    "Estuche resistente",
    "Estuche anti-golpes diseñado para máxima protección.",
    "39.99",
    "https://imgs.search.brave.com/8yii0YXIuLvQjwSlJbGO-AoaVEwoLO1esxt_BFRCCY4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDFzMEtQcUtOTUwu/anBn"
));

this.products.add(new Product(
    "G2H4J6K8L0",
    "Adaptador USB-C",
    "Adaptador compacto USB-C a Lightning de alta velocidad.",
    "24.99",
    "https://imgs.search.brave.com/mtLsYjZFrgHLLDunPfswviHYja5FQoGiDavoF3-ME3w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9RX05QXzJY/XzgxNjUzNC1NTEE5/NTI0MzQzNDg1M18x/MDIwMjUtRS53ZWJw"
));


        
    }

    public String getCurrency()
    {
        return currency;
    }

    public List<Product> getProducts()
    {
        return products;
    }
}
