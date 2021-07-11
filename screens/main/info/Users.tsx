import * as React from "react";
import { Text } from "react-native";

import Card from "../../../components/Card";
import Screen from "../../../components/Screen";
import useFirebase from "../../../hooks/useFirebase";

export type DBUser = { id: string; name: string; committee: boolean };

export interface UsersProps {}

const Users: React.FC<UsersProps> = () => {
  const users = useFirebase<DBUser>("/users");

  return (
    <Screen>
      {users
        .sort((a, b) => {
          if ((a.committee && b.committee) || (!a.committee && !b.committee)) {
            return a.name.localeCompare(b.name);
          } else if (b.committee) {
            return 1;
          } else {
            return -1;
          }
        })
        .map(user => (
          <Card title={user.name} key={user.id}>
            {user.committee && <Text>Committee Member</Text>}
          </Card>
        ))}
    </Screen>
  );
};

export default Users;
