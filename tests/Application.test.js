import Express from 'express';
import { Server } from 'http';
import request from 'supertest';

import Application from "../server/Application";

describe('Application configuration test', () => {
  let express;
  let application;

  beforeAll(() => {

  });

  afterEach(() => {

  });

  afterAll(() => {

  });

  describe('Spam Service Routes', () => {
    it('should return 404 if route is not found', () => {
      const response = await request(express).get('/unknown').expect('Content-Type', /json/);
    });

    it('should return healthcheck', () => {

    })
  })
})