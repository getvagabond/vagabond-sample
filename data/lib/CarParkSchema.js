import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';

import {
  GraphQLLimitedString,
  GraphQLDateTime
} from 'graphql-custom-types';

const CarPark = new GraphQLObjectType({
  name: 'CarPark',
  description: 'CarPark entity',
  fields: () => ({
    key: { type: GraphQLString },
    name: { type: GraphQLString },
    open: { type: GraphQLBoolean },
    free: { type: GraphQLInt },
    total: { type: GraphQLInt }
  })
});

export default CarPark;
