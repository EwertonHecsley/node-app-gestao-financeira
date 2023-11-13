import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  Route.post('/login', 'LoginController.login').middleware(['validateBodyLogin', 'findEmailBd'])

  Route.resource('/usuario', 'UsersController').middleware({
    store: ['validateBody', 'validateEmail'],
    index: ['auth']
  }).apiOnly()

  Route.put('/usuario', 'UsersController.updateUser').middleware(['auth', 'validateBody', 'validateEmail'])

  Route.resource('/categoria', 'CategoriasController').middleware({
    index: ['auth'],
    store: ['auth', 'validateDescriptionCategory'],
    show: ['auth', 'verificarIdCategoria'],
    update: ['auth', 'validateDescriptionCategory', 'verificarIdCategoria']
    //Finalizar endpoint deletar e verifcar se existe transacoes antes de deletar
  })

  Route.resource('/trasacoes', 'TransacoesController').middleware({
    store: ['auth']
  })
}).prefix('/api')
