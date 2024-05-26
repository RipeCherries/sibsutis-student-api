import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import UserModel from './userModel';

@Table({
  timestamps: true,
  tableName: 'tokens',
  modelName: 'TokenModel',
})
class TokenModel extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  // @ts-expect-error
  id: number;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  // @ts-expect-error
  userID: number;

  @BelongsTo(() => UserModel)
  // @ts-expect-error
  user: UserModel;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  // @ts-expect-error
  refreshToken: string;
}

export default TokenModel;
