import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pedido,
  Personas,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoPersonasController {
  constructor(
    @repository(PedidoRepository)
    public pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/personas', {
    responses: {
      '200': {
        description: 'Personas belonging to Pedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Personas)},
          },
        },
      },
    },
  })
  async getPersonas(
    @param.path.string('id') id: typeof Pedido.prototype.id,
  ): Promise<Personas> {
    return this.pedidoRepository.persona(id);
  }
}
