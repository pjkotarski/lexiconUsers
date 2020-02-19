var expect = require('chai').expect;

const sinon = require('sinon');

var UserModel = require('../../../models/user')



describe('User model tests', () => { 

    const fullUser = {
        "firstName" : "test",
        "lastName" : "user",
        "email" : "emmmmaiiill",
        "hashedPassword" : "password",
        "words" : []
    }

    it('user validation insufficient', (done) => {
        var user = new UserModel()

        user.validate((err) => {
            expect(err.errors.firstName).to.exist;
            done();
        })
    })

    it('user validation sufficient', (done) => {
        var user = new UserModel(fullUser)

        user.validate((err) => {
            expect(err).to.not.exist;
            done()
        })
    })

    it('save user method', () => { 

        const user = new UserModel(fullUser)

        sinon.stub(user, 'save')
        
        user.saveUser(() => {})
           
        sinon.assert.calledWith(UserModel.save, user)
    })
})