import { Contract, utils } from 'ethers'
import { FunctionFragment } from 'ethers/lib/utils'

/**
 * @param {Contract} contract
 * @returns {FunctionFragment[]} array of function fragments
 */
const getAllContractFunctions = (contract: Contract | null): FunctionFragment[] => {
  return contract ? Object.values(contract.interface.functions).filter((fn) => fn.type === 'function') : []
}

/**
 * @dev utility function to generate key corresponding to function metaData
 * @param {FunctionFragment} functionInfo
 * @param {utils.ParamType} input - object containing function name and input type corresponding to index
 * @param {number} inputIndex
 * @returns {string} key
 */
const getFunctionInputKey = (functionInfo: FunctionFragment, input: utils.ParamType, inputIndex: number): string => {
  const name = input?.name || `input_${inputIndex}_`
  return functionInfo.name + '_' + name + '_' + input.type + '_' + input.baseType
}

/**
 * @dev utility function to parse error thrown by ethers
 * @param e - ethers error object
 * @returns {string} parsed error string
 */
const getParsedEthersError = (e: any): string => {
  let message =
    e.data && e.data.message
      ? e.data.message
      : e.error && JSON.parse(JSON.stringify(e.error)).body
      ? JSON.parse(JSON.parse(JSON.stringify(e.error)).body).error.message
      : e.data
      ? e.data
      : JSON.stringify(e)
  if (!e.error && e.message) {
    message = e.message
  }

  console.log('Attempt to clean up:', message)
  try {
    const obj = JSON.parse(message)
    if (obj && obj.body) {
      const errorObj = JSON.parse(obj.body)
      if (errorObj && errorObj.error && errorObj.error.message) {
        message = errorObj.error.message
      }
    }
  } catch (e) {
    //ignore
  }

  return message
}

/**
 * @dev Parse form input with array support
 * @param {Record<string,any>} form - form object containing key value pairs
 * @returns  parsed error string
 */
const getParsedContractFunctionArgs = (form: Record<string, any>) => {
  const keys = Object.keys(form)
  const parsedArguments = keys.map((key) => {
    try {
      const keySplitArray = key.split('_')
      const baseTypeOfArg = keySplitArray[keySplitArray.length - 1]
      let valueOfArg = form[key]

      if (['array', 'tuple'].includes(baseTypeOfArg)) {
        valueOfArg = JSON.parse(valueOfArg)
      } else if (baseTypeOfArg === 'bool') {
        if (['true', '1', '0x1', '0x01', '0x0001'].includes(valueOfArg)) {
          valueOfArg = 1
        } else {
          valueOfArg = 0
        }
      }
      return valueOfArg
    } catch (error: any) {
      // ignore error, it will be handled when sending/reading from a function
    }
  })
  return parsedArguments
}

export { getAllContractFunctions, getFunctionInputKey, getParsedContractFunctionArgs, getParsedEthersError }
