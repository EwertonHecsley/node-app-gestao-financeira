import Server from '@ioc:Adonis/Core/Server'

Server.middleware.register([
  () => import('@ioc:Adonis/Core/BodyParser'),
])

Server.middleware.registerNamed({
  validateBody: () => import('App/Middleware/UserValidationBody'),
  validateEmail: () => import('App/Middleware/UserValidationEmail'),
  validateBodyLogin: () => import('App/Middleware/LoginValidation'),
  findEmailBd: () => import('App/Middleware/FindEmail'),
  auth: () => import('App/Middleware/Auth'),
  validateDescriptionCategory: () => import('App/Middleware/VerificaDescricao'),
  verificarIdCategoria: () => import('App/Middleware/ListarCategoriaId'),
  verificaBodyTransacoes: () => import('App/Middleware/TransitionBodyVerify'),
  intermediarioTransacoes: () => import('App/Middleware/MiddTransition')
})
