export const GREEN = "success"
export const RED = "danger"
export const ETHER_ADDRESS = "0x0000000000000000000000000000000000000000"

export const DECIMALS = (10**18)

export const ether = (wei) => {
    if(wei) {
        return(wei / DECIMALS) // 18 decimal places
    }
}
    //tokens and ETH have same decimal settings
export const tokens = ether


// export const ether = (n) => {
//     return new web3.utils.BN(
//     web3.utils.toWei(n.toString(), 'ether')
//     )
// }

// //this and above function are same
// export const tokens = (n) => ether(n)


// export const EVM_REVERT = 'VM Exception while processing transaction: revert'


