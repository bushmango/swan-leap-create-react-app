import * as _ from 'lodash'

export interface Meta<T> {
  required?: boolean
  mongoRename?: string
  dynamoRename?: string
  meta?: Metadata<any>
}

export type Metadata<T> = { [key in keyof T]: Meta<T> }

// In generic classes
export function validate(object, metadata: Metadata<any>) {
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

export function transformToMongo(object, metadata: Metadata<any>) {
  let transformed: any = {}
  _.forOwn(metadata, (meta, key) => {
    let newKey = key

    if (meta.meta) {
      // We have data to recursively apply to this object
      // doRecursion(object[key], meta.meta)
    }

    if (_.isObjectLike(object[key])) {
      // ???
    }

    if (meta.mongoRename) {
      newKey = meta.mongoRename
    }
    transformed[newKey] = object[key]
  })
  return transformed
}

export function transformToDynamo(object, metadata: Metadata<any>) {
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
