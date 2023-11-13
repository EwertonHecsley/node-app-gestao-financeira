import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categoria from 'App/Models/Categoria'

export default class MiddTransition {
  public async handle({ auth, request, response }: HttpContextContract, next: () => Promise<void>) {
    const { categoria_id, tipo } = request.body()
    try {
      const usuario = (await auth.authenticate()).id
      const categoria = (await Categoria.query().where({ usuario_id: usuario })).find((cat) => cat.id == Number(categoria_id))
      if (!categoria) {
        return response.status(404).json({ mensagem: 'Categoria não cadastrada para esse usuario.' })
      }
      if (tipo !== 'entrada' && tipo !== 'saida') {
        return response.status(400).json({ mensagem: 'Tipo de transacao inválida, só permitido "entrada" e "saida".' })
      }
      await next()
    } catch (error) {
      return response.status(500).json({ mensagem: 'Erro interno do servidor', obs: error.message })
    }
  }
}
