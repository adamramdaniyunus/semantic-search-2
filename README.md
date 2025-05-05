## Cloning the Project

To clone and run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:
   ```bash
   cd fake-store
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment variables**:
   - Create a `.env` file in the root directory.
   - Add the following variables to the `.env` file:
     ```env
     VITE_ANON_URL=
     VITE_ANON_KEY=
     VITE_HG_TOKEN=
     ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Open the application**:
   - Visit `http://localhost:3000` in your browser to view the app.