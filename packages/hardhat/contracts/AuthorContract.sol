//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Author {
    // State Variables
    address public authorAddress;
    string public authorName;
    string public publicationName;
    uint256 private subscriptionPrice = 0;
    mapping(address => uint) private subscriberMap;
    string[] public posts;

    // Events: a way to emit log statements from smart contract that can be listened to by external parties
    event newPost(string postAddress);
    event newExtendSubscriptionEvent(address subscriber, uint256 extensionLength);

    // Constructor: Called once on contract deployment
    // Check packages/hardhat/deploy/00_deploy_your_contract.ts
    constructor(address _owner, string memory _authorName, string memory _publicationName, uint256 _subscriptionPrice) {
        authorAddress = _owner;
        authorName = _authorName;
        subscriptionPrice = _subscriptionPrice;
        publicationName = _publicationName;
    }

    // Modifier: used to define a set of rules that must be met before or after a function is executed
    // Check the withdraw() function
    modifier isOwner() {
        // msg.sender: predefined variable that represents address of the account that called the current function
        require(msg.sender == authorAddress, 'Not the Owner');
        _;
    }

    /**
     * Function that allows a user to extend their subscription for the particular author
     *
     */
    function extendAndCreateSubscription() public payable returns (uint256) {
        uint256 subscriptionIncreaseLength = 0;
        if (subscriptionPrice > 0) {
            subscriptionIncreaseLength = (msg.value / subscriptionPrice) * 86400 * 30;
        } else {
            subscriptionIncreaseLength = 90 * 86400 * 30;
        }

        if (subscriberMap[msg.sender] < block.timestamp) {
            subscriberMap[msg.sender] = block.timestamp + subscriptionIncreaseLength;
        } else {
            subscriberMap[msg.sender] = subscriberMap[msg.sender] + subscriptionIncreaseLength;
        }
        // emit: keyword used to trigger an event
        emit newExtendSubscriptionEvent(msg.sender, subscriptionIncreaseLength);
        return subscriberMap[msg.sender];
    }

    /**
     * Function that allows the owner to withdraw all the Ether in the contract
     * The function can only be called by the owner of the contract as defined by the isOwner modifier
     */
    function withdraw() public isOwner {
        (bool success, ) = authorAddress.call{value: address(this).balance}('');
        require(success, 'Failed to send Ether');
    }

    /**
     * Function that allows the owner to publish a new post
     * The function can only be called by the owner of the contract as defined by the isOwner modifier
     */
    function publishPost(string memory postipfsHash) public isOwner {
        posts.push(postipfsHash);
    }

    /**
     * Function that allows the owner to change monthly price
     * The function can only be called by the owner of the contract as defined by the isOwner modifier
     */
    function changePrice(uint256 _newPrice) public isOwner {
        subscriptionPrice = _newPrice;
    }

    /**
     * Function that allows the owner to change monthly price
     * The function can only be called by the owner of the contract as defined by the isOwner modifier
     */
    function getPrice() public view returns (uint256) {
        return subscriptionPrice;
    }

    /**
     * Function that checks if the user has a valid subscription
     */
    function checkSubscriber(address _userAddress) public view returns (bool) {
        if (subscriberMap[_userAddress] < block.timestamp) {
            return false;
        }
        return true;
    }

    /**
     * Returns expiring time of the user subscription
     */
    function getSubscriptionLength() public view returns (uint) {
        return subscriberMap[msg.sender];
    }

    function getAllPosts() external view returns (string[] memory) {
        return posts;
    }

    /**
     * Function that allows the contract to receive ETH
     */
    receive() external payable {}
}

contract AuthorsList {
    address public masterAddress;

    // Constructor: Called once on contract deployment
    // Check packages/hardhat/deploy/00_deploy_your_contract.ts
    constructor() {
        masterAddress = msg.sender;
    }

    // State Variables
    mapping(address => Author) public subscriberMap;
    address[] public authorsAddress;

    /**
     * Function that adds an author to the list of all authors
     *
     */

    function addAuthor(string memory _authorName, string memory _publicationName, uint256 _subscriptionPrice) public {
        Author author = new Author(msg.sender, _authorName, _publicationName, _subscriptionPrice);
        authorsAddress.push(msg.sender);
        subscriberMap[msg.sender] = author;
    }

    function getPublicationDetails(address _authorAddress) public view returns (Author) {
        return subscriberMap[_authorAddress];
    }

    function getAllAuthors() public view returns (address[] memory) {
        return authorsAddress;
    }

    modifier isOwner() {
        // msg.sender: predefined variable that represents address of the account that called the current function
        require(msg.sender == masterAddress, 'Not the Owner');
        _;
    }
}
