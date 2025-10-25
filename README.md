# 📝 MEAN Stack To-Do App

A full-stack web application built with the MEAN stack (MongoDB, Express.js, Angular, Node.js) for managing personal tasks and to-dos with user authentication.

## 🚀 Features

- **User Authentication**: Secure signup and login with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Task Status**: Toggle tasks between completed and pending
- **User Isolation**: Each user can only see and manage their own tasks
- **Responsive Design**: Modern UI with Bootstrap and FontAwesome icons
- **Real-time Updates**: Immediate UI updates when tasks are modified

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **Angular 20** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **Bootstrap 5** - CSS framework for responsive design
- **FontAwesome** - Icon library
- **RxJS** - Reactive programming

## 📁 Project Structure

```
To-Do App (NTI)/
├── back-end/
│   ├── controllers/
│   │   ├── authController.js      # Authentication logic
│   │   ├── tasksController.js     # Task management logic
│   │   └── todoController.js      # Todo operations
│   ├── data/
│   │   └── tasks.json            # JSON file storage
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT authentication middleware
│   ├── models/
│   │   ├── Todo.js               # Todo model
│   │   └── User.js               # User model
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   └── todoRoutes.js         # Todo API routes
│   ├── server.js                 # Express server
│   └── package.json              # Backend dependencies
├── front-end/
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/
│   │   │   │   ├── auth/         # Authentication components
│   │   │   │   ├── landing/      # Landing page
│   │   │   │   └── tasks/        # Task management components
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts # Route protection
│   │   │   ├── header/           # Header component
│   │   │   └── footer/           # Footer component
│   │   │   └── app.component.ts  # Main app component
│   │   └── main.ts               # App bootstrap
│   └── package.json              # Frontend dependencies
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **Angular CLI** (`npm install -g @angular/cli`)
- **MongoDB** (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd "To-Do App (NTI)"
   ```

2. **Backend Setup**
   ```bash
   cd back-end
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../front-end
   npm install
   ```

### Environment Configuration

Create a `.env` file in the `back-end` directory:

```env
MONGO_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your-secret-key-here
```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd back-end
   npm run dev
   ```
   The backend will run on `http://localhost:3000`

2. **Start the Frontend Development Server**
   ```bash
   cd front-end
   ng serve
   ```
   The frontend will run on `http://localhost:4200`

3. **Access the Application**
   Open your browser and navigate to `http://localhost:4200`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user and get JWT token

### Tasks (Protected Routes)
- `GET /api/tasks/todos` - Get all tasks for authenticated user
- `POST /api/tasks/todos` - Create a new task
- `PUT /api/tasks/todos/:id` - Update task text and status
- `PATCH /api/tasks/todos/:id/toggle` - Toggle task completion status
- `DELETE /api/tasks/todos/:id` - Delete a task

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. **Signup**: Create a new user account
2. **Login**: Authenticate and receive a JWT token
3. **Protected Routes**: Include the JWT token in the Authorization header
   ```
   Authorization: Bearer <your-jwt-token>
   ```

## 🎨 User Interface

- **Landing Page**: Welcome screen with signup/login options
- **Authentication**: Clean signup and login forms
- **Task Dashboard**: 
  - Add new tasks
  - View all tasks (completed and pending)
  - Toggle task completion status
  - Edit task text
  - Delete tasks
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🏗️ Architecture

The application follows MVC (Model-View-Controller) architecture:

- **Models**: Define data structure (User, Todo)
- **Controllers**: Handle business logic and data processing
- **Routes**: Define API endpoints and middleware
- **Views**: Angular components for user interface
- **Services**: Handle HTTP requests and data management

## 🧪 Testing

### Backend Testing
```bash
cd back-end
npm test
```

### Frontend Testing
```bash
cd front-end
ng test
```

## 📦 Build for Production

### Backend
```bash
cd back-end
npm install --production
```

### Frontend
```bash
cd front-end
ng build --prod
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created as part of NTI (National Technology Institute) MEAN Stack course.

## 🐛 Known Issues

- Tasks are currently stored in JSON files (consider migrating to MongoDB for production)
- No password reset functionality
- No email verification

## 🔮 Future Enhancements

- [ ] Real-time notifications
- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] File attachments
- [ ] Collaborative task sharing
- [ ] Dark mode theme
- [ ] Mobile app (React Native/Ionic)

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the development team.

---

**Happy Task Managing!** ✅
