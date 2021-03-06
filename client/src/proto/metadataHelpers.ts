import * as _ from 'lodash'

export interface Meta<T> {
  type?: string
  required?: boolean
  mongoRename?: string
  dynamoRename?: string
  metadata?: Metadata<any>
}

export type Metadata<T> = { [key in keyof T]: Meta<T> }

export interface SuperMetadata<T> {
  name: string
  metadata: Metadata<T>
}

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

    if (meta.metadata) {
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

export function createInterfaceFromMetadata(metadata: SuperMetadata<any>) {
  let out = `// autogenerated code\n`
  out += `interface ${metadata.name} {\n`
  out += _writeMetadata(metadata.metadata, 1)
  out += `}\n`
  return out
}

function _writeMetadata(metadata: Metadata<any>, indent: number) {
  let out = ''
  let indentString = ''
  for (let i = 0; i < indent; i++) {
    indentString += '\t'
  }

  _.forOwn(metadata, (meta, key) => {
    let separator = meta.required ? ':' : '?:'
    let type = meta.type || '???'

    if (meta.metadata) {
      // Recurse
      _.forOwn(meta.metadata, (meta2, key2) => {
        type = '{\n'
        type += _writeMetadata(meta.metadata, indent + 1)
        type += '\t}'
      })
    }

    out += `${indentString}${key}${separator} ${type}\n`
  })
  return out
}

export function testDecorator(
  target: any,
  propertyName: string,
  descriptor?: TypedPropertyDescriptor<Function>
) {
  return this
}
