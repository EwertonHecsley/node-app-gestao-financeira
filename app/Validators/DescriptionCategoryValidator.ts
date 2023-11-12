import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DescriptionCategoryValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    descricao: schema.string([
      rules.required()
    ])
  })


  public messages: CustomMessages = {
    'required': 'A descrição da categoria deve ser informada.',
    'string': 'Formato inválido, apenas texto liberado'
  }
}
