import { expect } from 'chai'
import { parseEcocURI, generateEcocURI } from '@/services/uri'

describe('URI test', () => {
  it('can generate correct EcocURI', () => {
    const uri = generateEcocURI('ESMNjqd6JyTSjm7ktbJCe3ciG1Syisbeht', '100')
    expect(uri)
      .to.be.an('string')
      .that.include('ecoc')
  })

  it('can parse correct EcocURI', () => {
    const correctUri = 'ecoc:ESMNjqd6JyTSjm7ktbJCe3ciG1Syisbeht'
    const urlObject = parseEcocURI(correctUri)
    expect(urlObject).to.have.property('address')
  })

  it('can parse correct EcocURI with amount', () => {
    const correctUri = 'ecoc:ESMNjqd6JyTSjm7ktbJCe3ciG1Syisbeht?amount=321'
    const urlObject = parseEcocURI(correctUri)
    expect(urlObject).to.have.property('address')
    expect(urlObject).to.have.property('amount')
  })

  it('can parse even pure ECOC address EcocURI', () => {
    const correctUri = 'ESMNjqd6JyTSjm7ktbJCe3ciG1Syisbeht'
    const urlObject = parseEcocURI(correctUri)
    expect(urlObject).to.have.property('address')
  })
})
