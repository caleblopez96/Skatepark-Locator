import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skateparks from "./components/Skateparks";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Navbar />
            <Hero />
            <Skateparks />
        </>
    );
}

export default App;
