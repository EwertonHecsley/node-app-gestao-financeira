import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/usuario', 'UsersController').apiOnly()
}).prefix('/api')
