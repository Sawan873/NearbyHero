import sql from "./db.js";

const createTables = async () => {
  try {
    // Users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(20) DEFAULT 'both' CHECK (role IN ('requester', 'helper', 'both')),
        rating DECIMAL(3,2) DEFAULT 0,
        total_ratings INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Help requests table
    await sql`
      CREATE TABLE IF NOT EXISTS help_requests (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        urgency VARCHAR(20) DEFAULT 'low' CHECK (urgency IN ('low', 'medium', 'high')),
        location VARCHAR(200) NOT NULL,
        status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'accepted', 'completed')),
        requester_id UUID REFERENCES users(id) ON DELETE CASCADE,
        helper_id UUID REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Ratings table
    await sql`
      CREATE TABLE IF NOT EXISTS ratings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        request_id UUID REFERENCES help_requests(id) ON DELETE CASCADE,
        rated_by UUID REFERENCES users(id) ON DELETE CASCADE,
        rated_user UUID REFERENCES users(id) ON DELETE CASCADE,
        score INTEGER CHECK (score BETWEEN 1 AND 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    console.log("✅ All tables created successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating tables:", err.message);
    process.exit(1);
  }
};

createTables();
