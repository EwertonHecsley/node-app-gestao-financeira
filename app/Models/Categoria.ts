import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany, } from '@ioc:Adonis/Lucid/Orm'
import Transacoe from './Transacoe'

export default class Categoria extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public usuario_id: number

  @column()
  public descricao: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @hasMany(() => Transacoe)
  public transacoes: HasMany<typeof Transacoe>

}
