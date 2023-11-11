import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class UsersController {
  public async index({ auth, response }: HttpContextContract) {
    try {
      const verificaToken = await auth.authenticate()
      const { id } = verificaToken.$attributes
      const usuarioBd = await User.find(id)
      return response.status(200).json(usuarioBd)
    } catch (error) {
      return response.status(500).json({ mensagem: 'Erro interno do servidor', obs: error.message })
    }

  }

  public async store({ request, response }: HttpContextContract) {
    const { nome, email, senha } = request.body();
    try {
      const newUser = await User
        .create({
          nome,
          email,
          senha
        })
      return response.status(201).json({ mensagem: 'Usuário cadastrado com sucesso.', newUser })
    } catch (error) {
      response.status(500).json({ mensagem: 'Erro interno do servidor', obs: error.message })
    }
  }

  public async show({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
