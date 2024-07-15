import { getAllJoyasModel, filterJoyasModel } from '../models/joyas.models.js';

// Controlador para obtener todas las joyas con HATEOAS
export const getAllJoyas = async (req, res) => {
    try {
        let { limits = 3, page = 1, order_by = 'id_DESC' } = req.query;
        
        // Convertir a números si son strings
        limits = +limits;
        page = +page;

        const result = await getAllJoyasModel(limits, page, order_by);
        
        // Calcular el total de joyas y stock total
        const totalJoyas = result.length;
        const stockTotal = result.reduce((acc, joya) => acc + joya.stock, 0);

        // Construcción enlaces HATEOAS
        const baseURL = `/joyas`;
        const nextLink = `${baseURL}?limits=${limits}&page=${page + 1}&order_by=${order_by}`;
        const prevLink = `${baseURL}?limits=${limits}&page=${page - 1}&order_by=${order_by}`;
        
        // Construcción estructura HATEOAS
        const links = {
            next: page * limits < totalJoyas ? nextLink : null,
            prev: page > 1 ? prevLink : null
        };

        const results = result.map(joya => ({
            name: joya.nombre,
            href: `${baseURL}/joya/${joya.id}`
        }));

        res.status(200).json({
            totalJoyas,
            stockTotal,
            results,
            links
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para obtener joyas filtradas
export const getFilteredJoyas = async (req, res) => {
    try {
        const { precio_min = 0, precio_max = Number.MAX_VALUE, categoria, metal } = req.query;
        
        // Convertir a números si son strings
        const precioMin = +precio_min;
        const precioMax = +precio_max;

        const result = await filterJoyasModel(precioMin, precioMax, categoria, metal);
        
        const filteredJoyas = result.map(joya => ({
            id: joya.id,
            nombre: joya.nombre,
            categoria: joya.categoria,
            metal: joya.metal,
            precio: joya.precio,
            stock: joya.stock
        }));

        res.status(200).json(filteredJoyas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};