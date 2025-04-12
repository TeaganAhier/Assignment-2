alert('Hello! The script is working.');

let num1 = 10;
let num2 = 15;

alert('Addition: ' + (num1 + num2)); // 10 + 15
alert('Subtraction: ' + (num1 - num2)); // 10 - 15
alert('Multiplication: ' + (num1 * num2)); // 10 * 15
alert('Division: ' + (num1 / num2)); // 10 / 15
alert('Remainder: ' + (num1 % num2)); // 10 % 15

// Adding two strings
let str1 = "Hello, ";
let str2 = "world!";
alert('String Concatenation: ' + (str1 + str2));

function print5() {
    console.log(1);
    console.log(2);
    console.log(3);
    console.log(4);
    console.log(5);
}

// Calling the function twice to show 10 logs in total
print5();
print5();

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('heading').innerHTML = 'This Heading Has Been Changed!';
    document.getElementById('paragraph').innerHTML = 'This paragraph has been updated!';
});


document.getElementById('heading').addEventListener('click', function() {
    document.getElementById('heading').innerHTML = 'The Heading Was Clicked!';
  });
  
  document.getElementById('paragraph').addEventListener('click', function() {
    document.getElementById('paragraph').innerHTML = 'The Paragraph Was Clicked!';
  });
  
  document.getElementById('submitButton').addEventListener('click', function() {
    let userInput = document.getElementById('textInput').value;
    
    // Display the input in an alert
    alert(userInput);
    
    // Or display the input in the <div> element
    document.getElementById('output').innerHTML = userInput;
  });
  