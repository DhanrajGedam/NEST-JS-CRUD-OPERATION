import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './product.model';
@Injectable()
export class ProductsService {
  private products: Product[] = [];
  insertProduct(title: String, desc: String, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }
  getSingleProduct(productId: String) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }
  updateProduct(productId: String, title: String, desc: String, price: number) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
  }
  
  private findProduct(id: String): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException(
        'The product you are looking for is not Available.',
      );
    }
    return [product, productIndex];
  }
  deleteProduct(prodId: String){
    const index = this.findProduct(prodId)[1];
    this.products.splice(index,1)
  }
}