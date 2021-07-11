import * as React from "react";
import firebase from "firebase/app";

export const useFirebaseValue = <T,>(ref) => {
  const [data, setData] = React.useState<T | undefined>();

  React.useEffect(() => {
    const stampsRef = firebase.database().ref(ref);
    const getStamps = snapshot => {
      const value = snapshot.val();
      if (value !== null) {
        setData(value);
      } else {
        console.error(`${ref} returned null`);
        setData(undefined);
      }
    };
    stampsRef.on("value", getStamps);
    return () => stampsRef.off("value", getStamps);
  }, [ref]);

  return data;
};

const useFirebase = <T extends { id: string }>(ref) => {
  const [data, setData] = React.useState<T[]>([]);

  React.useEffect(() => {
    const stampsRef = firebase.database().ref(ref);
    const getStamps = snapshot => {
      const values = snapshot.val();
      if (values !== null) {
        setData(Object.keys(values).map(key => ({ id: key, ...values[key] })));
      } else {
        console.error(`${ref} returned null`);
        setData([]);
      }
    };
    stampsRef.on("value", getStamps);
    return () => stampsRef.off("value", getStamps);
  }, [ref]);

  return data;
};

export default useFirebase;
