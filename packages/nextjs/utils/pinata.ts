import PinataSdk from '@pinata/sdk'
import axios from 'axios'

export const pinata = new PinataSdk({
  pinataJWTKey: process.env.PINATA_JWT,
})

export const pinataGateway = axios.create({
  baseURL: 'https://gateway.pinata.cloud/ipfs',
})
