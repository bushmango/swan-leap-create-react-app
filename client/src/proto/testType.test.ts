import React from 'react'
import ReactDOM from 'react-dom'

import * as meta from './metadataHelpers'
import { Test, TestMetadata } from './testType'

it('validates', () => {
  let test: Test = {
    a: 'hello',
    c: 'world',
  }
  expect(meta.validate(test, TestMetadata)).toEqual(true)
  let test2: Test = {
    a: 'hello',
  }
  expect(meta.validate(test2, TestMetadata)).toEqual(false)
})

it('transforms to mongo', () => {
  let test: Test = {
    a: 'hello',
    b: 17,
    c: 'world',
  }
  let transformed = meta.transformToMongo(test, TestMetadata)
  console.log(transformed)
  expect(transformed).toEqual({
    mongoA: 'hello',
    b: 17,
    mongoC: 'world',
  })
})

it('transforms to dynamo', () => {
  let test: Test = {
    a: 'hello',
    b: 17,
    c: 'world',
  }
  let transformed = meta.transformToDynamo(test, TestMetadata)
  console.log(transformed)
  expect(transformed).toEqual({
    dynamo_a: 'hello',
    dynamo_dynamoB: 17,
    dynamo_dynamoC: 'world',
  })
})
