import sql from "../config/db.js";

// Get user by email
export const getUserByEmail = async (email) => {
  const result = await sql`SELECT * FROM users WHERE email = ${email}`;
  return result[0] || null;
};

// Get user by ID
export const getUserById = async (id) => {
  const result = await sql`
    SELECT id, name, email, role, rating, total_ratings, created_at 
    FROM users WHERE id = ${id}
  `;
  return result[0] || null;
};

// Create user
export const createUser = async ({ name, email, password, role }) => {
  const result = await sql`
    INSERT INTO users (name, email, password, role)
    VALUES (${name}, ${email}, ${password}, ${role})
    RETURNING id, name, email, role
  `;
  return result[0];
};
