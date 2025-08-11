# Authentication Data Model Documentation

## Overview

This document outlines the authentication data model and backend API expectations for the MedPortal healthcare management system. The frontend uses Zustand for state management with encrypted local storage persistence and JWT token-based authentication.

## Core Data Models

### User Interface

The [`User`](src/store/authStore.ts:7) interface defines the structure of user data:

```typescript
interface User {
  id: string;                    // Unique user identifier
  email: string;                 // User's email address (used for login)
  name: string;                  // User's full name
  role: string;  // Role-based access control
  avatar?: string;               // Optional profile picture URL
  createdAt: string;             // ISO 8601 timestamp of account creation
  lastLogin?: string;            // ISO 8601 timestamp of last login
}
```

### Authentication Credentials

#### Login Credentials
The [`LoginCredentials`](src/store/authStore.ts:18) interface for user authentication:

```typescript
interface LoginCredentials {
  email: string;                 // User's email address
  password: string;              // User's password
}
```

#### Registration Credentials
The [`RegisterCredentials`](src/store/authStore.ts:23) interface for user registration:

```typescript
interface RegisterCredentials {
  email: string;                 // User's email address
  password: string;              // User's password
  name: string;                  // User's full name
}
```

### Authentication State

The [`AuthState`](src/store/authStore.ts:30) interface manages the complete authentication state:

```typescript
interface AuthState {
  // State Properties
  user: User | null;             // Current authenticated user or null
  token: string | null;          // JWT authentication token or null
  isAuthenticated: boolean;      // Authentication status flag
  isLoading: boolean;            // Loading state for async operations
  error: string | null;          // Error message or null

  // Action Methods
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  updateUser: (userData: Partial<User>) => void;
  refreshToken: () => Promise<void>;
}
```

## Backend API Expectations

### Authentication Endpoints

