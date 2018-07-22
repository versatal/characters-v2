import React from 'react';
import { Characters } from '../../api/characters';
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
    Meteor.call('characters.update', this.props.character._id, { name })
  }
  handleDescriptionChange(e) {
    const description = e.target.value;
    this.setState({ description })
    Meteor.call('characters.update', this.props.character._id, { description })
  }  
  handleDeleteCharacter() {
    Meteor.call('characters.remove', this.props.character._id);
    Session.set('selectedCharacterId', undefined)
    this.props.appProps.history.push('/dashboard');
  }

  componentDidMount(prevProps, prevState) {
    this.setState({
      name: this.props.character.name,
      description: this.props.character.description
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const currentCharacterId = this.props.character ? this.props.character._id : undefined;
    const prevCharacterId = prevProps.character ? prevProps.character._id : undefined;
  
    if (currentCharacterId && currentCharacterId !== prevCharacterId) {
      this.setState({
        name: this.props.character.name,
        description: this.props.character.description
      })
    }
  }

  render() {    
    return (
      <div className="editor__panel">
        <input className="editor__title" value={this.state.name} placeholder="Character Name Here" onChange={this.handleNameChange.bind(this)}/>

        <textarea className="editor__body" value={this.state.description} placeholder="Character Description Here" onChange={this.handleDescriptionChange.bind(this)}></textarea>
        <div>
          <button className="button button--secondary" onClick={this.handleDeleteCharacter.bind(this)}>Delete Character</button>
        </div>
      </div>
    )

  }
};

export default withTracker(() => {
  const selectedCharacterId = Session.get('selectedCharacterId')
  return {
    selectedCharacterId
  }
})(Editor);