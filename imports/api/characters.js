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
      name: 'New Character',
      description: '',
      feats: [],
      userId: this.userId,
      updatedAt: Date.now()
    })
  },
  'characters.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 2
      }
    }).validate({ _id })
    
    Characters.remove({ _id, userId: this.userId })
  },
  'characters.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not authorized');
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 2
      },
      name: {
        type: String,
        optional: true
      },
      description: {
        type: String,
        optional: true
      }
    }).validate({
      _id,
      ...updates
    });

    Characters.update({
      _id,
      userId: this.userId
    }, {
      $set: {
        updatedAt: Date.now(),
        ...updates
      }
    })
  },
  'characters.updateFeats'(_id, feat) {
    if (!this.userId) {
      throw new Meteor.Error('not authorized');
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 2
      },
      feat: {
        type: String,
        optional: true
      }
    }).validate({
      _id,
      feat
    });

    Characters.update({
      _id,
      userId: this.userId
    }, {
      $push: {
        feats: feat
      }
    })
  }
})