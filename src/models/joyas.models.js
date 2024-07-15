import pool from '../../database/config.js';
import format from 'pg-format';

export const getAllJoyasModel = async (limits = 3, page = 1, order_by = 'id_DESC') => {
    const offset = (page - 1) * limits;

// Validar y construir la cláusula ORDER BY
    const validColumns = ['id', 'nombre', 'categoria', 'metal', 'precio', 'stock'];
    const orderParts = order_by.split('_');
    const orderBy = validColumns.includes(orderParts[0]) ? `${orderParts[0]} ${orderParts[1]}` : 'id DESC';

    const query = format(`
        SELECT *
        FROM inventario
        ORDER BY %s
        LIMIT %s OFFSET %s
    `, orderBy, limits, offset);

    const result = await pool.query(query);
    return result.rows;
};

// Filtra las joyas por precio mínimo, máximo, categoría y metal
export const filterJoyasModel = async (precio_min, precio_max, categoria, metal) => {
    const filters = [];
    const values = [];

    if (precio_min) {
        filters.push('precio >= %s');
        values.push(precio_min);
    }

    if (precio_max) {
        filters.push('precio <= %s');
        values.push(precio_max);
    }

    if (categoria) {
        filters.push('categoria = %s');
        values.push(categoria);
    }

    if (metal) {
        filters.push('metal = %s');
        values.push(metal);
    }

    const query = format(`
        SELECT *
        FROM inventario
        ${filters.length > 0 ? 'WHERE ' + filters.join(' AND ') : ''}
    `, ...values);

    const result = await pool.query(query);
    return result.rows;
};