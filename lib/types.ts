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

export interface Server {
  id: string;
  name: string;
  imageUrl: string;
  inviteCode: string;
  profileId: string;
  profile?: Profile;

  members?: Member[] | null;
  channels?: Channel[] | null;
}
type Channel = string;
type Member = string;
