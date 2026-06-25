function CTAButton() {
    const handleScroll = () => {
        const element = document.getElementById("menu-section");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <button className="cta-btn" onClick={handleScroll}>
            Get your first food now!
        </button>
    );
}

export default CTAButton;
