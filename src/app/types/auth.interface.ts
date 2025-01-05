export enum ROLES {
  admin = 'admin',
  standard = 'standard'
}

export interface Auth {
  email: string
  password: string
}

export interface LocalUser extends Auth {
  username: string,
  role: ROLES.admin | ROLES.standard,
  links: string[],
  selectedAvatar?: string
}

export interface FSUser extends LocalUser, Auth {
  emailverified: boolean;
  cratedAt: string | undefined;
  lastSignIn: string | undefined;
  photoURL: string | null;
  id?: string,
}