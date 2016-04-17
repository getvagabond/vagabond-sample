import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import CarPark from './CarParkSchema';
import { getCarPark, newCarPark,  argsCarPark} from './CarParkDynamo';

//vagabond-needle-import-entity-to-schema

const Query = new GraphQLObjectType({
  name: 'SampleSchema',
  description: 'Root of the Sample Schema',
  fields: () => ({
    carPark: {
      type: CarPark,
      description: 'Get CarPark by key',
      args: {
        key: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: function(source, {key}) {
        return getCarPark(key);
      }
    }
    //vagabond-needle-insert-entity-query-to-schema    
  })
});

const Mutuation = new GraphQLObjectType({
  name: 'SampleMutations',
  description: 'Sample Mutations',
  fields: {
    newCarPark: {
      type: CarPark,
      description: 'Create a CarPark',
      args: argsCarPark,
      resolve: newCarPark
    }

    //vagabond-needle-insert-entity-mutation-to-schema
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutuation
});

export default Schema;
