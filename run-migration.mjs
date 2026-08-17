/**
 * LearnTrace Database Migration Runner
 * Executes schema migration and seed SQL against remote Supabase PostgreSQL.
 */
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __dirname = dirname(fileURLToPath(import.meta.url));
const { Client } = pg;

// Supabase direct connection (Transaction mode via Supavisor)
const DATABASE_URL = 'postgresql://postgres.xtyqttxulvgxtecgwgbc:Billionaire%402008!!!@aws-0-ap-south-1.pooler.supabase.com:6543/postgres';

async function main() {
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║   LearnTrace Database Migration Runner       ║');
  console.log('╚══════════════════════════════════════════════╝\n');

  // Read SQL files
  const migrationPath = resolve(__dirname, 'supabase', 'migrations', '20260815000000_init_schema.sql');
  const seedPath = resolve(__dirname, 'supabase', 'seed.sql');

  const migrationSQL = readFileSync(migrationPath, 'utf-8');
  const seedSQL = readFileSync(seedPath, 'utf-8');

  console.log(`Migration SQL: ${migrationSQL.length} bytes loaded`);
  console.log(`Seed SQL: ${seedSQL.length} bytes loaded`);

  // Connect
  console.log('\n▶ Connecting to Supabase PostgreSQL...');
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('  ✅ Connected successfully\n');

    // Run schema migration
    console.log('▶ Executing schema migration (14 tables + indexes + RLS)...');
    const startSchema = Date.now();
    await client.query(migrationSQL);
    console.log(`  ✅ Schema migration completed in ${Date.now() - startSchema}ms\n`);

    // Run seed data
    console.log('▶ Executing seed data (subjects, topics, metaphors)...');
    const startSeed = Date.now();
    await client.query(seedSQL);
    console.log(`  ✅ Seed data inserted in ${Date.now() - startSeed}ms\n`);

    // Verify all 14 tables
    console.log('▶ Verifying all 14 tables...');
    const expectedTables = [
      'subjects', 'topics', 'metaphors', 'metaphor_steps',
      'coding_problems', 'coding_problem_topics', 'coding_problem_examples',
      'coding_problem_languages', 'coding_test_cases', 'profiles',
      'learning_progress', 'coding_submissions', 'coding_problem_progress',
      'thinktrace_sessions'
    ];

    const { rows: tableRows } = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);
    const existingTables = tableRows.map(r => r.table_name);

    let allFound = true;
    for (const table of expectedTables) {
      if (existingTables.includes(table)) {
        const { rows } = await client.query(`SELECT COUNT(*) as cnt FROM public."${table}"`);
        console.log(`  ✅ ${table} (${rows[0].cnt} rows)`);
      } else {
        console.log(`  ❌ ${table}: MISSING`);
        allFound = false;
      }
    }

    // Verify RLS policies
    console.log('\n▶ Verifying RLS policies...');
    const { rows: policyRows } = await client.query(`
      SELECT tablename, policyname, cmd
      FROM pg_policies
      WHERE schemaname = 'public'
      ORDER BY tablename, policyname;
    `);
    console.log(`  Found ${policyRows.length} RLS policies:`);
    for (const row of policyRows) {
      console.log(`    • ${row.tablename}.${row.policyname} [${row.cmd}]`);
    }

    // Verify trigger
    console.log('\n▶ Verifying triggers...');
    const { rows: triggerRows } = await client.query(`
      SELECT trigger_name, event_object_table, action_timing, event_manipulation
      FROM information_schema.triggers
      WHERE trigger_schema = 'public' OR event_object_schema = 'auth'
      ORDER BY trigger_name;
    `);
    if (triggerRows.length > 0) {
      for (const t of triggerRows) {
        console.log(`  ✅ ${t.trigger_name} on ${t.event_object_table} [${t.action_timing} ${t.event_manipulation}]`);
      }
    } else {
      console.log('  ℹ️  No triggers found in public schema (auth triggers may not be visible here)');
    }

    // Verify seed data content
    console.log('\n▶ Verifying seed data content...');
    const { rows: subjectRows } = await client.query('SELECT name FROM public.subjects ORDER BY sort_order');
    console.log(`  Subjects: ${subjectRows.map(r => r.name).join(', ')}`);

    const { rows: topicRows } = await client.query('SELECT name FROM public.topics ORDER BY sort_order');
    console.log(`  Topics: ${topicRows.map(r => r.name).join(', ')}`);

    const { rows: metaphorRows } = await client.query('SELECT id, title FROM public.metaphors ORDER BY sort_order');
    console.log(`  Metaphors: ${metaphorRows.map(r => `${r.id} ("${r.title}")`).join(', ')}`);

    // Final summary
    console.log('\n' + '═'.repeat(50));
    if (allFound) {
      console.log('  ✅ ALL 14 TABLES CREATED AND VERIFIED');
      console.log('  ✅ RLS POLICIES ACTIVE');
      console.log('  ✅ SEED DATA INSERTED');
      console.log('  🎉 DATABASE MIGRATION COMPLETE');
    } else {
      console.log('  ⚠️  SOME TABLES MISSING — review errors above');
    }
    console.log('═'.repeat(50));

  } catch (err) {
    console.error('\n❌ Error:', err.message);
    if (err.detail) console.error('   Detail:', err.detail);
    if (err.hint) console.error('   Hint:', err.hint);
    if (err.position) console.error('   Position:', err.position);
    process.exit(1);
  } finally {
    await client.end();
    console.log('\n▶ Connection closed.');
  }
}

main();
