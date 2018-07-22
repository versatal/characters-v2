import React from 'react';
import { Characters } from '../../api/characters';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import BasicPanel from './BasicPanel';
import FeatsPanel from './FeatsPanel';

export class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {        
    if (this.props.character) {
      return (
        <div className="editor">
          <Tabs>
            <TabList>
              <Tab>Basic</Tab>
              <Tab>Feats</Tab>
            </TabList>
            <TabPanel>
              <BasicPanel character={this.props.character} />
            </TabPanel>
            <TabPanel>
              <FeatsPanel character={this.props.character} />
            </TabPanel>
          </Tabs>
        </div>
      ) 
    } else {
      return (
        <div className="editor">
          <p className="editor__message">
            {this.props.selectedCharacterId ? 'Character not found.' : 'Pick or create a character to get started'}
          </p>
        </div>
      )      
    }

  }
};

export default withTracker(() => {
  const selectedCharacterId = Session.get('selectedCharacterId')
  return {
    selectedCharacterId,
    character: Characters.findOne(selectedCharacterId)
  }
})(Editor);