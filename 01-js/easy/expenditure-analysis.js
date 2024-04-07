/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  const categories = [];
  const totalSpent = {};
  for (const item of transactions) {
    if (!categories.includes(item.category)) {
      categories.push(item.category);
    }
  
    if (!totalSpent[item.category]) {
      totalSpent[item.category] = 0;
    }
  
    totalSpent[item.category] += item.price;
  }
  const answer = categories.map((category) => ({
    category,
    totalSpent: totalSpent[category],
  }));
  return answer;
}

module.exports = calculateTotalSpentByCategory;

/*
  let l1=transactions.length
  let answer=[]
  for(let i=0;i<l1;i++){
    let category1=transactions[i]["category"]
    let totalSpent=transactions[i]["price"]
    
    for(let i=0;i<answer.length;i=i+1){
      if(answer[0]["category"]==category1){
        answer[0]["totalSpent"]+=totalSpent
      }
      else{
        let object={
          "category": category1,
          "totalSpent":totalSpent
        }
        answer.push(object)
      }
    }

  }

  return answer;*/