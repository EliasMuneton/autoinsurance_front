import {  useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AuthContext from '../../store/auth-context';


const StartingPageContent = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Card className="text-center">
      <Card.Header>Autoinsurance Web Site</Card.Header>
      <Card.Body>
        <Card.Title>Welcome on board!</Card.Title>
        <Card.Text>
          We are going to help you with yours cars and claims
        </Card.Text>
        {!authCtx.isLoggedIn && (
          <>
        <Button href="/auth" variant="primary">Go Login</Button> {" "}
        <Button href="/register" variant="primary">Go to Create Account</Button> {" "}
        </>
        )}
      </Card.Body>
      <Card.Footer className="text-muted"></Card.Footer>
    </Card>
  );
};

export default StartingPageContent;
