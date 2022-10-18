import { Button, Card, CardBody, CardImg, CardTitle, Col, Row } from 'reactstrap';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import Cart from '../components/Cart';
import { useContext } from 'react';
import AppContext from '../context/AppContext';

const GET_RESTAURANT_DISHES = gql`
  query ($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;

const Restaurants = (props) => {
  const appContext = useContext(AppContext);
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, { variables: { id: router.query.id } });
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>レストランの読み込みに失敗しました</h1>;
  if (data) {
    const { restaurant } = data;
    if ((restaurant.name = 'Purse Workshop')) {
      return (
        <>
          <h1 style={{ marginTop: '1em' }}>{restaurant.name}</h1>
          <Row>
            {restaurant.dishes.map((dish) => (
              <Col xs='12' sm='6' md='4' key={dish.id} style={{ padding: 0 }}>
                <Card style={{ margin: '0 10px' }}>
                  <CardImg src={`${dish.image.url}`} top={true} style={{ height: 250 }} />
                  <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardTitle>{dish.description}</CardTitle>
                  </CardBody>
                  <div className='card-footer'>
                    <Button outline color='primary' onClick={() => appContext.addItem(dish)}>
                      + カートに入れる
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
            <style jsx>
              {`
                a {
                  color: white;
                }
                a:link {
                  text-decoration: none;
                  color: white;
                }
                a:hover {
                  color: white;
                }
                .card-colums {
                  column-count: 3;
                }
              `}
            </style>
            <Col xs='12' sm='6' md='4' style={{ padding: 0 }}>
              <div>
                <Cart />
              </div>
            </Col>
          </Row>
        </>
      );
    } else {
    }
  } else {
    return <h1>レストランが見つかりませんでした。</h1>;
  }
};

export default Restaurants;
