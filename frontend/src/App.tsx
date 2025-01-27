import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { client } from "./graphql/client";
import {LoginForm} from "./components/Auth/LoginForm"


function App() {

  return (

    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            {/* More Routes here*/}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
