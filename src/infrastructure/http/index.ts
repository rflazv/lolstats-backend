import { Server } from './Server';
import { Routes } from './api/Routes';

const API = new Routes();

new Server(API.routes).start();