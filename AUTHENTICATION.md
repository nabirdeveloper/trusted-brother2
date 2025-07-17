# Authentication System Documentation

## Overview

This Next.js e-commerce application implements a comprehensive authentication system using NextAuth.js with MongoDB, featuring role-based access control (RBAC) for different user types.

## 🔐 Authentication Features

### Core Authentication
- **NextAuth.js Integration**: Secure session management with JWT strategy
- **MongoDB Storage**: User data stored in MongoDB with Mongoose ODM
- **Password Security**: Bcrypt hashing with salt rounds
- **Session Management**: 30-day session duration with automatic refresh
- **Route Protection**: Middleware-based route protection

### Role-Based Access Control (RBAC)
- **User Roles**: `user`, `moderator`, `admin`
- **Role Hierarchy**: Admin > Moderator > User
- **Permission System**: Granular permissions for different actions
- **Component-Level Protection**: Role guards for UI components
- **API-Level Protection**: Server-side role validation

## 👥 User Roles & Permissions

### User (Default Role)
- Browse and purchase products
- Manage personal profile
- View order history
- Access shopping cart and checkout

### Moderator
- All user permissions
- View admin dashboard (limited)
- Manage orders (view and update status)
- Access order management tools

### Admin
- All moderator permissions
- Full admin dashboard access
- Manage products (CRUD operations)
- Manage users (view, edit, delete, role changes)
- Upload product images
- View comprehensive analytics

## 🛡️ Security Features

### Authentication Security
- **Password Requirements**: Minimum 6 characters with strength validation
- **Email Validation**: Server-side email format validation
- **Rate Limiting**: Built-in NextAuth rate limiting
- **CSRF Protection**: NextAuth CSRF token validation
- **Secure Headers**: Next.js security headers

### Authorization Security
- **Route Protection**: Middleware prevents unauthorized access
- **API Protection**: Server-side session validation
- **Role Validation**: Hierarchical permission checking
- **Self-Protection**: Users cannot modify their own critical data

## 📁 File Structure

```
├── lib/
│   ├── auth.ts                 # NextAuth configuration
│   ├── auth-utils.ts          # Authentication utilities
│   └── mongodb.ts             # Database connection
├── models/
│   └── User.ts                # User model with roles
├── components/auth/
│   ├── ProtectedRoute.tsx     # Route protection component
│   └── RoleGuard.tsx          # Role-based UI guards
├── app/
│   ├── auth/
│   │   ├── signin/page.tsx    # Sign in page
│   │   ├── signup/page.tsx    # Sign up page
│   │   └── error/page.tsx     # Auth error page
│   ├── admin/                 # Admin-only pages
│   ├── profile/               # User profile pages
│   └── api/
│       ├── auth/              # NextAuth API routes
│       └── admin/             # Admin API routes
└── middleware.ts              # Route protection middleware
```

## 🔧 Implementation Details

### 1. NextAuth Configuration (`lib/auth.ts`)
```typescript
export const authOptions: NextAuthOptions = {
  providers: [CredentialsProvider],
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  callbacks: { jwt, session, redirect },
  pages: { signIn: '/auth/signin', error: '/auth/error' },
  events: { signIn, signOut },
};
```

### 2. User Model (`models/User.ts`)
```typescript
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'moderator'], default: 'user' },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date, default: Date.now },
  // ... additional fields
});
```

### 3. Route Protection (`middleware.ts`)
```typescript
export default withAuth(
  function middleware(req) {
    // Route-specific protection logic
    // Admin route protection
    // Authentication redirects
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Authorization logic
      },
    },
  }
);
```

### 4. Role Guards (`components/auth/RoleGuard.tsx`)
```typescript
export function AdminOnly({ children, fallback }) {
  return (
    <RoleGuard allowedRoles={['admin']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}
```

## 🚀 Usage Examples

### Protecting Pages
```typescript
export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
```

### Conditional UI Rendering
```typescript
<AdminOnly>
  <Link href="/admin">Admin Dashboard</Link>
</AdminOnly>
```

### API Route Protection
```typescript
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Protected logic here
}
```

