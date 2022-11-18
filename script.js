// Cash Register Project in JavaScript



/*
Currency Unit				Amount
Penny					$0.01 (PENNY)
Nickel					$0.05 (NICKEL)
Dime					$0.1 (DIME)
Quarter				$0.25 (QUARTER)
Dollar					$1 (ONE)
Five Dollars				$5 (FIVE)
Ten Dollars				$10 (TEN)
Twenty Dollars				$20 (TWENTY)
One-hundred Dollars			$100 (ONE HUNDRED)




Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.





*/




function checkCashRegister(price, cash, cid) {
    // Pseudocode initial
    // Calculate the change = cash - price
    // Loop until flag false
    // If change > note100
      // 320 / 100 = 3.2 get the integer
      // change / 100 = notes
      // If notesRequired > numberOf100Notes available
      // If notesRequired - numberOf100Notes < 0
        // Then it means that I have enough 100 notes
        // Else I don't have enough
        // So So I will pass the difference down, and substract what is in the drawer already
        // For example if I require 3 notes but 3-1=2, it means that I will substrac 1 note of 100 and pass back the 2*100 to the change.
        // Keep doing that for all the notes type:
        // 100  20  10  5  1  0.1  0.05  0.01
        // I can put this notes in an array and loop over all these notes





    // Calculate the change = cash - price
	let change = cash - price;
	//let change = 100;
	console.log("change=", change);
	let registerGiving = [];
	let registerStatus = "";
	// Have the curency units defined as a array from smallest to larges.
	let currencyUnits = [["PENNY", 0.01],
		["NICKEL", 0.05],
		["DIME", 0.1],
		["QUARTER", 0.25],
		["ONE", 1],
		["FIVE", 5],
		["TEN", 10],
		["TWENTY", 20],
		["ONE HUNDRED", 100]];



	let flagExitConditionTrigeredAlready = false;


	// Loop from my array of currencyUnits
	for ( let i=currencyUnits.length-1; i>=0; i--){

		// Check if total change is larger that total founds available
		let beforeTotalFounds = cid.reduce( (total, element)=>{
			total = total + element[1];
			return total;
		}, 0);

		console.log("beforeTotalFounds=", beforeTotalFounds);
		if (change > beforeTotalFounds){
			registerStatus="INSUFFICIENT_FUNDS";
			registerGiving = [];
			flagExitConditionTrigeredAlready = true;
			break;
			console.log("EXIT FROM THE LOOOOOOOOOOOP");
		} else if (change == beforeTotalFounds){
				registerStatus="CLOSED";
				registerGiving = cid;
				console.log("Change will empty the register!");
				console.log("registerStatus=", registerStatus);
				flagExitConditionTrigeredAlready = true;
				break;

		}



		change = Number.parseFloat(change).toFixed(2);
		let nameOfBanknoteSize = currencyUnits[i][0];
		let banknoteSize = currencyUnits[i][1];
		let availableTotalMoneForBanknoteSize = cid[i][1];
		let availableBanknoteSize = availableTotalMoneForBanknoteSize/banknoteSize;
		console.log("availableBanknoteSize=", availableBanknoteSize);
		// Check if I have enough notes available in the drawer
		let notesRequired = Math.floor( change / banknoteSize ) ;
		let difference = notesRequired - availableBanknoteSize ;
		console.log("difference=", difference);
		if ( difference < 0 ){
			// Then it means that I have enough banknoteSize notes
			change = change - (notesRequired * banknoteSize);
			// ["TWENTY", 60]
			registerGiving.push([nameOfBanknoteSize, notesRequired * banknoteSize]);

		} else {
			// Else I don't have enough number of this banknoteSize
			change = change - (availableBanknoteSize * banknoteSize);
			registerGiving.push([nameOfBanknoteSize, availableBanknoteSize * banknoteSize]);

		}



		// console.log("cid=",cid);
		console.log("change=",change);
	    console.log("banknoteSize=",banknoteSize);
		// console.log("availableBanknoteSize=",availableBanknoteSize);
		 console.log("notesRequired=",notesRequired);
		// console.log("registerGiving=",registerGiving);
		// console.log("nameOfBanknoteSize=",nameOfBanknoteSize);
		//console.log( notesRequired - availableBanknoteSize );

		console.log("----------------------------------------------------");
	}


// Sort the registerGiving array from lower notes to higher notes
// let tempArray = [];
// for ( let i=registerGiving.length-1; i>=0; i-- ){
// 	tempArray.push(registerGiving[i]);
// }
// registerGiving = tempArray;
//



// If after the looop I still have change left that means:
// The register doesn't have the right banknote
// Or the register doesn't have enough money at all




// Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

// This is the bottom if condition for chosing an exit message
// They will only run if the top conditions wore not acctivated
// That is why I use flagExitConditionTrigeredAlready boolean value
if ( flagExitConditionTrigeredAlready == false) {
	let totalFounds = cid.reduce( (total, element)=>{
		total = total + element[1];
		return total;
	}, 0);

	console.log("totalFounds=", totalFounds);

	console.log("toatalFounds=",totalFounds);
	if ((change > totalFounds) || (change > 0)){
		registerStatus="INSUFFICIENT_FUNDS";
		registerGiving = [];
		console.log("registerStatus=", registerStatus);
	}


	// Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.
	if ((change == 0) && (totalFounds == 0)) {
		registerStatus="CLOSED";
		registerGiving = cid;
		console.log("registerStatus=", registerStatus);
	}


	// Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.
	// Sort the values again
	if ((change == 0) && (totalFounds > 0)) {
		registerStatus="OPEN"
		registerGiving = registerGiving.filter( (element)=>{
			if (element[1] != 0){
				return element;
			}
		} );
		console.log("registerGiving=",registerGiving);
	}


}


let statusAndChangeObject = {};
statusAndChangeObject.status = registerStatus;
statusAndChangeObject.change = registerGiving;

console.log("statusAndChangeObject=", statusAndChangeObject);

return statusAndChangeObject;



  // let change;
  // return change;
}




