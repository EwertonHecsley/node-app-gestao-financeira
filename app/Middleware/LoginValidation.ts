import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import validaBody from '../Validators/LoginUserValidator'

export default class LoginValidation {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    try {
      await request.validate(validaBody)
      await next()
    } catch (error) {
      return response.status(500).json({ mensagem: error.messages.errors[0].message })
    }
  }
}

