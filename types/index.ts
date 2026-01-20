export interface Game {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  coverImage: string;
  screenshots: string[];
  releaseDate: string;
  links: {
    steam?: string;
    itch?: string;
    googlePlay?: string;
  };
}

export interface TeamMember {
  id: number;
  name: string;
  slug: string;
  role: string;
  photo: string;
  socialLink: string;
  bio?: any[];
  skills?: string[];
  favoriteGame?: string;
  socials?: {
    linkedin?: string;
    github?: string;
    artstation?: string;
  };
}
