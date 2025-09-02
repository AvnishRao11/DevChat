import AppRoutes from "./routes/AppRoutes";
import { UserProvider } from "./Context/User.context";
function App() {
  return (
    <>
    <UserProvider>
      <AppRoutes/>
    </UserProvider>
    </>
    );
}

export default App;