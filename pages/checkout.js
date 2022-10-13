import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Col, Row } from 'reactstrap';
import Cart from '../components/Cart/index';
import CheckOutForm from '../components/Checkout/CheckOutForm';

const checkout = () => {
  const stripePromise = loadStripe('pk_test_51LrzpSL1w68IBun6ofh5tCmKKU8Yx5ZWhAG35UuMobGONmYfB7j7y5XMPJeV4gtLU3snqCn2zlRQNw2fO4q9azLR00eGo9tREl');
  return (
    <Row>
      <Col style={{ paddingRight: 0 }} sm={{ size: 3, order: 1, offset: 2 }}>
        <h1 style={{ margin: 20, fontSize: 20, textAlign: 'center' }}>チェックアウト</h1>
        <Cart />
      </Col>
      <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
        <Elements stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      </Col>
    </Row>
  );
};

export default checkout;
