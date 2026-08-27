import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export default async function dbConnection(): Promise<void> {
  if (connection.isConnected) {
    console.log("Database connection is already established");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {
      serverSelectionTimeoutMS: 5000,
    });
    connection.isConnected = db.connections[0].readyState;
    console.log("status true 200 database connected successfully");
  } catch (error) {
    console.log(
      "Error 500 something went wrong while stablish connection between database",
      error,
    );
    process.exit(1);
  }
}
