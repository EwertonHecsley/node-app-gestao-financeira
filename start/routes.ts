import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/usuario', 'teste').apiOnly()
}).prefix('/api')
