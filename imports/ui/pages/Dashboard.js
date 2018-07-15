import React from 'react';

import PrivateHeader from '../components/PrivateHeader';
import CharacterList from '../components/CharacterList';
import Editor from '../components/Editor';


export default (props) => {
  return (
    <div>
      <PrivateHeader appProps={props}/>
      <div className="page-content">
        <div className="page-content__sidebar">
          <CharacterList appProps={props}/>
        </div>
        <div className="page-content__main">
          <Editor appProps={props}/>
        </div>
      </div>
    </div>
  )
}