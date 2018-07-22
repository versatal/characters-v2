import React from 'react';
import { Feats } from '../../api/feats';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export class FeatsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feats: []
    }
  }
  handleAddFeat (e) {
    const feat = e.currentTarget.dataset.id;
    let feats = this.state.feats;
    feats.push(feat);
    this.setState({
      feats
    })
    Meteor.call('characters.updateFeats', this.props.character._id, feat)
    
  }

  componentDidMount() {
    if (this.props.character) {
      this.setState({
        feats: this.props.character.feats
      })  
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const currentCharacterId = this.props.character ? this.props.character._id : undefined;
    const prevCharacterId = prevProps.character ? prevProps.character._id : undefined;
  
    if (currentCharacterId && currentCharacterId !== prevCharacterId) {
      this.setState({
        feats: this.props.character.feats
      })
    }
  }

  render() {    
    return (
    
    <div className="editor__feats">
    <div className="item-list item-list__editor">   
      {this.props.feats.map(feat => {
        return <p key={feat._id} data-id={feat._id} onClick={this.handleAddFeat.bind(this)}>{feat.name}</p>
      })}
    </div>
    <div className="item-list item-list__editor">
      {
        this.state.feats.map((feat, index) => {
          const myFeat = Feats.findOne({
            _id: feat
          })
          return <p key={index}>{myFeat ? myFeat.name : feat}</p>
        })
      }   
    </div>
  </div> 

    )
  }
};

export default withTracker(() => {
  const selectedCharacterId = Session.get('selectedCharacterId')
  Meteor.subscribe('feats');
  return {
    selectedCharacterId,
    feats: Feats.find().fetch()
  }
})(FeatsPanel);