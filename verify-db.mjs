import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: 'aws-0-ap-south-1.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  user: 'postgres.xtyqttxulvgxtecgwgbc',
  password: process.env.Supabase_Password,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    console.log('Connecting to database...');
    const result = await pool.query(`
      UPDATE public.subjects 
      SET name = 'Data Structures (DB Verified)' 
      WHERE slug = 'data-structures'
      RETURNING *;
    `);
    console.log('Updated subject:', result.rows[0]);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}

run();
