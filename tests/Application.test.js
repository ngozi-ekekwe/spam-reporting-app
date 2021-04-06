import { Server } from 'http';
import request from 'supertest';

import * as Application from "../server/Application";

describe('Application configuration test', () => {
  let express;
  let application;

  beforeAll(async () => {
    const listenSpy = jest.spyOn(Server.prototype, 'listen').mockImplementation();
    application = Application;
    await application.start();

    express = application.app;
    listenSpy.mockRestore();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  afterAll(async () => {
    jest.restoreAllMocks();
    await application.shutdown();
  });

  describe('Spam Service Routes', () => {
    it('should return 404 if route is not found', async() => {
        const response = await request(express).get('/unknown').expect('Content-Type', /json/);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("route not found");  
    });

    it('should return healthcheck', async () => {
      const response = await request(express).get('/health').expect('Content-Type', /json/);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("OK");
    });

    it('should return healthcheck', async () => {
      const response = await request(express).get('/').expect('Content-Type', /json/);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Spam API service");
    });
  })
})