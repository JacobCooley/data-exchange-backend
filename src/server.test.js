const request = require('supertest')

describe('GET Endpoints', () => {
  var server
  beforeEach(function() {
    server = require('./server')
  })
  afterEach(function() {
    server.close()
  })
  
  it('pairs endpoint valid', async () => {
    const res = await request(server)
      .get('/pairs/binance')
      .send()
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('result')
  
    const resInvalid = await request(server)
      .get('/pairs/nonvalidexchange')
      .send()
    expect(resInvalid.statusCode).toEqual(200)
    expect(resInvalid.body).toHaveProperty('error')
  })
  
  it('exchanges endpoint valid', async () => {
    const res = await request(server)
      .get('/exchanges')
      .send()
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('result')
  })
  
  it('books endpoint valid', async () => {
    const res = await request(server)
      .get('/books/binance/ethbtc')
      .send()
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('result')
  
    const resInvalid = await request(server)
      .get('/books/nonvalidexchange/ethbtc')
      .send()
    expect(resInvalid.statusCode).toEqual(200)
    expect(resInvalid.body).toHaveProperty('error')
  
    const resInvalidPair = await request(server)
      .get('/pairs/binance/invalidpair')
      .send()
    expect(resInvalidPair.statusCode).toEqual(404)
  })

  it('404 non valid endpoint', async () => {
    request(server)
      .get('/noroute')
      .expect(404)
  })
})
