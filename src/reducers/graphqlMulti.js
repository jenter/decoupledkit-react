import { BEGIN_GRAPHQL_MULTI, END_GRAPHQL_MULTI } from '../actions/graphqlMulti'

export default function graphqlMultiReducer(state = {data: []}, action) {
  switch(action.type) {
    case BEGIN_GRAPHQL_MULTI:
      return Object.assign({}, state)
    case END_GRAPHQL_MULTI:
      const { data } = action
      return Object.assign({}, state, { data })

    default:
      return state;
  }
}