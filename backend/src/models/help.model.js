import sql from "../config/db.js";

// Get all open requests
export const getOpenRequests = async () => {
  return await sql`
    SELECT 
      hr.id as "_id",
      hr.title, hr.description, hr.category,
      hr.urgency, hr.location, hr.status, hr.created_at,
      u.name as requester_name, u.id as requester_id
    FROM help_requests hr
    JOIN users u ON hr.requester_id = u.id
    WHERE hr.status = 'open'
    ORDER BY 
      CASE hr.urgency WHEN 'high' THEN 1 WHEN 'medium' THEN 2 ELSE 3 END,
      hr.created_at DESC
  `;
};

// Get requests by user
export const getMyRequests = async (userId) => {
  return await sql`
    SELECT hr.*, u.name as helper_name
    FROM help_requests hr
    LEFT JOIN users u ON hr.helper_id = u.id
    WHERE hr.requester_id = ${userId}
    ORDER BY hr.created_at DESC
  `;
};

// Create request
export const createRequest = async ({ title, description, category, urgency, location, userId }) => {
  const result = await sql`
    INSERT INTO help_requests (title, description, category, urgency, location, requester_id)
    VALUES (${title}, ${description}, ${category}, ${urgency}, ${location}, ${userId})
    RETURNING *
  `;
  return result[0];
};

// Accept request
export const acceptRequest = async (id, helperId) => {
  const result = await sql`
    UPDATE help_requests
    SET status = 'accepted', helper_id = ${helperId}
    WHERE id = ${id} AND status = 'open'
    RETURNING *
  `;
  return result[0];
};

// Complete request
export const completeRequest = async (id, requesterId) => {
  const result = await sql`
    UPDATE help_requests
    SET status = 'completed'
    WHERE id = ${id} AND requester_id = ${requesterId}
    RETURNING *
  `;
  return result[0];
};

// Get request by ID
export const getRequestById = async (id) => {
  const result = await sql`SELECT * FROM help_requests WHERE id = ${id}`;
  return result[0] || null;
};
