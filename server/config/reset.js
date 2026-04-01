import { pool } from './database.js'

const createTables = async () => {
  const client = await pool.connect()
  try {
    await client.query(`
      DROP TABLE IF EXISTS custom_cars;

      CREATE TABLE custom_cars (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        convertible BOOLEAN DEFAULT false,
        exterior VARCHAR(100) NOT NULL DEFAULT 'Midnight Black',
        roof VARCHAR(100) NOT NULL DEFAULT 'Standard',
        wheels VARCHAR(100) NOT NULL DEFAULT 'Standard 18"',
        interior VARCHAR(100) NOT NULL DEFAULT 'Standard Cloth',
        total_price INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)
    console.log('Tables created successfully')
  } catch (err) {
    console.error('Error creating tables:', err)
  } finally {
    client.release()
    pool.end()
  }
}

createTables()
