import _ from 'lodash'
import { Meta, testDecorator } from './metadataHelpers'
import { Subtest, SubtestMetadata } from './Subtest'

let TestMetadata: { [key in keyof Test]: Meta<Test> } = {
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
    meta: SubtestMetadata,
  },
  e: {
    required: true,
    meta: {
      something: {
        required: true,
      },
      else: {
        mongoRename: 'blob',
      },
    },
  },
}
export { TestMetadata }

export interface Test {
  a?: string
  b?: number
  c?: string
  d?: Subtest
  e?: {
    someting: string
    else: number
  }
}

// export class TestDecorators implements Test {
//   @testDecorator
//   a: string
// }
