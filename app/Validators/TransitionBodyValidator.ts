import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TransitionBodyValidator {
  constructor(protected ctx: HttpContextContract) { }
  public schema = schema.create({
    descricao: schema.string([
      rules.required()
    ]),
    valor: schema.number([
      rules.required()
    ]),
    data: schema.string([
      rules.required()
    ]),
    categoria_id: schema.number([
      rules.required()
    ]),
    tipo: schema.string([
      rules.required()
    ])


  })

  public messages: CustomMessages = {
    'required': 'O campo {{field}} é obrigatorio.'
  }
}
