export interface SignUp_I {
  username: string;
  email: string;
  password: string;
  accountname: string;
  intro: string;
  image: string[];
}

export interface Login_I {
  email: string;
  password: string;
}

export interface Accountname_I {
  accountname: string | undefined;
}
