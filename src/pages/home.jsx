import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import HeroContent from "../components/hero/HeroContent";
import CTAButton from "../components/hero/CTAButton";
import ReviewBadge from "../components/hero/ReviewBadge";
import '../styles/hero.css';
import '../styles/navbar.css';
import FoodMenu from "../components/menu/FoodMenu";
import DealsSection from "../components/deals/Deals";
import Faq from "../components/Faqs/FaqSection";
import Footer from "../components/footer/Footer";

function Home() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [location]);

    return (
        <>
        <section className="hero" >
            <Navbar/>
            <HeroContent/>
            <ReviewBadge/>
            <CTAButton/>
        </section>
        <FoodMenu/>
        <DealsSection/>
        <Faq/>
        <Footer/>
        </>
        
    )
}

export default Home;