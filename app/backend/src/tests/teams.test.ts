// import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import {app} from '../app';
// import Teams from '../database/models/TeamsModel';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const {expect} = chai;

describe('Testando o fluxo Teams', () => {
  it('Testando se o método GET retorna todos os times', async ()=> {
    
    //Arrange -> Mocks vão aqui,
    const listTeams = [
    {
      id: 1,
      teamName: "Avaí/Kindermann"
    },
    {
      id: 2,
      teamName: "Bahia"
    },
    {
      id: 3,
      teamName: "Botafogo"
    },
  ]
    
    //Action -> Ação ou chamada da função,
    const response = await chai.request(app).get('/teams')


    //assertion -> Se o resultado é o esperado "Expect",
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(listTeams);

  })
})