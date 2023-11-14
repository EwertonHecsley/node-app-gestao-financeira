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

  public async show({ auth, response, params }: HttpContextContract) {
    const id_parametro = params.id
    try {
      const { id } = (await auth.authenticate()).$attributes
      const categorias = (await Categoria.query().where('usuario_id', id)).find((cat) => cat.id == id_parametro)
      return response.status(200).json(categorias)
    } catch (error) {
      return response.status(500).json({ mensagem: 'Erro interno do servidor', obs: error.message })
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    const id_categoria = Number(params.id)
    const { descricao } = request.body()
    try {
      await Categoria.query().update({ descricao }).where({ id: id_categoria })
      return response.status(200).json({ mensagem: 'Categoria editada com sucesso.' })
    } catch (error) {
      return response.status(500).json({ mensagem: 'Erro interno do servidor', obs: error.message })
    }

  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    const id_categoria = Number(params.id)
    try {
      const { id } = (await auth.authenticate()).$attributes
      await Categoria.query().where({ id: id_categoria }).where({ usuario_id: id }).del()
      return response.status(204)
    } catch (error) {
      return response.status(500).json({ mensagem: 'Erro interno do servidor', obs: error.message })
    }
  }
}
