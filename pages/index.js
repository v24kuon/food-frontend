import { Col, Input, InputGroup, InputGroupText, Row } from 'reactstrap';
import RestaurantList from '../components/RestaurantsList';
import React, { useState } from 'react';

const index = () => {
  const [query, setQuery] = useState('');
  return (
    <div className='container-fluid'>
      <Row>
        <Col>
          <div className='search'>
            <InputGroup>
              <Input placeholder='レストラン名を入力してください' onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())} />
              <InputGroupText>探す</InputGroupText>
            </InputGroup>
          </div>
          <RestaurantList search={query} />
        </Col>
      </Row>
      <style jsx>
        {`
          .search {
            margin: 20px;
            width: 500px;
          }
        `}
      </style>
    </div>
  );
};

export default index;