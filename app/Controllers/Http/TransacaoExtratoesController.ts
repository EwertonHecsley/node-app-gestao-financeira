import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transacoe from 'App/Models/Transacoe'

export default class TransacaoExtratoesController {
    public async listarTransacao({ auth, response }: HttpContextContract) {
        try {
            const usuario_id = (await auth.authenticate()).id
            const transacoes = await Transacoe.query().where('usuario_id', usuario_id)
            if (transacoes.length == 0) {
                return response.status(404).json({ mensagem: 'Usuario não possue transacoes cadastradas.' })
            }
            const somarEntradas = transacoes
                .filter((transacao) => transacao.tipo === 'entrada')
                .reduce((acc, transacao) => acc + transacao.valor, 0);

            const somarSaidas = transacoes
                .filter((transacao) => transacao.tipo === 'saida')
                .reduce((acc, transacao) => acc + transacao.valor, 0)

            const objResposta = {
                somarEntradas,
                somarSaidas
            }
            return response.status(200).json(objResposta)
        } catch (error) {
            return response.status(500).json({ mensagem: 'Erro interno do servidor.', obs: error.message })
        }
    }
}
