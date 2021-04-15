import { Report } from "../../server/models/report";
import { Server } from "http";

import request from "supertest";
import * as Application from "../../server/Application";
import seedData from "../../server/seed/report.json";

describe("api/v1", () => {
  let express;
  let application;

  beforeAll(async () => {
    const listenSpy = jest
      .spyOn(Server.prototype, "listen")
      .mockImplementation();
    application = Application;
    await application.start();

    express = application.app; //
    listenSpy.mockRestore();
  });

  beforeEach(async () => {
    await Promise.all(
      seedData.elements.map(({ _id, ...report }) =>
        new Report({ id: _id, ...report }).save()
      )
    );
  });

  afterEach(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    await Report.deleteMany({});
  });

  afterAll(async () => {
    jest.restoreAllMocks();
    await application.shutdown();
  });
  it("should return all reports that are not closed", async () => {
    const result = await request(express).get("/api/v1/reports");
    expect(result.status).toBe(200);
    expect(result.body).toHaveLength(25);
  });
  it ('should close reports with id specified', async()=>{
    const result = await request(express).put('/api/v1/reports/report/6706b3ba-bf36-4ad4-9b9d-4ebf4f4e2429').send({ticketState: 'CLOSED'})
    expect(result.status).toBe(200);
    expect(result.body).toHaveLength(1);

    const response = await request(express).get("/api/v1/reports");
    expect(response.status).toBe(200);

    expect(response.body).toHaveLength(24);
  });
  it ('should throw error when the specified id does not exist', async()=>{
    const result = await request(express).put('/api/v1/reports/report/not-exist').send({ticketState: 'CLOSED'})
    expect(result.status).toBe(404);

    expect(result.body.message).toEqual('report(s) with id: not-exist not found');
  })
});