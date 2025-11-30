import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skateparks from "./components/Skateparks";
import FAQAccordion from "./components/FAQAccordion";
import Footer from "./components/Footer";

function App() {
    return (
        <>
            <Navbar />
            <Hero />
            <Skateparks />
            <FAQAccordion />
            <Footer />
        </>
    );
}

export default App;
