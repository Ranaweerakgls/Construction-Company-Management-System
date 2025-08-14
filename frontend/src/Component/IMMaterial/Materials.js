
import MaterialsForm from './MaterialsForm';
import Header from '../topnav/IM/Header'
import Footer from '../bottomnav/IM/Footer'
import background from '../pictures/stock.jpg'

const Materials=()=>{
  return(
    <div>
      <Header/>
      <div  style={{
              backgroundImage: `url(${background})`, // <-- Path to your image
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '100vh'
            }}>
      <MaterialsForm />
      </div>
      <Footer/>
    </div>
    
  );
} 

export default Materials;