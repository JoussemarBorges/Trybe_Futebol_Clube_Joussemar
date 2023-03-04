import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import {app} from '../app';
import {mockUserLogin, mockToken, inputLogin} from './mocks/mockLogin'
import User from '../database/models/UsersModel';

import { Response } from 'superagent';


chai.use(chaiHttp);

const {expect} = chai;

describe('Teste da rota /login', () => {
  beforeEach(async () => {
    sinon.stub(User, 'findOne').resolves(mockUserLogin);
  })

  afterEach(()=> {
    (User.findOne as sinon.SinonStub).restore();
  })

  it('testa se o post na rota /login retorna o esperado', async () => {
    const response = await chai.request(app)
    .post('/login')
    .send(inputLogin)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal(mockToken)
  })
})