import { Controller, Inject, Get, Param, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { ProductById,Product, Products,QueryProduct } from '../interfaces/product-interface'
import {  } from 'rxjs/operators';
import { query } from 'express';

interface ProductService {
  findOneProduct(data: ProductById): Observable<Product>;
  findManyProduct({}): Observable<Product[]>;
}
@Controller('product')
export class ProductController implements OnModuleInit {
  private productService: ProductService;
  constructor(@Inject('CRM') private readonly client: ClientGrpc) { }
  onModuleInit() {
    this.productService = this.client.getService<ProductService>('ProductService');
  }
  
  @Get()
  getMany(): Observable<Product[]> {
    return this.productService.findManyProduct({});
  }


  @Get(':product_id')
  getByProductId(@Param('product_id') product_id: string): Observable<Product> {
    return this.productService.findOneProduct({ product_id: +product_id });
  }
}