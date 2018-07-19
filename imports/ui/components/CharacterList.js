import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Characters } from '../../api/characters';
import CharacterListItem from './CharacterListItem';

export const CharacterList = (props) => {
  
  return (
    <div className="item-list">
      <div className="item-list__header">
        <button className="button" onClick={() => {
          Meteor.call('characters.insert')
        }}>Create Character</button>
      </div>    
      {props.characters.map(character => {
        return <CharacterListItem key={character._id} character={character} history={props.appProps.history}/>
      })}
    </div>
  );
};

export default withTracker(() => {
  Meteor.subscribe('characters');
  return {
    characters: Characters.find().fetch()
  }
})(CharacterList);