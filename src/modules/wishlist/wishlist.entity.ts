import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Movies } from '../movies/movies.entity';
import { Users } from '../users/users.entity';

@Table({
  tableName: 'wishlist',
})
export class Wishlist extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  id: bigint;

  @ForeignKey(() => Users)
  @Column({
    allowNull: false,
  })
  userId: bigint;

  @ForeignKey(() => Movies)
  @Column({
    allowNull: false,
  })
  movieId: bigint;

  //   Associations

  @BelongsTo(() => Users)
  users: Users;

  @BelongsTo(() => Movies)
  movies: Movies;
}
