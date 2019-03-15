import _ from 'lodash'
import { Meta, Metadata, SuperMetadata, testDecorator } from './metadataHelpers'
import { Subtest, SubtestMetadata } from './Subtest'
import { string } from 'prop-types'

let TestMetadata: SuperMetadata<Test> = {
  name: 'Test',
  metadata: {
    a: {
      required: true,
      mongoRename: 'mongoA',
    },
    b: {
      dynamoRename: 'dynamoB',
    },
    c: {
      required: true,
      mongoRename: 'mongoC',
      dynamoRename: 'dynamoC',
    },
    d: {
      required: true,
      metadata: SubtestMetadata,
    },
    e: {
      required: true,
      metadata: <Metadata<Test['e']>>{
        something2: {
          required: true,
        },
        else2: {
          required: true,
        },
        // else3: {}
      },
    },
  },
}
export { TestMetadata }

let TestMetadata2: SuperMetadata<Test> = {
  name: 'Test',
  metadata: {
    a: {
      type: 'string',
      required: true,
      mongoRename: 'mongoA',
    },
    e: {
      metadata: {
        something2: {
          type: 'string',
          required: true,
        },
        else2: {
          type: 'number',
        },
      },
    },
  },
}
export { TestMetadata2 }

export interface Test {
  a?: string
  b?: number
  c?: string
  d?: Subtest
  e?: {
    something2: string
    else2: number
    else3: string
  }
  f?: number
}

// export interface E {
//   something2: string
//   else2: number
// }

// Idea : create a very simple tool to dynamically create Interfaces from this
// Advantage : can write validators on objects coming from json, etc.
