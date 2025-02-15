import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks/:boardID/:boardName" element={<Tasks />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
