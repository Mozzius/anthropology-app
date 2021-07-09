import React from "react";

export type Event = {
  uid: string;
  attended: boolean;
};

export type User = {
  uid: string;
  email: string;
  name: string;
  committee: boolean;
  stamps: { [uid: string]: { attended: boolean } };
};

export const blankUser: User = {
  uid: "",
  email: "",
  name: "",
  committee: false,
  stamps: {},
};

export const UserContext = React.createContext<User>(blankUser);
