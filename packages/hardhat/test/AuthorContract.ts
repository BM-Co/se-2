import { expect } from "chai";
import { ethers } from "hardhat";
import { AuthorsList } from "../typechain-types";

describe("AuthorsList", function () {
  // We define a fixture to reuse the same setup in every test.

  let authorsList: AuthorsList;
  before(async () => {
    const yourContractFactory = await ethers.getContractFactory("AuthorsList");
    authorsList = (await yourContractFactory.deploy()) as AuthorsList;
    await authorsList.deployed();
  });

  describe("Deployment", function () {
    it("Should allow creating a author", async function () {
      const [owner] = await ethers.getSigners();
      await authorsList.addAuthor("test author", "test publication", 1);
      const pub_details_address = await authorsList.getPublicationDetails(owner.address);
      const author = (await ethers.getContractFactory("Author")).attach(pub_details_address);
      const deployed_author_name = await author.authorName();
      expect(deployed_author_name).to.equal("test author");
    });
  });
});