#### POST /api/auth/login
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "userPassword123"
}
```

**Success Response (200):**
```json
{
  "user": {
    "id": "unique-user-id",
    "email": "user@example.com",
    "name": "User Full Name",
    "role": "user",
    "avatar": "https://example.com/avatar.jpg",
    "createdAt": "2024-01-01T00:00:00Z",
    "lastLogin": "2024-01-15T10:30:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400
}
```

**Error Response (401):**
```json
{
  "error": "Invalid credentials",
  "message": "Email or password is incorrect"
}
```

**Error Response (404):**
```json
{
  "error": "User not found",
  "message": "No account found with this email address"
}
```

#### POST /api/auth/register
**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "securePassword123",
  "name": "New User Name"
}
```

**Success Response (201):**
```json
{
  "user": {
    "id": "new-user-id",
    "email": "newuser@example.com",
    "name": "New User Name",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00Z",
    "lastLogin": "2024-01-15T10:30:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400
}
```

**Error Response (409):**
```json
{
  "error": "User already exists",
  "message": "An account with this email already exists"
}
```

#### POST /api/auth/refresh
**Request Headers:**
```
Authorization: Bearer <current-jwt-token>
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400
}
```

#### POST /api/auth/logout
**Request Headers:**
```
Authorization: Bearer <jwt-token>
```

**Success Response (200):**
```json
{
  "message": "Successfully logged out"
}
```

### JWT Token Structure

The JWT token should contain the following payload:

```json
{
  "sub": "user-id",              // Subject (user ID)
  "email": "user@example.com",   // User email
  "role": "user",                // User role for RBAC
  "iat": 1640995200,             // Issued at timestamp
  "exp": 1641081600              // Expiration timestamp
}
```

## Role-Based Access Control (RBAC)

### Supported Roles

1. **admin**: Full system access
   - Can access all modules and features
   - User management capabilities
   - System configuration access

2. **moderator**: Limited administrative access
   - Can access most clinical modules
   - Limited user management
   - Cannot access system configuration

3. **user**: Standard user access
   - Can access assigned clinical modules
   - Cannot access administrative features
   - Profile management only

### Role Validation

The frontend provides utility hooks for role-based access:

```typescript
const { isAdmin, isModerator, isUser, hasRole, hasAnyRole } = useRole();

// Usage examples
if (isAdmin) {
  // Show admin-only features
}

if (hasAnyRole(['admin', 'moderator'])) {
  // Show features for admin or moderator
}
```

## Security Features

### Encrypted Storage

- Authentication data is encrypted before storage in localStorage
- Uses the [`createEncryptedStorage`](src/utils/encryptedStorage.ts:8) utility
- Automatic encryption/decryption on read/write operations
- Fallback to unencrypted storage if encryption fails

### Token Management

- JWT tokens are automatically included in API requests
- Token refresh mechanism to maintain session
- Automatic logout on token expiration
- Secure token storage with encryption

### Password Requirements

Frontend validation expects:
- Minimum 6 characters
- Backend should enforce stronger requirements:
  - At least 8 characters
  - Mix of uppercase, lowercase, numbers
  - Special characters recommended

## Error Handling

### Frontend Error States

The authentication store manages error states:

```typescript
// Error types the frontend expects
type AuthError = 
  | "Invalid credentials"
  | "User not found" 
  | "User already exists"
  | "Network error"
  | "Token expired"
  | "Registration failed"
  | "Login failed";
```

### Backend Error Format

All authentication errors should follow this format:

```json
{
  "error": "ERROR_CODE",
  "message": "Human-readable error message",
  "details": {
    "field": "specific field if applicable",
    "code": "SPECIFIC_ERROR_CODE"
  }
}
```

## API Integration Points

### Authentication Flow

1. **Login Process:**
   - User submits [`LoginCredentials`](src/store/authStore.ts:18)
   - Frontend calls [`login`](src/store/authStore.ts:106) method
   - Backend validates credentials
   - Returns user data and JWT token
   - Frontend stores encrypted data locally

2. **Registration Process:**
   - User submits [`RegisterCredentials`](src/store/authStore.ts:23)
   - Frontend calls [`register`](src/store/authStore.ts:146) method
   - Backend creates new user account
   - Returns user data and JWT token
   - Frontend stores encrypted data locally

3. **Token Refresh:**
   - Frontend automatically calls [`refreshToken`](src/store/authStore.ts:218)
   - Backend validates current token
   - Returns new JWT token
   - Frontend updates stored token

4. **Logout Process:**
   - Frontend calls [`logout`](src/store/authStore.ts:191) method
   - Clears all stored authentication data
   - Optionally notifies backend to invalidate token

## Implementation Notes

### Current Mock Implementation

The current implementation uses mock data for development:
- Mock users defined in [`mockUsers`](src/store/authStore.ts:48)
- Simulated API delays using [`simulateDelay`](src/store/authStore.ts:79)
- Mock JWT token generation via [`generateMockToken`](src/store/authStore.ts:83)

### Production Considerations

1. **Replace mock authentication** with actual API calls
2. **Implement proper password hashing** on backend
3. **Add rate limiting** for authentication endpoints
4. **Implement account lockout** after failed attempts
5. **Add email verification** for registration
6. **Implement password reset** functionality
7. **Add multi-factor authentication** support
8. **Implement session management** on backend

### Frontend Integration

The authentication system integrates with:
- **React Router**: [`App.tsx`](src/App.tsx:10) uses `isAuthenticated` for route protection
- **Private Routes**: [`PrivateRoutes.tsx`](src/routes/PrivateRoutes.tsx) handles authenticated user navigation
- **Login Component**: [`Login.tsx`](src/components/Login.tsx) provides the authentication interface

## Testing Credentials

For development and testing, use these mock credentials:
Take note remove these mock credentials when there is a back end integration
```
Admin User:
Email: admin@example.com
Password: password123

Regular User:
Email: user@example.com
Password: password123

Moderator User:
Email: moderator@example.com
Password: password123
```

## API Response Times

Expected response times for authentication endpoints:
- Login: 1-2 seconds
- Registration: 2-3 seconds
- Token refresh: 0.5-1 second
- Logout: < 0.5 seconds

These timings are currently simulated but should guide backend implementation expectations.