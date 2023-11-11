import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  Route.post('/login', 'LoginController.login').middleware(['validateBodyLogin', 'findEmailBd'])

  Route.resource('/usuario', 'UsersController').middleware({
    store: ['validateBody', 'validateEmail']
  }).apiOnly()
}).prefix('/api')
