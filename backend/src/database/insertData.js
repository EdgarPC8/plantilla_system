import { promises as fs } from 'fs';
import { resolve } from 'path';
import { Roles } from '../models/Roles.js';
import { Users } from '../models/Users.js';
import { Account } from '../models/Account.js';
import { sequelize } from './connection.js';

const backupFilePath = resolve('./src/database/backup.json'); // Ruta del archivo de respaldo principal
const backups = resolve('./src/backups'); // Ruta para guardar copias de seguridad
async function clearTables() {
  const transaction = await sequelize.transaction();

  try {
    await Users.truncate({ transaction });
    await Roles.truncate({ transaction });
    await Account.truncate({ transaction });

    await transaction.commit();
    console.log("Todas las tablas han sido limpiadas exitosamente.");
  } catch (error) {
    await transaction.rollback();
    console.error("Error al limpiar las tablas:", error);
  }
}

export const insertData = async () => {

  try {
    // await clearTables()
    // Verifica si el archivo de respaldo ya existe

    await fs.access(backupFilePath);
    console.log("El archivo de respaldo ya existe.");

    // Si existe, lee los datos del archivo de respaldo
    const data = await fs.readFile(backupFilePath, 'utf8');
    const jsonData = JSON.parse(data);

    // Inserta los datos en la base de datos
    await Roles.bulkCreate(jsonData.Roles, { returning: true });
    await Users.bulkCreate(jsonData.Users, { returning: true });
    await Account.bulkCreate(jsonData.Account, { returning: true });

    console.log("Datos insertados correctamente desde el archivo de respaldo.");
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Si el archivo no existe, crea el archivo de respaldo vacío
      await fs.writeFile(backupFilePath, JSON.stringify({ Roles: [], Users: [], Account: [] }, null, 2));
      console.log("Archivo de respaldo creado: backup.json");
    } else {
      console.error("Error al insertar datos:", error);
    }
  }
};

let saveBackupCallCount = 0; // Contador

export const saveBackup = async () => {

  try {
    // Obtener los datos actuales de los modelos
    const rolesData = await Roles.findAll();
    const usersData = await Users.findAll();
    const accountData = await Account.findAll();

    // Crear el objeto de respaldo
    const backupData = {
      Roles: rolesData,
      Users: usersData,
      Account: accountData,
    };

    // Asegurarse de que la carpeta de backups exista
    await fs.mkdir(backups, { recursive: true });

    // Obtener la fecha y hora actuales
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19); // Formato: YYYY-MM-DDTHH-MM-SS
    const backupFileName = `backup-${timestamp}.json`; // Nombre del archivo de backup
    const backupPath = resolve(backups, backupFileName);

    // Guardar el backup en la carpeta especificada
    await fs.writeFile(backupPath, JSON.stringify(backupData, null, 2));
    console.log("Backup guardado correctamente en:", backupPath);

    // Actualizar el archivo de backup principal (backup.json)
    await fs.writeFile(backupFilePath, JSON.stringify(backupData, null, 2));
    console.log("Archivo de respaldo principal actualizado:", backupFilePath);

    return backupPath; // Retornar la ruta del archivo guardado
  } catch (error) {
    console.error("Error al guardar el backup:", error);
    throw error; // Lanzar el error para manejarlo más adelante
  }
};


export const downloadBackup = async (req, res) => {
  try {
    const backupData = await saveBackup(); // Guarda el backup y obtiene los datos

    // Enviar los datos como respuesta JSON
    res.status(200).json(backupData);
  } catch (error) {
    console.error("Error al realizar el backup:", error);
    res.status(500).send("Error al realizar el backup.");
  }
};
