export interface User {
  name: string;
  email: string;
  image: string;
}

export interface UserNavProps {
  user: User;
}

export interface NavbarProps {
  user: User;
}

export interface linkProps {
  name: string;
  href: string;
}
