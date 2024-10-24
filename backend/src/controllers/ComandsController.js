import { Logs } from "../models/Logs.js";

export const getLogs = async (req, res) => {
    try {

        const data = await Logs.findAll();
        res.json(data);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ message: "Error en el servidor." });
    }
};

export const getOneLogs = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Logs.findOne({
            where: { id: id },
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
export const addLogs = async (req, res) => {
    try {
        const data = req.body;
        // const newData = await Logs.create(data);
        res.json({ message: `agregado con éxito`, data: data });
    } catch (error) {
        // manejo de errores si ocurre algún problema durante la creación del usuario
        console.error("error al crear la cuenta:", error);
    }
};
export const deleteLogs = async (req, res) => {
    try {
        await Logs.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.json({ message: "Cuenta eleminado con éxito" });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const updateLogs = async (req, res) => {
    const data = req.body;

    try {
        await Logs.update(data,
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.json({ message: "cuenta editado con éxito" });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

