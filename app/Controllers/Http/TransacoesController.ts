import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transacoe from 'App/Models/Transacoe'

export default class TransacoesController {
  public async index({ auth, response }: HttpContextContract) {
    try {
      const { id } = (await auth.authenticate()).$attributes
      const transacoes = await Transacoe.query().where({ usuario_id: id })
      return response.status(200).json(transacoes)
    } catch (error) {
      return response.status(500).json({ mensagem: 'Erro interno do servidor', obs: error.message })
    }
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const { tipo, descricao, valor, categoria_id } = request.body()
    try {
      const { id } = (await auth.authenticate()).$attributes
      const transacao = (await Transacoe.create({ descricao, valor, categoria_id, tipo, usuario_id: id }))
      return response.status(201).json({ mensagem: 'Transacao cadastrada com sucesso', transacao })
    } catch (error) {
      return response.status(500).json({ mensagem: 'Erro interno do servidor', obs: error.message })
    }
  }

  public async show({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
