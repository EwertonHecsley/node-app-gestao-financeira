import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categoria from 'App/Models/Categoria'

export default class ListarCategoriaId {
  public async handle({ auth, response, params }: HttpContextContract, next: () => Promise<void>) {
    const id_parametro = params.id
    try {
      const { id } = (await auth.authenticate()).$attributes
      const categorias = (await Categoria.query().where('usuario_id', id)).find((cat) => cat.id == id_parametro)
      if (!categorias) {
        return response.status(404).json({ mensagem: 'Categoria não encontrada.' })
      }
      await next()
    } catch (error) {
      return response.status(500).json({ mensagem: 'Erro interno do servidor', obs: error.message })
    }
  }
}
