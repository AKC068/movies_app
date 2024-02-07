export class CreateMoviesDto {
  readonly id: bigint;
  readonly name: string;
  readonly yearReleased: number;
  readonly directorId: bigint;
  userId: bigint;
}
