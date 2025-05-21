import express from 'express';
import { Pool } from 'pg';
const app = express();
const PORT = 3000;

// Example DB URL (will vary for Mongo/Postgres)
const DB_URL = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: DB_URL,
}); 

app.get("/", async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bible (
        id SERIAL PRIMARY KEY,
        book TEXT NOT NULL,
        chapter INT,
        verse INT,
        text TEXT
      );
    `);

    await pool.query(`
      INSERT INTO bible (book, chapter, verse, text)
      VALUES ('Genesis', 1, 1, 'In the beginning God created the heavens and the earth.');    
      `);

    const result = await pool.query(`
        SELECT * FROM Bible;
      `);

    res.json(result.rows);
  } catch (err) {
    console.error("Error querying database:", err);
    res.status(500).send("Database error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
