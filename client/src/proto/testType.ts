import _ from 'lodash'
import { Meta, testDecorator } from './metadataHelpers'

export interface Test {
  a?: string
  b?: number
  c?: string
}
type TestKeys = keyof Test

let TestMetadata: { [key in TestKeys]: Meta } = {
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
}

export class TestDecorators implements Test {
  @testDecorator
  a: string
}

export { TestMetadata }
