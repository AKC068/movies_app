import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Directors } from '../directors/directors.entity';
import { Users } from '../users/users.entity';
import { Wishlist } from '../wishlist/wishlist.entity';

@Table({
  tableName: 'movies',
})
export class Movies extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  id: bigint;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  yearReleased: number;

  // many movies can belongs to a director

  @ForeignKey(() => Directors)
  @Column({
    allowNull: false,
  })
  directorId: bigint;

  // many movies input can belongs to a user

  @ForeignKey(() => Users)
  @Column({
    allowNull: false,
  })
  userId: bigint;

  // Associations

  @BelongsTo(() => Users)
  users: Users;

  @BelongsTo(() => Directors)
  directors: Directors;

  @HasMany(() => Wishlist)
  wishlist: Wishlist[];
}
