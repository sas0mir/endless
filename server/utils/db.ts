import postgres from "postgres";

const sql = postgres({
  database: 'endlessdb',
  transform: {
    undefined: null,
  }
})

export default sql
