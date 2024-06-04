interface ISeedUser {
  // id: number;
  fullname: string;
  dni: string;
  age: number;
  email: string;
  password: string;
}

interface ISeedData {
  users: ISeedUser[];
}

export const initalData = {
  users: [
    {
      fullname: "Anderson Rivera",
      dni: "12234445",
      age: 25,
      email: "anderson@gmail.com",
      password: "and1234",
    },
    {
      fullname: "Jhon Doe",
      dni: "399421",
      age: 21,
      email: "jhon@gmail.com",
      password: "jhpn2223",
    },
    {
      fullname: "Javier Perez",
      dni: "9938884",
      age: 30,
      email: "javi@gmail.com",
      password: "344422",
    },
  ],
};
