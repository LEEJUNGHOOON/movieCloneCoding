import Spinner from "react-bootstrap/Spinner";
import '../styles/Loading.css';

//Loading Module
function Loading() {
  return (
    <div className="loading">
      <Spinner variant="light" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loading;
