import React from 'react';

import PrivateHeader from '../components/PrivateHeader';
import FeatList from '../components/FeatList';
import FeatEditor from '../components/FeatEditor';

export default (props) => {
  return (
    <div>
      <PrivateHeader title="Characters" appProps={props}/>
      <div className="page-content">
        <div className="page-content__sidebar">
          <FeatList appProps={props}/>
        </div>
        <div className="page-content__main">
          <FeatEditor appProps={props}/>
        </div>
      </div>
    </div>
  )
}