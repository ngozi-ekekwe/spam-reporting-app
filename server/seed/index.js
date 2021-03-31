import mongoose from "mongoose"
import dotenv from "dotenv";
import data from "./report.json";
import { Report } from "../models/report";

dotenv.config();

export async function seedData(exit = false) {
  const { MONGO_URI, NODE_ENV = 'development' } = process.env;

  try {
    if (!MONGO_URI) {
      throw new Error("`MONGODB_URI` not set");
    }

    await mongoose.connect(`${MONGO_URI}_${NODE_ENV}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      keepAlive: true,
      useFindAndModify: false,
    });
  } catch (err) {
    throw new Error(`Error connecting to db ${err.message || err}`);
  }

  console.log(`Attempting to seed ${data.elements.length} reports`);

  await Promise.all(
    data.elements.map(async ({id, ...value}) => {
      try {
        let report = await Report.findById(id);
        if (!report) {
          report = await new Report({_id: id, ...value}).save();
        }

        return report;
      } catch (err) {
        console.log(err, "Failed to seed report", value);
      }
    })
  );
  // Done
  exit && process.exit(0);
}

process.argv[2] === "run-seed" && seedData(true);
