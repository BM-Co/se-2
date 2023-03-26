export default {
  31337: [
    {
      name: 'localhost',
      chainId: '31337',
      contracts: {
        Author: {
          address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
          abi: [
            {
              inputs: [
                {
                  internalType: 'address',
                  name: '_owner',
                  type: 'address',
                },
                {
                  internalType: 'string',
                  name: '_authorName',
                  type: 'string',
                },
                {
                  internalType: 'string',
                  name: '_publicationName',
                  type: 'string',
                },
                {
                  internalType: 'uint256',
                  name: '_subscriptionPrice',
                  type: 'uint256',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'constructor',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'subscriber',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'extensionLength',
                  type: 'uint256',
                },
              ],
              name: 'newExtendSubscriptionEvent',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'string',
                  name: 'postAddress',
                  type: 'string',
                },
              ],
              name: 'newPost',
              type: 'event',
            },
            {
              inputs: [],
              name: 'authorAddress',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'authorName',
              outputs: [
                {
                  internalType: 'string',
                  name: '',
                  type: 'string',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '_newPrice',
                  type: 'uint256',
                },
              ],
              name: 'changePrice',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: '_userAddress',
                  type: 'address',
                },
              ],
              name: 'checkSubscriber',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'extendAndCreateSubscription',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'payable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'getAllPosts',
              outputs: [
                {
                  internalType: 'string[]',
                  name: '',
                  type: 'string[]',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'getPrice',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'getSubscriptionLength',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              name: 'posts',
              outputs: [
                {
                  internalType: 'string',
                  name: '',
                  type: 'string',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'publicationName',
              outputs: [
                {
                  internalType: 'string',
                  name: '',
                  type: 'string',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'string',
                  name: 'postipfsHash',
                  type: 'string',
                },
              ],
              name: 'publishPost',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'withdraw',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              stateMutability: 'payable',
              type: 'receive',
            },
          ],
        },
        AuthorsList: {
          address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          abi: [
            {
              inputs: [],
              stateMutability: 'nonpayable',
              type: 'constructor',
            },
            {
              inputs: [
                {
                  internalType: 'string',
                  name: '_authorName',
                  type: 'string',
                },
                {
                  internalType: 'string',
                  name: '_publicationName',
                  type: 'string',
                },
                {
                  internalType: 'uint256',
                  name: '_subscriptionPrice',
                  type: 'uint256',
                },
              ],
              name: 'addAuthor',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              name: 'authorsAddress',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'getAllAuthors',
              outputs: [
                {
                  internalType: 'address[]',
                  name: '',
                  type: 'address[]',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: '_authorAddress',
                  type: 'address',
                },
              ],
              name: 'getPublicationDetails',
              outputs: [
                {
                  internalType: 'contract Author',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'masterAddress',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              name: 'subscriberMap',
              outputs: [
                {
                  internalType: 'contract Author',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
          ],
        },
      },
    },
  ],
  80001: [
    {
      name: 'polygonMumbai',
      chainId: '80001',
      contracts: {
        AuthorsList: {
          address: '0x2412Bf7382707c4f1e8ED183A66D890503c26949',
          abi: [
            {
              inputs: [],
              stateMutability: 'nonpayable',
              type: 'constructor',
            },
            {
              inputs: [
                {
                  internalType: 'string',
                  name: '_authorName',
                  type: 'string',
                },
                {
                  internalType: 'string',
                  name: '_publicationName',
                  type: 'string',
                },
                {
                  internalType: 'uint256',
                  name: '_subscriptionPrice',
                  type: 'uint256',
                },
              ],
              name: 'addAuthor',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              name: 'authorsAddress',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'getAllAuthors',
              outputs: [
                {
                  internalType: 'address[]',
                  name: '',
                  type: 'address[]',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: '_authorAddress',
                  type: 'address',
                },
              ],
              name: 'getPublicationDetails',
              outputs: [
                {
                  internalType: 'contract Author',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'masterAddress',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              name: 'subscriberMap',
              outputs: [
                {
                  internalType: 'contract Author',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
          ],
        },
        Author: {
          address: '0x835E27b8dD7a1Ce2ab5fd1AF1933341d22ECf90A',
          abi: [
            {
              inputs: [
                {
                  internalType: 'address',
                  name: '_owner',
                  type: 'address',
                },
                {
                  internalType: 'string',
                  name: '_authorName',
                  type: 'string',
                },
                {
                  internalType: 'string',
                  name: '_publicationName',
                  type: 'string',
                },
                {
                  internalType: 'uint256',
                  name: '_subscriptionPrice',
                  type: 'uint256',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'constructor',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'subscriber',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'extensionLength',
                  type: 'uint256',
                },
              ],
              name: 'newExtendSubscriptionEvent',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'string',
                  name: 'postAddress',
                  type: 'string',
                },
              ],
              name: 'newPost',
              type: 'event',
            },
            {
              inputs: [],
              name: 'authorAddress',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'authorName',
              outputs: [
                {
                  internalType: 'string',
                  name: '',
                  type: 'string',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '_newPrice',
                  type: 'uint256',
                },
              ],
              name: 'changePrice',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: '_userAddress',
                  type: 'address',
                },
              ],
              name: 'checkSubscriber',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'extendAndCreateSubscription',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'payable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'getAllPosts',
              outputs: [
                {
                  internalType: 'string[]',
                  name: '',
                  type: 'string[]',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'getPrice',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'getSubscriptionLength',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              name: 'posts',
              outputs: [
                {
                  internalType: 'string',
                  name: '',
                  type: 'string',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'publicationName',
              outputs: [
                {
                  internalType: 'string',
                  name: '',
                  type: 'string',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'string',
                  name: 'postipfsHash',
                  type: 'string',
                },
              ],
              name: 'publishPost',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'withdraw',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              stateMutability: 'payable',
              type: 'receive',
            },
          ],
        },
      },
    },
  ],
  11155111: [
    {
      name: 'sepolia',
      chainId: '11155111',
      contracts: {
        Author: {
          address: '0x835E27b8dD7a1Ce2ab5fd1AF1933341d22ECf90A',
          abi: [
            {
              inputs: [
                {
                  internalType: 'address',
                  name: '_owner',
                  type: 'address',
                },
                {
                  internalType: 'string',
                  name: '_authorName',
                  type: 'string',
                },
                {
                  internalType: 'string',
                  name: '_publicationName',
                  type: 'string',
                },
                {
                  internalType: 'uint256',
                  name: '_subscriptionPrice',
                  type: 'uint256',
                },
              ],
              stateMutability: 'nonpayable',
              type: 'constructor',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'address',
                  name: 'subscriber',
                  type: 'address',
                },
                {
                  indexed: false,
                  internalType: 'uint256',
                  name: 'extensionLength',
                  type: 'uint256',
                },
              ],
              name: 'newExtendSubscriptionEvent',
              type: 'event',
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: 'string',
                  name: 'postAddress',
                  type: 'string',
                },
              ],
              name: 'newPost',
              type: 'event',
            },
            {
              inputs: [],
              name: 'authorAddress',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'authorName',
              outputs: [
                {
                  internalType: 'string',
                  name: '',
                  type: 'string',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '_newPrice',
                  type: 'uint256',
                },
              ],
              name: 'changePrice',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: '_userAddress',
                  type: 'address',
                },
              ],
              name: 'checkSubscriber',
              outputs: [
                {
                  internalType: 'bool',
                  name: '',
                  type: 'bool',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'extendAndCreateSubscription',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'payable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'getAllPosts',
              outputs: [
                {
                  internalType: 'string[]',
                  name: '',
                  type: 'string[]',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'getPrice',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'getSubscriptionLength',
              outputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              name: 'posts',
              outputs: [
                {
                  internalType: 'string',
                  name: '',
                  type: 'string',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'publicationName',
              outputs: [
                {
                  internalType: 'string',
                  name: '',
                  type: 'string',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'string',
                  name: 'postipfsHash',
                  type: 'string',
                },
              ],
              name: 'publishPost',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [],
              name: 'withdraw',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              stateMutability: 'payable',
              type: 'receive',
            },
          ],
        },
        AuthorsList: {
          address: '0x2412Bf7382707c4f1e8ED183A66D890503c26949',
          abi: [
            {
              inputs: [],
              stateMutability: 'nonpayable',
              type: 'constructor',
            },
            {
              inputs: [
                {
                  internalType: 'string',
                  name: '_authorName',
                  type: 'string',
                },
                {
                  internalType: 'string',
                  name: '_publicationName',
                  type: 'string',
                },
                {
                  internalType: 'uint256',
                  name: '_subscriptionPrice',
                  type: 'uint256',
                },
              ],
              name: 'addAuthor',
              outputs: [],
              stateMutability: 'nonpayable',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: '',
                  type: 'uint256',
                },
              ],
              name: 'authorsAddress',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'getAllAuthors',
              outputs: [
                {
                  internalType: 'address[]',
                  name: '',
                  type: 'address[]',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: '_authorAddress',
                  type: 'address',
                },
              ],
              name: 'getPublicationDetails',
              outputs: [
                {
                  internalType: 'contract Author',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [],
              name: 'masterAddress',
              outputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
            {
              inputs: [
                {
                  internalType: 'address',
                  name: '',
                  type: 'address',
                },
              ],
              name: 'subscriberMap',
              outputs: [
                {
                  internalType: 'contract Author',
                  name: '',
                  type: 'address',
                },
              ],
              stateMutability: 'view',
              type: 'function',
            },
          ],
        },
      },
    },
  ],
} as const
