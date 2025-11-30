import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skateparks from "./components/Skateparks";
import FAQAccordion from "./components/FAQAccordion";
import Footer from "./components/Footer";
import FavoritesPanel from "./components/FavoritesPanel";

function App() {
    const [isFavoritesPanelOpen, setIsFavoritesPanelOpen] = useState(false);

    return (
        <>
            <Navbar onOpenFavorites={() => setIsFavoritesPanelOpen(true)} />
            <Hero />
            <Skateparks />
            <FAQAccordion />
            <Footer />
            <FavoritesPanel isOpen={isFavoritesPanelOpen} onClose={() => setIsFavoritesPanelOpen(false)} />
        </>
    );
}

export default App;
