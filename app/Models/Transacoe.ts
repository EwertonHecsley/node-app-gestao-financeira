import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Categoria from './Categoria'

export default class Transacoe extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public descricao: string

  @column()
  public valor: number

  @column()
  public categoria_id: number

  @column()
  public usuario_id: number

  @column()
  public tipo: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @belongsTo(() => Categoria, {
    foreignKey: 'categoria_id',
  })
  public categoria: BelongsTo<typeof Categoria>

}
