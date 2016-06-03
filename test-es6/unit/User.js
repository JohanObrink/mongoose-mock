import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import User from '../fixtures/User'
import mongooseMock from '../../index'

chai.use(sinonChai)

describe('User', () => {
  
  beforeEach(() => {
    User.__Rewire__('mongoose', { mongoose: mongooseMock })
  })

  afterEach(() => {
    User.__ResetDependency__('mongoose')
  })

  describe('.findByName', () => {
    it('finds users by name', () => {
      const spy = sinon.spy(User, 'find')
      User.findByName('White')
      expect(spy).to.have.been.calledOnce
      User.find.restore()
    })
  })
})