import ProgressForm from './ProgressForm'; // Ensure the filename matches
import Header from '../topnav/Header';
import Footer from '../bottomnav/foter';


const Users=()=>{
    return(
        <div className="bg-light min-vh-100 d-flex flex-column">
        <Header />
        <main className="flex-grow-1 container my-4">
          <div className="bg-white shadow-lg rounded-lg p-4 border border-light">
          <ProgressForm/>
          </div>
        </main>
        <Footer />
      </div>
    );
}
export default Users;

//path name is progress
//<ProgressForm/>
//<UsersTable rows={table}/>