import { Controller, Inject, Get, Param, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Hero, HeroById } from '../interfaces/hero-interface'
import { ProductById, Product } from '../interfaces/product-interface'
import { toArray } from 'rxjs/operators';

interface HeroService {
  findOne(data: HeroById): Observable<Hero>;
  findMany(upstream: Observable<HeroById>): Observable<Hero>;
}

// interface ProductService {
//   findOneProduct(data: ProductById): Observable<Product>;
//   findMany(upstream: Observable<ProductById>): Observable<Product>;
// }

@Controller('client')
export class ClientController implements OnModuleInit {
  private heroService: HeroService;
  // private productService: ProductService;
  constructor(@Inject('CRM') private readonly client: ClientGrpc) { }
  onModuleInit() {
    this.heroService = this.client.getService<HeroService>('HeroService');
    // this.productService = this.client.getService<ProductService>('ProductService');
    //console.log(this.heroService);
  }

  // @Get()
  // getMany(): Observable<Hero[]> {
  //   const ids$ = new ReplaySubject<HeroById>();
  //   ids$.next({ id: 1 });
  //   ids$.next({ id: 2 });
  //   ids$.complete();
  //   const stream = this.heroService.findMany(ids$.asObservable());
  //   return stream.pipe(toArray());
  // }

  @Get(':id')
  getById(@Param('id') id: string): Observable<Hero> {
    return this.heroService.findOne({ id: +id });
  }
  // @Get('product/:product_id')
  // getByProductId(@Param('product_id') product_id: string): Observable<Product> {
  //   return this.productService.findOneProduct({ product_id: +product_id });
  // }
}
