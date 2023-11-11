import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class FindEmail {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const { email, senha } = request.body()
    try {
      const usuarioBd = await User.findBy('email', email)
      if (!usuarioBd) {
        return response.status(404).json({ mensagem: 'Email usuário inválido.' })
      }
      if (!await Hash.verify(usuarioBd.senha, senha)) {
        return response.status(404).json({ mensagem: 'Senha de usuario inválida.' })
      }
      await next()
    } catch (error) {
      response.status(500).json({ mensagem: 'Erro interno do servidor', obs: error.message })
    }
  }
}
