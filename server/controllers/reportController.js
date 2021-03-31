import { Router } from "express";
import { Report } from "../models/report";
import { transformData } from '../utils';

require("express-async-errors");
const router = Router();

router.get("/health", async(_request, response) => {
  try {
    response.send({
      uptime: process.uptime(),
      message: "OK",
      timestamp: Date.now(),
    });
  } catch (error) {
    response.status(503).send(error);
  }
});

router.get("/reports", async (_request, response) => {
  try {
    const reports = await Report.find({ state: "OPEN" }).exec();
    response.status(200).send(reports.map(transformData));
  } catch (error) {
    return { error, message: "Unable to fetch reports" };
  }
});

router.put("/reports/:reportId", async (request, response) => {
  const { id } = request.params;
  const { ticketState } = request.body;
  console.log(ticketState);
  try {
    const updated = await Report.updateMany(
      { "payload.reportId": id },
      {
        $set: {
          state: ticketState,
        },
      }
    ).exec();
    const reports = await Report.find({
      "payload.reportId": id,
    });
    console.log(updated)
    if (updated.ok) {
      response.status(200).send(reports.map(transformData));
    }
  } catch (error) {
    return { error, message: "Unable to update report with report id" };
  }
});

export default router;
