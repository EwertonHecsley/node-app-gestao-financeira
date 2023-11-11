import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/usuario', 'UsersController').middleware({
    store: ['validateBody', 'validateEmail']
  }).apiOnly()
}).prefix('/api')
