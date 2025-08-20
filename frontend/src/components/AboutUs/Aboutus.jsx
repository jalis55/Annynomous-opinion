import React from 'react';
import './Aboutus.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Karim from '../../images/Karim.jpeg';
import Jalis from '../../images/Jalis.jpeg';
import Zubaer from '../../images/Zubaer.jpeg';
import Shakil from '../../images/Shakil.jpeg';
import abir from '../../images/abir.jpeg';
import rony from '../../images/Rony.jpg';

const Aboutus = () => {
  return (
    <div className="aboutus-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="about-title">Meet Our Team</h1>
          <p className="about-subtitle">Passionate professionals dedicated to excellence</p>
        </div>
      </section>

      {/* Team Leader Section */}
      <section className="team-leader-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="leader-card">
                <div className="leader-img-container">
                  <img src={Karim} alt="Team Leader" className="leader-img"/>
                  <div className="leader-overlay"></div>
                </div>
                <div className="leader-info">
                  <h3>Md. Momtajul Karim</h3>
                  <p className="leader-role">Chief Advisor & Tech Lead</p>
                  <p className="leader-desc">Leading our technical vision and strategy with expertise and innovation.</p>
                  <div className="social-links">
                    <a href="#"><i className="fab fa-linkedin"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fas fa-envelope"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="team-members-section">
        <div className="container">
          <h2 className="section-title">Our Development Team</h2>
          <div className="row justify-content-center">
            <div className="col-md-4 col-sm-6 mb-4">
              <div className="team-card">
                <div className="card-img-container">
                  <img src={Jalis} alt="Jalis Mahamud Tarif" className="team-img"/>
                  <div className="card-overlay">
                    <div className="social-links">
                      <a href="#"><i className="fab fa-linkedin"></i></a>
                      <a href="#"><i className="fab fa-github"></i></a>
                    </div>
                  </div>
                </div>
                <div className="card-info">
                  <h5>Jalis Mahamud Tarif</h5>
                  <p>Backend Developer</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 mb-4">
              <div className="team-card">
                <div className="card-img-container">
                  <img src={rony} alt="Rashed Khan Rony" className="team-img"/>
                  <div className="card-overlay">
                    <div className="social-links">
                      <a href="#"><i className="fab fa-linkedin"></i></a>
                      <a href="#"><i className="fab fa-twitter"></i></a>
                    </div>
                  </div>
                </div>
                <div className="card-info">
                  <h5>Rashed Khan Rony</h5>
                  <p>Senior Consultant</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 mb-4">
              <div className="team-card">
                <div className="card-img-container">
                  <img src={Zubaer} alt="Zubaer Ahmed" className="team-img"/>
                  <div className="card-overlay">
                    <div className="social-links">
                      <a href="#"><i className="fab fa-linkedin"></i></a>
                      <a href="#"><i className="fab fa-behance"></i></a>
                    </div>
                  </div>
                </div>
                <div className="card-info">
                  <h5>Zubaer Ahmed</h5>
                  <p>Frontend Developer</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 mb-4">
              <div className="team-card">
                <div className="card-img-container">
                  <img src={Shakil} alt="Sarah Williams Chowdhury" className="team-img"/>
                  <div className="card-overlay">
                    <div className="social-links">
                      <a href="#"><i className="fab fa-linkedin"></i></a>
                      <a href="#"><i className="fab fa-github"></i></a>
                    </div>
                  </div>
                </div>
                <div className="card-info">
                  <h5>Sarah Williams Chowdhury</h5>
                  <p>Backend Developer</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 mb-4">
              <div className="team-card">
                <div className="card-img-container">
                  <img src={abir} alt="Md Mahabubul Alam Abir" className="team-img"/>
                  <div className="card-overlay">
                    <div className="social-links">
                      <a href="#"><i className="fab fa-linkedin"></i></a>
                      <a href="#"><i className="fab fa-stack-overflow"></i></a>
                    </div>
                  </div>
                </div>
                <div className="card-info">
                  <h5>Md Mahabubul Alam Abir</h5>
                  <p>Full Stack Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mission-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2>Our Mission</h2>
              <p className="mission-text">
                We are dedicated to creating innovative solutions that make a difference. 
                Our team combines expertise with passion to deliver exceptional results 
                for our clients and partners.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Aboutus;