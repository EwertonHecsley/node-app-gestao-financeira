import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transacoe from 'App/Models/Transacoe'

export default class TransacoesController {
  public async index({ auth, response }: HttpContextContract) {
    try {
      const { id } = (await auth.authenticate()).$attributes
      const transacoes = await Transacoe.query().where({ usuario_id: id })
      return response.status(200).json(transacoes)
    } catch (error) {
      return response.status(500).json({ mensagem: 'Erro interno do servidor.', obs: error.message })
    }
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const { tipo, descricao, valor, categoria_id } = request.body()
    try {
      const { id } = (await auth.authenticate()).$attributes
      const transacao = (await Transacoe.create({ descricao, valor, categoria_id, tipo, usuario_id: id }))
      return response.status(201).json({ mensagem: 'Transacao cadastrada com sucesso.', transacao })
    } catch (error) {
      return response.status(500).json({ mensagem: 'Erro interno do servidor.', obs: error.message })
    }
  }

  public async show({ auth, params, response }: HttpContextContract) {
    const id_parametro = Number(params.id)
    try {
      const { id } = (await auth.authenticate()).$attributes
      const transacoes = await Transacoe.query().where({ id: id_parametro }).where({ usuario_id: id }).first()
      if (!transacoes) {
        return response.status(404).json({ mensagem: 'Transação não encontrada.' })
      }
      return response.status(200).json(transacoes)
    } catch (error) {
      return response.status(500).json({ mensagem: 'Erro interno do servidor.', obs: error.message })
    }
  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    const id_parametro = Number(params.id)
    try {
      const { id } = (await auth.authenticate()).$attributes
      const transacao = await Transacoe.query().where({ usuario_id: id }).where({ id: id_parametro }).first()
      if (!transacao) {
        return response.status(404).json({ mensagem: 'Transacao não encontrada.' })
      }
      await transacao.delete()
      return response.status(204)
    } catch (error) {
      return response.status(500).json({ mensagem: 'Erro interno do servidor.', obs: error.message })
    }
  }
}
