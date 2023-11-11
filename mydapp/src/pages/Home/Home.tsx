import React from 'react';
import { useTranslation } from 'react-i18next';
import WorldImage from '../../assets/images/main-world.png';
import useAppContext from '../../hooks/useAppContext';
import { useNavigate } from 'react-router-dom';



export const HomePage: React.FC = () => {
  const { t } = useTranslation('PageHome');
  
  const { isOrganization, isAdmin, isRegularUser } = useAppContext();
  const navigate = useNavigate()
  
  const redirectToGetStarted = () => {
    if (isRegularUser) {
      navigate('/user-courses')
    }
    else if (isAdmin) {
      navigate('/admin-courses')
    }
    else if (isOrganization) {
      navigate('/organization-invitations')
    }
    else {
      navigate('/login')
    }


  }

  const redirectToFAQs = () => {
    window.location.href = 'http://localhost:5050/#FAQs';
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "50%", height: "85vh" }}>
          <h1 style={{ fontSize: "5rem" }}>TBAP</h1>
          <br />
          <h5 style={{ fontSize: "1.5rem", fontWeight:"400"}}>Turn your achievements into digital badges</h5>
          <h5 style={{ fontSize: "1.5rem", fontWeight:"400" }}>backed by Blockchain</h5>
          <div>
            <button className="btn btn-primary" 
              style={{ width: "10rem", marginTop: "2rem", background: '#3182ce', borderColor: '#3182ce', transition: 'background 0.4s'
            }}
                onMouseOver={(e) => (e.target as HTMLElement).style.background = '#2c5282'}
                onMouseOut={(e) => (e.target as HTMLElement).style.background = '#3182ce'}
                onClick={redirectToGetStarted}
            >
              Get Started
              </button>
            <button className="btn btn-outline-primary" 
              style={{ width: "10rem", marginTop: "2rem", marginLeft: "1rem", borderColor: '#3182ce', transition: 'background 0.4s'
            }}
                onMouseOver={(e) => (e.target as HTMLElement).style.background = '#2c5282'}
                onMouseOut={(e) => (e.target as HTMLElement).style.background = 'transparent'}
                onClick={redirectToFAQs}
            >
              Learn More
              </button>
          </div>
        </div>
        <img
          style={{ maxHeight: '100vh', filter: 'drop-shadow(8px 36px 36px #224)' }}
          className=""
          src={WorldImage}
          alt={"main-image-world"}
        />
      </div>
      	
    </>
  );
};

