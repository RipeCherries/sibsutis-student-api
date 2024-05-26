import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'groups',
  modelName: 'GroupModel',
})
class GroupModel extends Model {
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
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  // @ts-expect-error
  status: string;
}

export default GroupModel;
