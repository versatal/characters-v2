import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export const Feats = new Mongo.Collection('feats');

if (Meteor.isServer) {
  Meteor.publish('feats', function () {
    return Feats.find();
  });
}

Meteor.methods({
  'feats.insert'() {
    
    if (!this.userId) {
      throw new Meteor.Error('not authorized');
    }

    return Feats.insert({
      name: '',
      description: '',
      updatedAt: Date.now()
    })
  },
  'feats.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not authorized');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 2
      }
    }).validate({ _id })
    
    Feats.remove({ _id })
  },
  'feats.update'(_id, updates) {
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

    Feats.update({
      _id
    }, {
      $set: {
        updatedAt: Date.now(),
        ...updates
      }
    })
  }
})