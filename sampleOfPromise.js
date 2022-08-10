function add1000(){
	let result = 0;

	for(let i=1; i <= 1000; i++){
		result += i;
	}
	return result;
}

/*
function add1000later(){
	return new Promise( done => {
		done( add1000() )
	})
}
*/

function add1000later(){
	return new Promise( (resolve, reject) => {
		let result = add1000()

		if(result) {
			console.log("Wait. The result is out.")
			resolve ({ Result : result})
		}
		else reject()
	})
}

console.log("some process");
setTimeout(() => console.log(3), 1000);
add1000later()
	.then(res => console.log(res))
	.catch(() => console.log("Error"))
console.log("more process");