import * as _ from 'lodash'

export interface Meta {
  required?: boolean
  mongoRename?: string
  dynamoRename?: string
}

// In generic classes
export function validate(object, metadata: { [key: string]: Meta }) {
  let valid = true
  _.forOwn(metadata, (meta, key) => {
    if (meta.required) {
      if (object[key] == null) {
        valid = false
        return false
      }
    }
    // More validation options here
  })
  return valid
}

export function transformToMongo(object, metadata: { [key: string]: Meta }) {
  let transformed: any = {}
  _.forOwn(metadata, (meta, key) => {
    let newKey = key
    if (meta.mongoRename) {
      newKey = meta.mongoRename
    }
    transformed[newKey] = object[key]
  })
  return transformed
}

export function transformToDynamo(object, metadata: { [key: string]: Meta }) {
  let transformed: any = {}
  _.forOwn(metadata, (meta, key) => {
    let newKey = key
    if (meta.dynamoRename) {
      newKey = meta.dynamoRename
    }
    newKey = 'dynamo_' + newKey
    transformed[newKey] = object[key]
  })
  return transformed
}

export function testDecorator(
  target: any,
  propertyName: string,
  descriptor?: TypedPropertyDescriptor<Function>
) {
  return this
}
