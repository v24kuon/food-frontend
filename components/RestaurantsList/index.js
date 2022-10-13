import Link from 'next/link';
import { Card, CardBody, CardImg, CardTitle, Col, Row } from 'reactstrap';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const query = gql`
  query {
    restaurants {
      id
      name
      description
      image {
        url
      }
    }
  }
`;

const RestaurantList = (props) => {
  const { loading, error, data } = useQuery(query);
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>レストランの読み込みに失敗しました</h1>;
  if (data.restaurants) {
    const searchQuery = data.restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(props.search));
    return (
      <Row>
        {searchQuery.map((res) => (
          <Col xs='6' sm='4' key={res.id}>
            <Card style={{ margin: '0 .5rem 20px 0.5rem' }}>
              <CardImg src={`${process.env.NEXT_PUBLIC_API_URL}${res.image.url}`} top={true} style={{ height: 250 }} />
              <CardBody>
                <CardTitle>{res.name}</CardTitle>
                <CardTitle>{res.description}</CardTitle>
              </CardBody>
              <div className='card-footer'>
                <Link as={`/restaurants/${res.id}`} href={`/restaurants?id=${res.id}`}>
                  <a className='btn btn-primary'>もっと見る</a>
                </Link>
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
      </Row>
    );
  } else {
    return <h1>レストランが見つかりませんでした。</h1>;
  }
};

export default RestaurantList;
