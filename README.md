# ShopHub - Full-Stack E-commerce Website

A modern, full-featured e-commerce website built with Next.js 15, TypeScript, Tailwind CSS, MongoDB, and Cloudinary.

## 🚀 Features

### Customer Features
- **Product Browsing**: Browse products with advanced filtering by category, price range, and search
- **Dynamic Product Pages**: Detailed product pages with image galleries, specifications, and related products
- **Shopping Cart**: Add/remove items, update quantities, persistent cart storage
- **User Authentication**: Secure sign up/sign in with NextAuth.js
- **Checkout Process**: Complete checkout with shipping address collection
- **Cash on Delivery**: Secure payment method with COD support
- **Order Tracking**: View order history and status updates
- **Responsive Design**: Mobile-first design that works on all devices

### Admin Features
- **Admin Dashboard**: Comprehensive overview with sales statistics
- **Product Management**: Add, edit, delete products with image uploads
- **Order Management**: View and update order statuses
- **Image Upload**: Cloudinary integration for product images
- **Inventory Tracking**: Stock management and low-stock alerts
- **Category Management**: Organize products by categories

## 🛠 Tech Stack

- **Frontend**: Next.js 15.4.1, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js with credentials provider
- **Image Storage**: Cloudinary
- **State Management**: React hooks and local storage
- **Notifications**: React Hot Toast

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd trusted-brother2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   The `.env.local` file is already configured with:
   - MongoDB Atlas connection
   - Cloudinary credentials
   - NextAuth configuration
   
   Update the admin credentials if needed:
   ```env
   ADMIN_EMAIL=your-admin@example.com
   ADMIN_PASSWORD=your-secure-password
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄 Database Setup

The application uses MongoDB Atlas (already configured). The database will automatically create collections for:
- Users
- Products
- Orders

## 👤 Admin Access

1. **Create Admin Account**
   - Sign up with the email specified in `ADMIN_EMAIL`
   - The account will automatically have admin privileges

2. **Access Admin Dashboard**
   - Sign in with admin credentials
   - Navigate to `/admin` or use the Admin link in the navigation

## 📱 Usage

### For Customers
1. **Browse Products**: Visit the homepage or products page
2. **Filter Products**: Use the sidebar filters to find specific items
3. **Add to Cart**: Click "Add to Cart" on any product
4. **Checkout**: Complete your order with shipping details
5. **Track Orders**: View order status in your profile

### For Admins
1. **Add Products**: Use the admin dashboard to add new products
2. **Upload Images**: Use Cloudinary integration for product photos
3. **Manage Orders**: Update order statuses and track fulfillment
4. **View Analytics**: Monitor sales and inventory from the dashboard

## 🎨 Key Components

### Frontend Components
- `Navbar`: Navigation with cart count and user menu
- `ProductCard`: Reusable product display component
- `ProductFilter`: Advanced filtering sidebar
- `CartPage`: Shopping cart management
- `CheckoutPage`: Order completion flow

### API Routes
- `/api/products`: Product CRUD operations
- `/api/orders`: Order management
- `/api/auth`: Authentication endpoints
- `/api/upload`: Image upload handling

### Database Models
- `User`: Customer and admin accounts
- `Product`: Product catalog with images and specs
- `Order`: Order tracking with items and shipping

## 🔒 Security Features

- **Authentication**: Secure user sessions with NextAuth.js
- **Authorization**: Role-based access control (admin/user)
- **Input Validation**: Server-side validation for all forms
- **Secure Headers**: Next.js security best practices
- **Environment Variables**: Sensitive data protection

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 📊 Performance Features

- **Image Optimization**: Next.js Image component with Cloudinary
- **Code Splitting**: Automatic code splitting with Next.js
- **Caching**: Efficient API response caching
- **Lazy Loading**: Components and images load on demand
- **Mobile Optimization**: Responsive design for all devices

## 🔧 Customization

### Adding New Features
1. **Payment Integration**: Add Stripe or PayPal for online payments
2. **Email Notifications**: Integrate email service for order updates
3. **Reviews System**: Add product reviews and ratings
4. **Wishlist**: Implement user wishlists
5. **Inventory Alerts**: Low stock notifications

### Styling
- Modify `tailwind.config.js` for custom themes
- Update component styles in individual files
- Add custom CSS in `globals.css`

## 🐛 Troubleshooting

### Common Issues
1. **Database Connection**: Ensure MongoDB URI is correct
2. **Image Uploads**: Verify Cloudinary credentials
3. **Authentication**: Check NextAuth configuration
4. **Build Errors**: Ensure all dependencies are installed

### Development Tips
- Use browser dev tools for debugging
- Check server logs for API errors
- Verify environment variables are loaded
- Test on different screen sizes

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the code comments

---

**Built with ❤️ using Next.js and modern web technologies**