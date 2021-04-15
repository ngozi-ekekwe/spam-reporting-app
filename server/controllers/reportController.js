import { Router } from "express";
import { exception as HttpError } from "express-exception-handler";

import { Report } from "../models/report";
import { transformData } from "../utils";

require("express-async-errors");

const router = Router();

router.get("/reports", async (_request, response) => {
  const reports = await Report.find({ state: { $nin: ["CLOSED"] } }).exec();
  response.status(200).send(reports.map(transformData));
});

router.put("/reports/:reportId", async (request, response) => {
  const { reportId } = request.params;
  const { ticketState } = request.body;
  const updated = await Report.updateMany(
    { "payload.reportId": reportId },
    {
      $set: {
        state: ticketState,
      },
    }
  ).exec();
  const reports = await Report.find({
    "payload.reportId": reportId,
  });

  if (updated.n) {
    response.status(200).send(reports.map(transformData));
    return;
  }
  throw new HttpError("Unable to update report", 404, {
    message: `report(s) with id: ${reportId} not found`,
  });
});

export default router;
