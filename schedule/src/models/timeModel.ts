import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'times',
  modelName: 'timeModel',
})
class TimeModel extends Model {
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
  startHour: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  // @ts-expect-error
  startMinutes: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  // @ts-expect-error
  endHour: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  // @ts-expect-error
  endMinutes: string;
}

export default TimeModel;
