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
    update: ['auth', 'validateDescriptionCategory', 'verificarIdCategoria'],
    destroy: ['auth', 'intermediarioDeletarCategorias']
  }).apiOnly()

  Route.get('/transacao/extrato', 'TransacaoExtratoesController.listarTransacao').middleware(['auth'])

  Route.resource('/transacao', 'TransacoesController').middleware({
    index: ['auth'],
    store: ['auth', 'verificaBodyTransacoes', 'intermediarioTransacoes'],
    show: ['auth']
  })

}).prefix('/api')
