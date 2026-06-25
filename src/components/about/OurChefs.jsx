import React from 'react';
import chef1 from '../../assets/chef1.png';
import chef2 from '../../assets/chef2.png';
import chef3 from '../../assets/chef3.png';

function OurChefs() {
  const chefs = [
    {
      image: chef1,
      name: "Chef Zeeshan Molani",
      role: "Executive Head Chef"
    },
    {
      image: chef2,
      name: "Chef Ayesha Khan",
      role: "Artisan Sous Chef"
    },
    {
      image: chef3,
      name: "Chef Ebad Rehman",
      role: "Culinary Innovator"
    }
  ];

  return (
    <section className="our-chefs">
      <div className="section-container">
        <div className="section-header">
          <p className="section-title-cursive">Meet the experts</p>
          <h2 className="section-title">Our Culinary Masters</h2>
        </div>
        <div className="chefs-grid">
          {chefs.map((chef, idx) => (
            <div className="chef-card" key={idx}>
              <div className="chef-image-container">
                <img src={chef.image} alt={chef.name} className="chef-image" />
                <div className="chef-overlay">
                  <h3 className="chef-name">{chef.name}</h3>
                  <p className="chef-role">{chef.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurChefs;
