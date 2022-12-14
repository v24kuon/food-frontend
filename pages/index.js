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
              <Input placeholder='ショップ名を入力してください' onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())} />
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
            max-width: 100%;
          }
        `}
      </style>
    </div>
  );
};

export default index;
