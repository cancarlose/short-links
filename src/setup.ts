import { sql } from './lib/postgres';

async function setup() {
  await sql/*sql*/ `CREATE TABLE IF NOT EXISTS shorts_links`
}

setup()