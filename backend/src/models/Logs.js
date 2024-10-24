import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";
import os from 'os';

// const system = os.platform(); // Esto te dará el nombre del sistema operativo (e.g., 'win32', 'linux')

export const Logs = sequelize.define(
  "logs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    httpMethod: {
      type: DataTypes.TEXT,
    },
    action: {
      type: DataTypes.TEXT,
    },
    endPoint: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    system: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('now'),
    },
  },
  {
    timestamps: false,
  }
);
