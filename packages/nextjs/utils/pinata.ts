import PinataSdk from '@pinata/sdk'
import axios from 'axios'

export const pinata = new PinataSdk({
  pinataJWTKey: process.env.PINATA_JWT,
})

export const ipfsGateway = axios.create({
  baseURL: 'https://ipfs.io/ipfs',
})
