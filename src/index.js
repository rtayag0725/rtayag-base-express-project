"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
const PORT = 3000;
// Example DB URL (will vary for Mongo/Postgres)
const DB_URL = process.env.DATABASE_URL;
const pool = new pg_1.Pool({
    connectionString: DB_URL,
});
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pool.query(`
      CREATE TABLE IF NOT EXISTS bible (
        id SERIAL PRIMARY KEY,
        book TEXT NOT NULL,
        chapter INT,
        verse INT,
        text TEXT
      );
    `);
        yield pool.query(`
      INSERT INTO bible (book, chapter, verse, text)
      VALUES ('Genesis', 1, 1, 'In the beginning God created the heavens and the earth.');    
      `);
        const result = yield pool.query(`
        SELECT * FROM Bible;
      `);
        res.json(result.rows);
    }
    catch (err) {
        console.error("Error querying database:", err);
        res.status(500).send("Database error");
    }
}));
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
