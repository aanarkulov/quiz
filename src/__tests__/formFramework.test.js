import { validate } from '../form/formFramework'

describe('formFrameowork test', () => {

    it('validate test', () => {
        expect(validate('', null)).toBe(true)
        expect(validate('value', { minLength: 5 })).toBe(true)
    })

})