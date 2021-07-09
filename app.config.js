import "dotenv/config";

export default {
  name: "Anthropology App",
  version: "0.1.0",
  extra: {
    FIREBASE_API: process.env.FIREBASE_API,
    FIREBASE_URL: process.env.FIREBASE_URL,
    FIREBASE_DB: process.env.FIREBASE_DB,
  },
};
