package com.decroly.backcarrito.model;

public class Product
{
    private String SKU;
    private String title;
    private String description;
    private String price;
    private String url;

    Product(String SKU, String title, String description, String price, String url)
    {
        this.SKU = SKU;
        this.title = title;
        this.description = description;
        this.price = price;
        this.url = url;
    }

    public String getSku() {
        return SKU;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getPrice() {
        return price;
    }

    public String getUrl() {
        return url;
    }
}