//  Testing Area:

// let output = checkCashRegister(19.5, 20,
// 	[["PENNY", 1.01],
// 	["NICKEL", 2.05],
// 	["DIME", 3.1],
// 	["QUARTER", 4.25],
// 	["ONE", 90],
// 	["FIVE", 55],
// 	["TEN", 20],
// 	["TWENTY", 60],
// 	["ONE HUNDRED", 100]]
// );

// {status: "OPEN", change: [["QUARTER", 0.5]]}

//console.log("Expected output:", {status: "OPEN", change: [["QUARTER", 0.5]]}  );


//Failed: checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}


//should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.
// output=checkCashRegister(3.26, 100,
// 	[["PENNY", 1.01],
// 	["NICKEL", 2.05],
// 	["DIME", 3.1],
// 	["QUARTER", 4.25],
// 	["ONE", 90],
// 	["FIVE", 55],
// 	["TEN", 20],
// 	["TWENTY", 60],
// 	["ONE HUNDRED", 100]]
// )


//checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) should return {status: "INSUFFICIENT_FUNDS", change: []}.
// let output = checkCashRegister(19.5, 20,
// 	[["PENNY", 0.01],
// 	["NICKEL", 0],
// 	["DIME", 0],
// 	["QUARTER", 0],
// 	["ONE", 1],
// 	["FIVE", 0],
// 	["TEN", 0],
// 	["TWENTY", 0],
// 	["ONE HUNDRED", 0]]
// );


// Failed: checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
//should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}

let output = checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);


console.log("output=", output);

//console.log("toFixed", 0.03999999999999487.toFixed(2));
//console.log("toFixed", Number.parseFloat(42).toFixed(2));



//
// checkCashRegister(19.5, 20,
// 	[["PENNY", 0],
// 	["NICKEL", 0],
// 	["DIME", 0],
// 	["QUARTER", 0],
// 	["ONE", 1],
// 	["FIVE", 0],
// 	["TEN", 0],
// 	["TWENTY", 0],
// 	["ONE HUNDRED", 0]]
// );
//
