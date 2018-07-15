import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export const Characters = new Mongo.Collection('characters');

if (Meteor.isServer) {
  Meteor.publish('characters', function () {
    return Characters.find({ userId: this.userId });
  });
}

Meteor.methods({
  'characters.insert'() {
    
    if (!this.userId) {
      throw new Meteor.Error('not authorized');
    }

    return Characters.insert({
      name: '',
      description: '',
      userId: this.userId,
      updatedAt: Date.now()
    })
  }
})