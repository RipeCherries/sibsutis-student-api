import {
  DataType,
  Model,
  Table,
  Column,
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import hashingPassword from '../utils/hashPassword';
import GroupModel from './groupModel';

@Table({
  timestamps: true,
  tableName: 'users',
  modelName: 'UserModel',
})
class UserModel extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  // @ts-expect-error
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  // @ts-expect-error
  firstname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  // @ts-expect-error
  lastname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  // @ts-expect-error
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  // @ts-expect-error
  password: string;

  @ForeignKey(() => GroupModel)
  @Column
  // @ts-expect-error
  groupID: number;

  @BelongsTo(() => GroupModel)
  // @ts-expect-error
  group: GroupModel;

  @BeforeCreate
  @BeforeUpdate
  static generateHashedPassword(instance: UserModel): void {
    if (instance.changed('password')) {
      const password = instance.getDataValue('password');
      const hashedPassword = hashingPassword(password);
      instance.setDataValue('password', hashedPassword);
    }
  }
}

export default UserModel;
