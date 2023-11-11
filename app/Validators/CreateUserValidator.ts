import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    nome: schema.string([
      rules.required()
    ]),
    email: schema.string([
      rules.required(),
      rules.email()
    ]),
    senha: schema.string([
      rules.required(),
      rules.minLength(4),
      rules.maxLength(8),
      rules.alphaNum()
    ])
  })

  public messages: CustomMessages = {
    'required': 'O campo {{field}} é obrigatório.',
    'email': 'Deve ser um {{field}} válido.',
    'minLength': 'A senha deve ter no mínimo 4 caracteres.',
    'maxLength': 'A senha deve ter no máximo 8 caracteres.',
    'alphaNum': 'Senha só é permitido letras e números'
  }
}
