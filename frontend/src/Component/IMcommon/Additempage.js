import Header from '../topnav/IM/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from '../bottomnav/IM/Footer';
import { useNavigate } from 'react-router-dom';
import background from '../pictures/stock.jpg'

function Item() {
  const navigate = useNavigate();

  return (
    <div className="App"
    style={{
        backgroundImage: `url(${background})`, // <-- Path to your image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}>
      <Header />
      <div className="container my-5">
        {/* Flex container to align cards horizontally */}
        <div className="d-flex justify-content-center flex-wrap gap-4">
          {/* Card for Add New Material */}
          <div
            onClick={() => navigate('/Materials')}
            className="card cursor-pointer"
            style={{
              width: '265px',
              height: '325px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#0056b3',
              color: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: '20px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
            }}
          >
            <i className="fas fa-box-open fa-3x mb-3"></i> {/* Add Material Icon */}
            <div>Add New Material</div>
          </div>

          {/* Card for Add New Equipment */}
          <div
            onClick={() => navigate('/Equipment')}
            className="card cursor-pointer"
            style={{
              width: '265px',
              height: '325px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#010212',
              color: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: '20px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
            }}
          >
            <i className="fas fa-cogs fa-3x mb-3"></i> {/* Add Equipment Icon */}
            <div>Add New Equipment</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Item;
