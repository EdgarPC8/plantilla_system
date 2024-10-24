// import { searchUser } from "../database/connection.js";
// import { sequelize } from "../database/connection.js";
import { Users } from "../models/Users.js";
import { Account } from "../models/Account.js";
import bycrypt from "bcrypt";
import { createAccessToken, getHeaderToken, verifyJWT } from "../libs/jwt.js";
// import jwt from "jsonwebtoken";
import { Roles } from "../models/Roles.js";
// import { UserRoles } from "../Models/UserRoles.js";
import { logger } from "../log/LogActivity.js";


// Llamar a la función para agregar un usuario
// agregarUsuario("admin", "contraseña", 1);

export const login = async (req, res) => {

  const { username, password} = req.body;
  const system=req.headers['user-agent'];

  try {
    const account = await Account.findOne({
      where: { username },
      include: [
        {
          model: Roles,
          as: 'role',
        },
        {
          model: Users,
          as: 'user',
        },
      ],
    });
    

    if (!account) {
      return res.status(400).json({ message: "Datos incorrectos" });
    }

    const isCorrectPassword = await bycrypt.compare(password, account.password);

    if (!isCorrectPassword) {
      return res.status(400).json({ message: "Datos incorrectos" });
    }


    const payload = {
      userId: account.userId,
      loginRol: account.role.name,
      rolId: account.role.id,
      accountId: account.id,
      // username: account.username,
      // photo: account.user.photo,
      // firstName:account.user.firstName,
      // secondName:account.user.secondName,
      // firstLastName:account.user.firstLastName,
      // secondLastName:account.user.secondLastName,
      // gender:account.user.gender,
      // birthday:account.user.birthday,
    };
    
    // //Crear token JWT
    const token = await createAccessToken({ payload });
    const user=account.user

    logger({
      httpMethod: req.method,
      endPoint: req.originalUrl,
      action: "Se a Logeado al Sistema",
      description: `EL ${account.role.name} ${user.firstName} ${user.secondName} ${user.firstLastName} ${user.secondLastName} con CI: ${user.ci}`,
      system:system
    });



    res.json({ message: "User auth",token });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const verifytoken = async (req, res) => {
  
  try {
    const token = getHeaderToken(req);

  if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = await verifyJWT(token);

    res.json(decoded);
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// export { login, verifytoken };
