import Navbar from "../components/navbar";
import HeroContent from "../components/HeroContent";
import CTAButton from "../components/CTAButton";
import ReviewBadge from "../components/RevivewBadge";
import '../styles/hero.css';


function Home() {
    return (
        <section className="hero" >
            <Navbar/>
            <HeroContent/>
            <ReviewBadge/>
            <CTAButton/>
        </section>
    )
}

export default Home;