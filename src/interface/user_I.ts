export interface signUp_I {
  username: string;
  email: string;
  password: string;
  accountname: string;
  intro: string;
  image: string[];
}

export interface login_I {
  email: string;
  password: string;
}

export interface accountname_I {
  accountname: string | undefined;
}
