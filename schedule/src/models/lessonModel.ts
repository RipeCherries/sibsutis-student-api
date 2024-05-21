import { DataType, Model, Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import TimeModel from './timeModel';

@Table({
  timestamps: true,
  tableName: 'lessons',
  modelName: 'LessonModel',
})
class LessonModel extends Model {
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
  type: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  // @ts-expect-error
  teacher: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  // @ts-expect-error
  classroom: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  // @ts-expect-error
  weekday: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  // @ts-expect-error
  group: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  // @ts-expect-error
  week: string;

  @ForeignKey(() => TimeModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  // @ts-expect-error
  timeID: number;

  @BelongsTo(() => TimeModel)
  // @ts-expect-error
  time: TimeModel;
}

export default LessonModel;
