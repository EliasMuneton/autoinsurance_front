import { Link } from "react-router-dom";
import { Eye } from 'react-bootstrap-icons'

const ClaimSubjectItem = (props) => {

  const viewHandler = () => {
    props.onViewV(props.id);
  };

  return (
    <tr key={props.id}>
      <td>{props.description}</td>

      <td>
        <Link className="btn" to="#" onClick={viewHandler}>
        <Eye color="blue" size={25} />
        </Link>
      </td>
    </tr>
  );
};

export default ClaimSubjectItem;
