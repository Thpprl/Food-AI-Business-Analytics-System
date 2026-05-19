export interface UserProps {
  id?: string;
  email: string;
  role?: string;
  created_at?: Date;
  password: string;
}

export class User implements UserProps {
  id?: string;
  email: string;
  role?: string;
  created_at?: Date;
  password: string;

  constructor(user: UserProps) {
    Object.assign(this, user);
  }

  public static newUser(props: Omit<UserProps, 'id'>) {
    const now = new Date();
    return new User({
      ...props,
      created_at: now,
    });
  }

}
