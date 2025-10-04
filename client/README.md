# Blog Platform UI

A modern, responsive React application for a blogging platform, built with TypeScript, Redux Toolkit, and Tailwind CSS.

## 🏗️ Architecture

This project follows **Senior SWE principles** with clean architecture, SOLID principles, and comprehensive testing:

### **Core Principles Applied**
- **OOP**: Object-oriented programming with proper abstraction
- **SOLID**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **DRY**: Don't Repeat Yourself - reusable components and utilities
- **KISS**: Keep It Simple, Stupid - clean, maintainable code
- **TDD**: Test-Driven Development approach

### **Project Structure**
```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components (Button, Input, Card, etc.)
│   ├── layout/          # Layout components
│   ├── auth/            # Authentication components
│   ├── blog/            # Blog-related components
│   └── forms/           # Form components
├── pages/               # Page components
├── store/               # Redux store configuration
│   └── slices/          # Redux slices
├── services/            # API services layer
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── hooks/               # Custom React hooks
├── middleware/          # Custom middleware
└── test/                # Test configuration and utilities
```

## 🚀 Features

### **Implemented Features**
- ✅ Modern React 19 with TypeScript
- ✅ Redux Toolkit for state management
- ✅ React Router for navigation
- ✅ Tailwind CSS for styling
- ✅ Responsive design
- ✅ Component-based architecture
- ✅ Comprehensive testing setup
- ✅ Authentication system foundation
- ✅ Blog service layer
- ✅ Protected routes
- ✅ Error handling
- ✅ Loading states

### **Planned Features**
- 🔄 User authentication (login/register)
- 🔄 Rich text editor for posts
- 🔄 CRUD operations for blog posts
- 🔄 Search and filtering
- 🔄 User profiles
- 🔄 Comments system
- 🔄 Analytics dashboard
- 🔄 Dark mode support

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form, Yup validation
- **HTTP Client**: Axios
- **Testing**: Vitest, React Testing Library, Jest DOM
- **UI Components**: Headless UI, Heroicons

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AhmedHeshamC/bloggingPlatformAPI.git
   cd bloggingPlatformAPI/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## 🧪 Testing

### **Run Tests**
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### **Test Structure**
- **Unit Tests**: Component and utility function tests
- **Integration Tests**: Component interaction tests
- **Mocked Services**: API mocking with MSW
- **Coverage Reports**: Comprehensive test coverage

## 🏛️ API Integration

The application is designed to integrate with the Blogging Platform API:

- **Base URL**: `http://localhost:3000/api/v1`
- **Authentication**: JWT-based authentication
- **Endpoints**: Full CRUD operations for posts and user management

### **API Services**
- **Auth Service**: User authentication and token management
- **Blog Service**: Blog post operations
- **API Client**: HTTP client with interceptors and error handling

## 🔧 Development

### **Code Quality**
- **TypeScript**: Strict typing for better development experience
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (configured via ESLint)
- **Husky**: Git hooks for pre-commit checks

### **Development Scripts**
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🎯 Component Examples

### **Button Component**
```tsx
import { Button } from '@/components/common';

<Button variant="primary" onClick={handleClick}>
  Click me
</Button>
```

### **API Service Usage**
```tsx
import { useAppDispatch } from '@/store';
import { loginUser } from '@/store/slices/auth.slice';

const dispatch = useAppDispatch();
await dispatch(loginUser({ email, password }));
```

## 🔐 Authentication Flow

1. **Login/Registration**: Forms with validation
2. **JWT Management**: Automatic token handling
3. **Protected Routes**: Route guards for authenticated users
4. **Token Refresh**: Automatic token renewal
5. **Logout**: Secure logout with token clearing

## 📱 Responsive Design

- **Mobile-first approach**
- **Breakpoints**: sm (640px), md (768px), lg (1024px)
- **Adaptive layouts**: Grid and flexbox based
- **Touch-friendly**: Proper touch targets for mobile devices

## 🎨 UI/UX Features

- **Loading States**: Skeleton screens and spinners
- **Error Handling**: User-friendly error messages
- **Accessibility**: ARIA labels and keyboard navigation
- **Micro-interactions**: Smooth transitions and hover states
- **Dark Mode**: Planned theme support

## 🚀 Performance

- **Code Splitting**: Lazy loading routes
- **Component Memoization**: React.memo and useMemo
- **Bundle Optimization**: Tree shaking and minification
- **Caching Strategy**: API response caching
- **Image Optimization**: Responsive images

## 📝 Contributing

1. Follow the existing code style and patterns
2. Write tests for new features
3. Ensure all tests pass before committing
4. Use semantic commit messages
5. Update documentation as needed

### **Code Standards**
- Use TypeScript for all new code
- Follow SOLID principles
- Write comprehensive tests
- Maintain clean, readable code
- Use descriptive variable and function names

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- [Blogging Platform API](https://github.com/AhmedHeshamC/bloggingPlatformAPI) - Backend API service
- [Project Roadmap](https://roadmap.sh/projects/blogging-platform-api) - Project requirements and roadmap

---

Built with ❤️ using React, TypeScript, and modern web development best practices.
