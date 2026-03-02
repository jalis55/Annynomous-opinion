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
  const teamMembers = [
    {
      id: 1,
      name: "Jalis Mahamud Tarif",
      role: "Backend Developer",
      image: Jalis,
      social: { linkedin: "#", github: "#" }
    },
    {
      id: 2,
      name: "Rashed Khan Rony",
      role: "Senior Consultant",
      image: rony,
      social: { linkedin: "#", twitter: "#" }
    },
    {
      id: 3,
      name: "Zubaer Ahmed",
      role: "Frontend Developer",
      image: Zubaer,
      social: { linkedin: "#", behance: "#" }
    },
    // {
    //   id: 4,
    //   name: "Sarah Williams Chowdhury",
    //   role: "Backend Developer",
    //   image: Shakil,
    //   social: { linkedin: "#", github: "#" }
    // },
    {
      id: 5,
      name: "Md Mahabubul Alam Abir",
      role: "Full Stack Developer",
      image: abir,
      social: { linkedin: "#", stackoverflow: "#" }
    }
  ];

  return (
    <div className="aboutus-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="about-title">Innovators Behind the Code</h1>
            <p className="about-subtitle">
              A passionate team of developers crafting digital excellence through innovation and collaboration
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <h3>5+</h3>
                <p>Team Members</p>
              </div>
              <div className="stat-item">
                <h3>50+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat-item">
                <h3>3+</h3>
                <p>Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Leader Section */}
      <section className="team-leader-section">
        <div className="container">
          <div className="section-header">
            <h2>Technical Leadership</h2>
            <p>Guiding our vision with expertise and innovation</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="leader-card">
                <div className="leader-main">
                  <div className="leader-img-container">
                    <img src={Karim} alt="Md. Momtajul Karim" className="leader-img"/>
                    <div className="leader-badge">Team Lead</div>
                  </div>
                  <div className="leader-info">
                    <h3>Md. Momtajul Karim</h3>
                    <p className="leader-role">Chief Advisor & Tech Lead</p>
                    <p className="leader-desc">
                      Leading our technical vision with 15+ years of experience in full-stack development 
                      and system architecture. Passionate about creating scalable solutions and mentoring 
                      the next generation of developers.
                    </p>
                    <div className="leader-skills">
                      <span className="skill-tag">Architecture</span>
                      <span className="skill-tag">Leadership</span>
                      <span className="skill-tag">Innovation</span>
                    </div>
                    <div className="social-links">
                      <a href="#" className="social-link">
                        <i className="fab fa-linkedin"></i>
                      </a>
                      <a href="#" className="social-link">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#" className="social-link">
                        <i className="fas fa-envelope"></i>
                      </a>
                    </div>
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
          <div className="section-header">
            <h2>Development Team</h2>
            <p>Meet the talented individuals behind our success</p>
          </div>
          <div className="row justify-content-center">
            {teamMembers.map(member => (
              <div key={member.id} className="col-xl-3 col-lg-4 col-md-6 mb-4">
                <div className="team-card">
                  <div className="card-img-container">
                    <img src={member.image} alt={member.name} className="team-img"/>
                    <div className="card-overlay">
                      <div className="social-links">
                        {member.social.linkedin && (
                          <a href={member.social.linkedin} className="social-link">
                            <i className="fab fa-linkedin"></i>
                          </a>
                        )}
                        {member.social.github && (
                          <a href={member.social.github} className="social-link">
                            <i className="fab fa-github"></i>
                          </a>
                        )}
                        {member.social.twitter && (
                          <a href={member.social.twitter} className="social-link">
                            <i className="fab fa-twitter"></i>
                          </a>
                        )}
                        {member.social.behance && (
                          <a href={member.social.behance} className="social-link">
                            <i className="fab fa-behance"></i>
                          </a>
                        )}
                        {member.social.stackoverflow && (
                          <a href={member.social.stackoverflow} className="social-link">
                            <i className="fab fa-stack-overflow"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="card-info">
                    <h5>{member.name}</h5>
                    <p className="member-role">{member.role}</p>
                    <div className="member-cta">
                      <button className="btn-connect">Connect</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-card">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="mission-content">
                  <h2>Our Mission & Vision</h2>
                  <p className="mission-text">
                    We are committed to pushing the boundaries of digital innovation. Our team combines 
                    cutting-edge technology with creative problem-solving to deliver exceptional solutions 
                    that drive meaningful impact for our clients and communities.
                  </p>
                  <div className="mission-values">
                    <div className="value-item">
                      <i className="fas fa-bullseye"></i>
                      <div>
                        <h5>Excellence</h5>
                        <p>Striving for the highest quality in everything we do</p>
                      </div>
                    </div>
                    <div className="value-item">
                      <i className="fas fa-lightbulb"></i>
                      <div>
                        <h5>Innovation</h5>
                        <p>Embracing new technologies and creative approaches</p>
                      </div>
                    </div>
                    <div className="value-item">
                      <i className="fas fa-users"></i>
                      <div>
                        <h5>Collaboration</h5>
                        <p>Working together to achieve extraordinary results</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mission-visual">
                  <div className="floating-element el-1"></div>
                  <div className="floating-element el-2"></div>
                  <div className="floating-element el-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Aboutus;