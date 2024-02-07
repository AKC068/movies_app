import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Movies } from "../movies/movies.entity";
import { Wishlist } from "../wishlist/wishlist.entity";

@Table({
  tableName: "users",
})
export class Users extends Model {
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
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  // Associations

  @HasMany(() => Movies)
  movies: Movies[];

  @HasMany(() => Wishlist)
  wishlist: Wishlist[];
}
