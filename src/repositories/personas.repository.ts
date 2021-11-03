import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Personas, PersonasRelations, Pedido} from '../models';
import {PedidoRepository} from './pedido.repository';

export class PersonasRepository extends DefaultCrudRepository<
  Personas,
  typeof Personas.prototype.id,
  PersonasRelations
> {

  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Personas.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(Personas, dataSource);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedidos', this.pedidos.inclusionResolver);
  }
}
