import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Feats } from '../../api/feats';
import FeatListItem from './FeatListItem';

export const FeatList = (props) => {
  
  return (
    <div className="item-list">
      <div className="item-list__header">
        <button className="button" onClick={() => {
          Meteor.call('feats.insert')
        }}>Create Feat</button>
      </div>    
      {props.feats.map(feat => {
        // return <p>a feat</p>
        return <FeatListItem key={feat._id} feat={feat} history={props.appProps.history}/>
      })}
    </div>
  );
};

export default withTracker(() => {
  Meteor.subscribe('feats');
  return {
    feats: Feats.find().fetch()
  }
})(FeatList);