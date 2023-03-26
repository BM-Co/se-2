import { expect } from 'chai'
import { ethers } from 'hardhat'
import { AuthorsList, Author } from '../typechain-types'

describe('AuthorsList', function () {
  // We define a fixture to reuse the same setup in every test.

  let authorsList: AuthorsList
  let testAuthor: Author
  before(async () => {
    const [owner] = await ethers.getSigners()
    const yourContractFactory = await ethers.getContractFactory('AuthorsList')
    authorsList = (await yourContractFactory.deploy()) as AuthorsList
    await authorsList.deployed()
    await authorsList.addAuthor('test author', 'test publication', ethers.utils.parseEther('0.01'))
    const pub_details_address = await authorsList.getPublicationDetails(owner.address)
    testAuthor = (await ethers.getContractFactory('Author')).attach(pub_details_address) as Author
  })

  describe('Deployment', function () {
    it('Should allow creating a author', async function () {
      const [owner] = await ethers.getSigners()
      await authorsList.addAuthor('test author', 'test publication', 1)
      const pub_details_address = await authorsList.getPublicationDetails(owner.address)
      const author = (await ethers.getContractFactory('Author')).attach(pub_details_address)
      const deployed_author_name = await author.authorName()
      expect(deployed_author_name).to.equal('test author')
    })
  })

  it('Should allow creating a second author', async function () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [addr1] = await ethers.getSigners()
    await authorsList.connect(addr1).addAuthor('test author 2', 'test publication 2', 1)
    const pub_details_address = await authorsList.getPublicationDetails(addr1.address)
    const author = (await ethers.getContractFactory('Author')).attach(pub_details_address)
    const deployed_author_name = await author.authorName()
    expect(deployed_author_name).to.equal('test author 2')
  })

  it('Should allow changing the subscription price', async function () {
    const price = await testAuthor.getPrice()
    expect(price).to.equal(ethers.utils.parseEther('0.01'))
    await testAuthor.changePrice(ethers.utils.parseEther('0.02'))
    expect(await testAuthor.getPrice()).to.equal(ethers.utils.parseEther('0.02'))
  })

  it('Should allow adding a new post', async function () {
    await testAuthor.publishPost('testIPFSHash')
    const all_posts = await testAuthor.getAllPosts()
    expect(all_posts[0]).to.equal('testIPFSHash')
  })

  it('Should add a new subscriber', async function () {
    const [addr1] = await ethers.getSigners()
    const subscription_price = await testAuthor.getPrice()
    console.log(ethers.utils.formatEther(subscription_price))
    await testAuthor.connect(addr1).extendAndCreateSubscription({ value: subscription_price.mul(2) })
    const is_subscriber = await testAuthor.checkSubscriber(addr1.address)
    expect(is_subscriber).to.equal(true)
    const new_subscription_length = await testAuthor.connect(addr1).getSubscriptionLength()
    const latest_block = await ethers.provider.getBlock('latest')
    expect(new_subscription_length).to.equal(latest_block.timestamp + 86400 * 30 * 2)
  })
})
