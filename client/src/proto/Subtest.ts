import { Meta, testDecorator } from './metadataHelpers'

export interface Subtest {
  something: string
}
// type SubtestKeys = keyof Subtest
let SubtestMetadata: { [key in keyof Subtest]: Meta<Subtest> } = {
  something: {
    required: true,
  },
}
export { SubtestMetadata }
