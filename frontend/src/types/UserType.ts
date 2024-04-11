export type UserType = {
  firstName: string;
  lastName: string;
  preferredLanguage: string;
  userRatings: UserRating[]
};

type UserRating = {
  spotifyId: string,
  rating: number
}
