import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transacoe from 'App/Models/Transacoe'
import Categoria from 'App/Models/Categoria'

export default class MiddDeletarCategoria {
  public async handle({ auth, params, response }: HttpContextContract, next: () => Promise<void>) {
    const id_parametro = Number(params.id)
    try {
      const { id } = (await auth.authenticate()).$attributes
      const consultaCategoria = (await Categoria.query().where({ id: id_parametro }).where({ usuario_id: id }))
      if (consultaCategoria.length == 0) {
        return response.status(404).json({ mensagem: 'Categoria não encontrada.' })
      }
      const consultaTransacao = await Transacoe.query().where({ categoria_id: id_parametro }).where({ usuario_id: id })
      if (consultaTransacao.length > 0) {
        return response.status(400).json({ mensagem: 'Categoria possui transações cadastradas, não pode ser excluída.' })
      }
      await next()
    } catch (error) {
      return response.status(500).json({ mensagem: 'Erro interno do servidor', obs: error.message })
    }
  }
}
