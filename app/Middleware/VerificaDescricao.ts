import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DescriptionCategoryValidator from 'App/Validators/DescriptionCategoryValidator'

export default class VerificaDescricao {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    try {
      await request.validate(DescriptionCategoryValidator)
      await next()
    } catch (error) {
      return response.status(500).json({ mensagem: error.messages.errors[0].message })
    }
  }
}
