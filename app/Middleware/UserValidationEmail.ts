import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UserValidationEmail {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const { email } = request.body();
    try {
      const usuarioEmail = await User.findBy('email', email)
      if (usuarioEmail) {
        return response.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' })
      }
      await next()
    } catch (error) {
      return response.status(500).json({ mensagem: 'Erro interno do servidor', obs: error.message })
    }
  }
}
