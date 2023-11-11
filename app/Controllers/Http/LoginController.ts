import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class LoginController {
    public async login({ auth, request, response }: HttpContextContract) {
        const { email } = request.body()
        try {
            const usuario = await User.findBy('email', email)

            if (!usuario) {
                return response.status(404).json({ mensagem: 'Usuário não encontrado.' })
            }

            const token = await auth.use('api').generate(usuario, { expiresIn: '30 mins' })
            return response.status(200).json({ mensagem: 'Usuário logado com sucesso.', token })
        } catch (error) {
            return response.status(500).json({ mensagem: 'Erro interno do servidor', obs: error.message })
        }
    }
}
