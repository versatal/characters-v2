import React from 'react';
import { Feats } from '../../api/feats';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
    }
  }
  handleNameChange(e) {
    const name = e.target.value;
    this.setState({ name })
    Meteor.call('feats.update', this.props.feat._id, { name })
  }
  handleDescriptionChange(e) {
    const description = e.target.value;
    this.setState({ description })
    Meteor.call('feats.update', this.props.feat._id, { description })
  }  
  handleDeleteFeat() {
    Meteor.call('feats.remove', this.props.feat._id);
    Session.set('selectedFeatId', undefined)
    this.props.appProps.history.push('/admin');
  }
  componentDidUpdate(prevProps, prevState) {
    const currentFeatId = this.props.feat ? this.props.feat._id : undefined;
    const prevFeatId = prevProps.feat ? prevProps.feat._id : undefined;
  
    if (currentFeatId && currentFeatId !== prevFeatId) {
      this.setState({
        name: this.props.feat.name,
        description: this.props.feat.description
      })
    }
  }

  render() {    
    if (this.props.feat) {
      return (
        <div className="editor">
          <input className="editor__title" value={this.state.name} placeholder="Feat Name Here" onChange={this.handleNameChange.bind(this)}/>
          <textarea className="editor__body" value={this.state.description} placeholder="Feat Description Here" onChange={this.handleDescriptionChange.bind(this)}></textarea>
          <div>
            <button className="button button--secondary" onClick={this.handleDeleteFeat.bind(this)}>Delete Feat</button>
          </div>
        </div>
      ) 
    } else {
      return (
        <div className="editor">
          <p className="editor__message">
            {this.props.selectedFeatId ? 'Feat not found.' : 'Pick or create a Feat to get started'}
          </p>
        </div>
      )      
    }

  }
};

export default withTracker(() => {
  const selectedFeatId = Session.get('selectedFeatId')

  return {
    selectedFeatId,
    feat: Feats.findOne(selectedFeatId)
  }
})(Editor);