import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categoria from 'App/Models/Categoria'

export default class CategoriasController {
  public async index({ auth, response }: HttpContextContract) {
    try {
      const { id } = (await auth.authenticate()).$attributes
      const categoria = await Categoria.query().where('usuario_id', id)
      return response.status(200).json(categoria)
    } catch (error) {
      return response.status(500).json({ mensagem: 'Erro interno do servidor', obs: error.message })
    }
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const { descricao } = request.body()
    try {
      const { id } = (await auth.authenticate()).$attributes
      const categoriaBd = await Categoria.create({ usuario_id: id, descricao })
      return response.status(201).json({ mensagem: 'Categoria cadastrada com sucesso.', categoria: categoriaBd })
    } catch (error) {
      return response.status(500).json({ mensagem: 'Erro interno do servidor', obs: error.message })
    }
  }

  public async show({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
