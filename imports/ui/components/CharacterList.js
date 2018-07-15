import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Characters } from '../../api/characters';

export const CharacterList = (props) => {
  
  return (
    <div className="item-list">
      <div className="item-list__header">
        <button className="button" onClick={() => {
          Meteor.call('characters.insert')
        }}>Create Character</button>
      </div>    
      <p>Character List</p>
      {props.characters.map(character => {
        return <p key={character._id}>a character</p>
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