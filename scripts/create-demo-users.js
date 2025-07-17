const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://aghanoor:G2Xvx3kQi5r82TSL@cluster0.6iuuagu.mongodb.net/trusted-brother2?retryWrites=true&w=majority';

// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['user', 'admin', 'moderator'], default: 'user' },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date, default: Date.now },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  phone: String,
  preferences: {
    emailNotifications: { type: Boolean, default: true },
    orderUpdates: { type: Boolean, default: true },
  },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Demo users data
const demoUsers = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin"
  },
  {
    name: "John Doe",
    email: "user@example.com", 
    password: "user123",
    role: "user"
  },
  {
    name: "Jane Smith",
    email: "moderator@example.com",
    password: "moderator123", 
    role: "moderator"
  },
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    password: "alice123",
    role: "user"
  },
  {
    name: "Bob Wilson",
    email: "bob@example.com", 
    password: "bob123",
    role: "user"
  }
];

async function createDemoUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing demo users
    await User.deleteMany({ 
      email: { $in: demoUsers.map(user => user.email) } 
    });
    console.log('🧹 Cleared existing demo users');

    // Hash passwords and create users
    const hashedUsers = await Promise.all(
      demoUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 12)
      }))
    );

    // Insert demo users
    await User.insertMany(hashedUsers);

    console.log('✅ Demo users created successfully!');
    console.log('\n🔑 Login credentials:');
    console.log('👑 Admin: admin@example.com / admin123');
    console.log('🛡️  Moderator: moderator@example.com / moderator123');
    console.log('👤 User: user@example.com / user123');
    console.log('👤 Alice: alice@example.com / alice123');
    console.log('👤 Bob: bob@example.com / bob123');

    console.log('\n📋 Role-based access:');
    console.log('• Admin: Full access to dashboard, user management, products, orders');
    console.log('• Moderator: Dashboard access, order management');
    console.log('• User: Profile, order history, shopping cart');

  } catch (error) {
    console.error('❌ Error creating demo users:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

// Run the function
createDemoUsers();