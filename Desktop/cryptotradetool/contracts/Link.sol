pragma solidity ^0.5.16;

contract Link {
    // Get link price
    // Read price
    int public price;
    string public ticker;
    // Constructor
    function LinkPrice () public {
        price = 5;
        ticker = "LINK";
    }
}