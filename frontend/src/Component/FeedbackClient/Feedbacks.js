import FeedbackForm from './Feedbackform';
import HeaderClient from '../topnav/ClientNav/HeaderClient';
import Footer from '../bottomnav/foter';


const Feedback = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <HeaderClient/>
      <main className="flex-grow-1 container my-4">
        <div className="bg-white shadow-lg rounded-lg p-4 border border-light">
          < FeedbackForm/>
        </div>
      </main>
      <Footer />
    </div>
  );
}


export default Feedback;
