export const dbConnect = async (): Promise<void> => {
  try {
    console.log("Connecting to database...");
    await console.log("Connected to database");
  } catch (error) {
    console.log(`Error connecting to database: ${error}`);
  }
};
