import Server from '@ioc:Adonis/Core/Server'

Server.middleware.register([
  () => import('@ioc:Adonis/Core/BodyParser'),
])

/*
|--------------------------------------------------------------------------
| Named middleware
|--------------------------------------------------------------------------
|
| Named middleware are defined as key-value pair. The value is the namespace
| or middleware function and key is the alias. Later you can use these
| alias on individual routes. For example:
|
| { auth: () => import('App/Middleware/Auth') }
|
| and then use it as follows
|
| Route.get('dashboard', 'UserController.dashboard').middleware('auth')
|
*/
Server.middleware.registerNamed({
  validateBody: () => import('App/Middleware/UserValidationBody'),
  validateEmail: () => import('App/Middleware/UserValidationEmail'),
  validateBodyLogin: () => import('App/Middleware/LoginValidation'),
  findEmailBd: () => import('App/Middleware/FindEmail')
})
