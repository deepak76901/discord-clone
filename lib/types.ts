export interface Profile {
  id: string;
  userId: string;
  name: string;
  email: string;
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
  servers?: Server[] | null;
  members?: Member[] | null;
  channels?: Channel[] | null;
}

type Server = string;
type Channel = string;
type Member = string;