import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

const CharacterListItem = (props) => {

  const className = props.character.selected ? 'item item--selected' : 'item';

  return (
    <div className={className} onClick={() => {
      props.Session.set('selectedCharacterId', props.character._id);
      props.history.replace(`/dashboard/${props.character._id}`)
    }}>
      <h5 className="item__title" >{ props.character.name || "Untitled Character" }</h5>
      <p className="item__subtitle" >{ moment(props.character.updatedAt).format('M/DD/YY') }</p>
    </div>
  )
}

export default withTracker(() => {
  return {Session};
})(CharacterListItem)