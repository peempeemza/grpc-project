import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Hero, HeroById } from './interfaces/hero-interface'
import { Product, ProductById, Products ,ProductList} from './interfaces/product-interface'
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { InjectKnex, Knex } from 'nestjs-knex';

@Controller()
export class AppController {
  constructor(
    @InjectKnex() private readonly knex: Knex,
  ) { }

  private readonly items: Hero[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];

  // private readonly product: Product[] = [
  //   {
  //     product_id: 1, code: '0001', name: 'ทดสอบ', price: 130.00, 
  //   },
  //   {
  //     product_id: 2, code: '0002', name: 'ทดสอ2', price: 20.00, 
  //   },
  // ]

  @GrpcMethod('ProductService')
 async findOneProduct(data: ProductById): Promise<Product> {
    console.log(data);
    
    return await this.knex('inventory_product')
      .select('product_id', 'product_code', 'product_name', 'product_price')
      .where('product_id', data.product_id)
      .first();
    
    //console.log('data', data)
    // let item: Product = {
    //   product_id: 1, product_code: '0001', product_price: 130.00, product_name: 'ทดสอบ'
    // }
    // return this.product.find(({ product_id }) => product_id === data.product_id);
  }
  //@UseInterceptors(ClassSerializerInterceptor)
  @GrpcMethod('ProductService')
  async findManyProduct(): Promise<ProductList> {
    
    let products = await this.knex('inventory_product')
      .select('product_id', 'product_code', 'product_name', 'product_price')
      .limit(10);

    let product_list = new ProductList();
    product_list.products= products;
      return product_list;
    //console.log('data', data)
    // let item: Product = {
    //   product_id: 1, product_code: '0001', product_price: 130.00, product_name: 'ทดสอบ'
    // }
    // return this.product.find(({ product_id }) => product_id === data.product_id);
  }

  @GrpcMethod('HeroService')
  findOne(data: HeroById): Hero {
    return this.items.find(({ id }) => id === data.id);
  }
  // @GrpcStreamMethod('HeroService')
  // findMany(data$: Observable<HeroById>): Observable<Hero> {
  //   const hero$ = new Subject<Hero>();
  //   const onNext = (heroById: HeroById) => {
  //     const item = this.items.find(({ id }) => id === heroById.id);
  //     hero$.next(item);
  //   };
  //   const onComplete = () => hero$.complete();
  //   data$.subscribe({
  //     next: onNext,
  //     complete: onComplete,
  //   });
  //   return hero$.asObservable();
  // }


}