### Server-Side Protection
```typescript
export async function requireAdmin() {
  const session = await getAuthSession();
  if (!session || session.user.role !== 'admin') {
    redirect('/');
  }
  return session;
}
```

## 🔄 Authentication Flow

### Sign Up Process
1. User fills registration form with validation
2. Password strength checking
3. Server-side validation and duplicate checking
4. Password hashing with bcrypt
5. User creation in MongoDB
6. Redirect to sign-in page

### Sign In Process
1. User enters credentials
2. NextAuth validates against MongoDB
3. Password verification with bcrypt
4. JWT token generation
5. Session creation
6. Role-based redirect (admin → dashboard, user → home)

### Route Access
1. Middleware checks authentication status
2. Role validation for protected routes
3. Automatic redirects for unauthorized access
4. Session refresh handling

## 🛠️ Admin Features

### User Management
- **View All Users**: Paginated user list with search and filters
- **Role Management**: Change user roles (user ↔ moderator ↔ admin)
- **User Statistics**: Order count and total spending per user
- **Account Status**: Activate/deactivate user accounts
- **User Deletion**: Remove users (with self-protection)

### Dashboard Analytics
- **User Statistics**: Total users, new registrations
- **Order Management**: Order status updates and tracking
- **Product Management**: Full CRUD operations
- **Revenue Tracking**: Sales analytics and reporting

## 🔒 Security Best Practices

### Implemented Security Measures
1. **Password Security**: Bcrypt hashing with proper salt rounds
2. **Session Security**: Secure JWT tokens with expiration
3. **Route Protection**: Comprehensive middleware protection
4. **Input Validation**: Server-side validation for all inputs
5. **Role Validation**: Hierarchical permission checking
6. **CSRF Protection**: NextAuth built-in CSRF protection
7. **XSS Prevention**: React's built-in XSS protection
8. **SQL Injection Prevention**: Mongoose ODM protection

### Additional Recommendations
1. **Environment Variables**: Secure storage of secrets
2. **HTTPS**: Always use HTTPS in production
3. **Rate Limiting**: Implement API rate limiting
4. **Audit Logging**: Log authentication events
5. **Password Policies**: Enforce strong password requirements
6. **Account Lockout**: Implement failed login attempt limits

## 🧪 Testing Authentication

### Demo Accounts
```
Admin Account:
- Email: admin@example.com
- Password: admin123

User Account:
- Email: user@example.com
- Password: user123
```

### Test Scenarios
1. **Sign Up**: Create new accounts with various roles
2. **Sign In**: Test authentication with valid/invalid credentials
3. **Route Protection**: Access protected routes without authentication
4. **Role Access**: Test role-based access control
5. **Session Management**: Test session expiration and refresh
6. **Admin Functions**: Test user management and admin features

## 🚀 Deployment Considerations

### Environment Variables
```env
MONGODB_URI=your-mongodb-connection-string
NEXTAUTH_URL=your-production-url
NEXTAUTH_SECRET=your-secure-secret-key
ADMIN_EMAIL=admin@yourdomain.com
```

### Production Security
1. **Secure Secrets**: Use strong, unique secrets
2. **Database Security**: Secure MongoDB connection
3. **SSL/TLS**: Enable HTTPS
4. **Environment Isolation**: Separate dev/prod environments
5. **Monitoring**: Implement authentication monitoring
6. **Backup**: Regular user data backups

## 📚 API Endpoints

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signout` - User sign out
- `GET /api/auth/session` - Get current session

### Admin Endpoints
- `GET /api/admin/users` - List all users (admin only)
- `PUT /api/admin/users/[id]` - Update user (admin only)
- `DELETE /api/admin/users/[id]` - Delete user (admin only)
- `GET /api/admin/stats` - Admin statistics (admin only)

### Protected Endpoints
- `GET /api/orders` - User orders (authenticated)
- `POST /api/orders` - Create order (authenticated)
- `PUT /api/orders/[id]` - Update order (moderator+)

This authentication system provides a robust, secure, and scalable foundation for the e-commerce application with comprehensive role-based access control.