import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  images: [{ type: String, required: true }],
  stock: { type: Number, required: true, default: 0 },
  featured: { type: Boolean, default: false },
  specifications: { type: Map, of: String },
}, { timestamps: true });

// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  phone: String,
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Sample data
const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "Premium quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    price: 199.99,
    category: "Electronics",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"],
    stock: 25,
    featured: true,
    specifications: {
      "Battery Life": "30 hours",
      "Connectivity": "Bluetooth 5.0",
      "Weight": "250g",
      "Warranty": "2 years"
    }
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt available in multiple colors. Made from 100% organic cotton.",
    price: 29.99,
    category: "Clothing",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"],
    stock: 50,
    featured: false,
    specifications: {
      "Material": "100% Organic Cotton",
      "Fit": "Regular",
      "Care": "Machine washable",
      "Origin": "Made in USA"
    }
  },
  {
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracking watch with heart rate monitor, GPS, and smartphone connectivity. Track your health 24/7.",
    price: 299.99,
    category: "Electronics",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"],
    stock: 15,
    featured: true,
    specifications: {
      "Display": "1.4 inch AMOLED",
      "Battery": "7 days",
      "Water Resistance": "50m",
      "Sensors": "Heart rate, GPS, Accelerometer"
    }
  },
  {
    name: "Ceramic Coffee Mug Set",
    description: "Beautiful handcrafted ceramic coffee mugs. Set of 4 mugs perfect for your morning coffee or tea.",
    price: 45.99,
    category: "Home & Kitchen",
    images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500"],
    stock: 30,
    featured: false,
    specifications: {
      "Material": "Ceramic",
      "Capacity": "12 oz each",
      "Set Size": "4 mugs",
      "Dishwasher Safe": "Yes"
    }
  },
  {
    name: "Leather Laptop Bag",
    description: "Professional leather laptop bag with multiple compartments. Fits laptops up to 15 inches. Perfect for business and travel.",
    price: 129.99,
    category: "Accessories",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"],
    stock: 20,
    featured: true,
    specifications: {
      "Material": "Genuine Leather",
      "Laptop Size": "Up to 15 inches",
      "Dimensions": "16 x 12 x 4 inches",
      "Compartments": "Multiple pockets"
    }
  },
  {
    name: "Yoga Mat Premium",
    description: "High-quality non-slip yoga mat made from eco-friendly materials. Perfect for yoga, pilates, and fitness exercises.",
    price: 59.99,
    category: "Sports & Fitness",
    images: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500"],
    stock: 40,
    featured: false,
    specifications: {
      "Material": "Eco-friendly TPE",
      "Thickness": "6mm",
      "Size": "72 x 24 inches",
      "Non-slip": "Yes"
    }
  },
  {
    name: "Wireless Phone Charger",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.",
    price: 39.99,
    category: "Electronics",
    images: ["https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500"],
    stock: 35,
    featured: false,
    specifications: {
      "Charging Speed": "10W Fast Charge",
      "Compatibility": "Qi-enabled devices",
      "Design": "Slim profile",
      "Safety": "Over-charge protection"
    }
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.",
    price: 34.99,
    category: "Sports & Fitness",
    images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500"],
    stock: 60,
    featured: true,
    specifications: {
      "Material": "Stainless Steel",
      "Capacity": "32 oz",
      "Insulation": "Double-wall vacuum",
      "BPA Free": "Yes"
    }
  }
];

const sampleUsers = [
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
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Hash passwords for users
    const hashedUsers = await Promise.all(
      sampleUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 12)
      }))
    );

    // Insert sample data
    await Product.insertMany(sampleProducts);
    await User.insertMany(hashedUsers);

    console.log('✅ Database seeded successfully!');
    console.log(`📦 Added ${sampleProducts.length} products`);
    console.log(`👥 Added ${sampleUsers.length} users`);
    console.log('\n🔑 Login credentials:');
    console.log('Admin: admin@example.com / admin123');
    console.log('User: user@example.com / user123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

// Run the seed function
seedDatabase();