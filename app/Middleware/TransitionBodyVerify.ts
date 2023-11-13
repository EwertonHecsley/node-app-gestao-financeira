import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TransitionBodyValidator from 'App/Validators/TransitionBodyValidator'

export default class TransitionBodyVerify {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    try {
      await request.validate(TransitionBodyValidator)
      await next()
    } catch (error) {
      return response.status(500).json({ mensagem: error.messages.errors[0].message })
    }
  }
}
