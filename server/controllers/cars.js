import { pool } from '../config/database.js'

const getCars = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM custom_cars ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch cars' })
  }
}

const getCar = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM custom_cars WHERE id = $1', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' })
    }
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch car' })
  }
}

const createCar = async (req, res) => {
  try {
    const { name, convertible, exterior, roof, wheels, interior, total_price } = req.body
    const result = await pool.query(
      `INSERT INTO custom_cars (name, convertible, exterior, roof, wheels, interior, total_price)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, convertible, exterior, roof, wheels, interior, total_price]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create car' })
  }
}

const updateCar = async (req, res) => {
  try {
    const { id } = req.params
    const { name, convertible, exterior, roof, wheels, interior, total_price } = req.body
    const result = await pool.query(
      `UPDATE custom_cars
       SET name = $1, convertible = $2, exterior = $3, roof = $4,
           wheels = $5, interior = $6, total_price = $7
       WHERE id = $8 RETURNING *`,
      [name, convertible, exterior, roof, wheels, interior, total_price, id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' })
    }
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update car' })
  }
}

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM custom_cars WHERE id = $1 RETURNING *', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' })
    }
    res.json({ message: 'Car deleted successfully', car: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete car' })
  }
}

export { getCars, getCar, createCar, updateCar, deleteCar }
