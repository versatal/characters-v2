import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

const FeatListItem = (props) => {

  const className = props.feat.selected ? 'item item--selected' : 'item';

  return (
    <div className={className} onClick={() => {
      props.Session.set('selectedFeatId', props.feat._id);
      props.history.replace(`/admin/${props.feat._id}`)
    }}>
      <h5 className="item__title" >{ props.feat.name || "Untitled Feat" }</h5>
      <p className="item__subtitle" >{ moment(props.feat.updatedAt).format('M/DD/YY') }</p>
    </div>
  )
}

export default withTracker(() => {
  return {Session};
})(FeatListItem)