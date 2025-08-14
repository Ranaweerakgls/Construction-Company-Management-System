import RequirementsForm from "./RequirementsForm";
import HeaderClient from '../topnav/ClientNav/HeaderClient';
import Footer from '../bottomnav/foter';


const Requirements = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <HeaderClient/>
      <main className="flex-grow-1 container my-4">
        <div className="bg-white shadow-lg rounded-lg p-4 border border-light">
          < RequirementsForm/>
        </div>
      </main>
      <Footer />
    </div>
  );
}


export default Requirements;

//            <RequirementsForm/>
//<RequirementsTable rows={ReqTable}/>