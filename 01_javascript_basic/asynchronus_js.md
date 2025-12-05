# Content
- Some Async Concepts
-  [Promises Deep](#Promises)


# Some Asynchronous Concepts

## 1. fetch() Method

It is a Web API provided by the browser. fetch() is neither a library nor a module; it is a native browser API provided by modern web browsers for making HTTP requests.It is commonly used to interact with web APIs and fetch data asynchronously. 

Here's a breakdown of what the `fetch()` method is and why it's used:

### What is the `fetch()` Method?

The `fetch()` method is a built-in JavaScript function that simplifies making HTTP requests. It returns a Promise that resolves to the `Response` to that request, whether it is successful or not.

### Why is it Used?

1.  **Asynchronous Data Retrieval:**
    -   The primary use of the `fetch()` method is to asynchronously retrieve data from a server. Asynchronous means that the code doesn't wait for the data to arrive before moving on. This is crucial for creating responsive and dynamic web applications.
2.  **Web API Interaction:**
    -   Many web applications interact with external services or APIs to fetch data. The `fetch()` method simplifies the process of making HTTP requests to these APIs.
3.  **Promise-Based:**
    -   The `fetch()` method returns a Promise, making it easy to work with asynchronous operations using the `.then()` and `.catch()` methods. This promotes cleaner and more readable code.
4.  **Flexible and Powerful:**
    -   `fetch()` is more flexible and powerful compared to older methods like `XMLHttpRequest`. It supports a wide range of options, including headers, request methods, and handling different types of responses (JSON, text, etc.).

### Example 1:

```js
fetch('https://randomuser.me/api')
    .then(response => {
        return response.json(); // return a promise
    })
    .then(data => {
        console.log(data);
        // console.log(data.results[0].name);
        // console.log(data.results[0].location);
    })
    .catch(error => {
        console.log('Error:', error);
    });
```
In this example, we use `fetch()` to make a GET request to '[https://randomuser.me/api](https://randomuser.me/api)', handle the response, and then parse the JSON data. The `.then()` and `.catch()` methods allow us to handle the asynchronous flow and potential errors.


### Example 2:
```js
// 2.1 fetching Todos
function fetchingTodo(){
    fetch('https://sum-server.100xdevs.com/todos')
    .then(async response => {
        const json = await response.json();
        console.log(json)
    })
}
// fetchingTodo()

// 2.2  Below Syntax is prefered
async function fetchingTodo2(){
    const response = await fetch('https://sum-server.100xdevs.com/todos')
    const json = await response.json();
    console.log(json.todos.length)
}
// fetchingTodo2()
```



## 2. **Callback Functions:**

**Definition:** A callback function is a function that is passed as an argument to another function and is executed after the completion of that function.

**Example:**

```jsx
function fetchData(callback) {
  // Simulating an asynchronous operation
  setTimeout(() => {
    const data = 'Hello, callback!';
    callback(data);
  }, 1000);
}

// Using the callback function
fetchData(result => {
  console.log(result);
});

```

**Example 2**
```js
// Example 1
function hello(a, b){
    b();  // b is a callback function
}
//hello(1,2)  // Not a callback
hello(1, function(){console.log("Callback Chala")})  // Callback 


// Example 2
function doSomeAsyncWork(x, y, callback){
    setTimeout(function(){
        callback(x, y);
    }, 1000);
}
doSomeAsyncWork(1, 2, function(x, y){
    console.log(x + y);
});


// Example 3 - Bring users data and print name, email, and gender.
function getUsersData(url, callback){
    fetch(url)
        .then(raw => raw.json())
        .then(result => {
            callback(result.results[0]);
        });
}
getUsersData('https://randomuser.me/api', function(user){
    console.log(user.name.first, user.name.last);
    console.log(user.email);
    console.log(user.gender);
});

```


**Relation to `fetch()`:** In older JavaScript code or libraries, callbacks were extensively used for handling asynchronous operations, such as handling the response in the `.then()` block of `fetch()`.

## 3. **Promises:**

**Definition:** A Promise is an object representing the eventual completion or failure of an asynchronous operation. It is a more structured and readable way to handle asynchronous code compared to callbacks.

**Example:**

```jsx
function fetchData() {
  return new Promise((resolve, reject) => {
    // Simulating an asynchronous operation
    setTimeout(() => {
      const success = true;
      if (success) {
        const data = 'Hello, Promise!';
        resolve(data);
      } else {
        reject('Oops! Something went wrong.');
      }
    }, 1000);
  });
}

// Using the Promise
fetchData()
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });


```

**Relation to `fetch()`:** The `fetch()` method returns a Promise. We use `.then()` to handle the resolved value (successful response) and `.catch()` for handling errors.

## 4. **Async/Await:**

**Definition:**`async/await` is a syntactic sugar built on top of Promises, making asynchronous code more readable and easier to write.
- Async/Await is a new way to write asynchronous code. It is built on top of promises, so it is also non-blocking.
- It makes the code look like it is synchronous, but it is asynchronous.
- async makes a function return a Promise, and the await makes a function wait for a Promise
- The await keyword can only be used inside an async function.
- If the function returns a value, the promise will be resolved with the value.
- If the function throws an exception, the promise will be rejected.

**Example 1:**
```js
async function fetchData(){
    //  console log a will not be executed until the fetch is completed
    let a = await fetch('https://randomuser.me/api')
    a = await a.json();
    console.log(a);
}
fetchData();
```

**Example 2:**
```jsx
async function fetchData() {
  return new Promise(resolve => {
    // Simulating an asynchronous operation
    setTimeout(() => {
      const data = 'Hello, Async/Await!';
      resolve(data);
    }, 1000);
  });
}

// Using async/await
async function fetchDataAndPrint() {
  try {
    const result = await fetchData();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// Invoking the async function
fetchDataAndPrint();

```

## 5. **Axios:**

- It does the same thing as fetch but slitly in the cleaner fastion. It is a popular JavaScript library used to make HTTP requests, and it can be used in both browser and Node.js environments. It is a promise-based library and developer-friendly.
- To install - ```npm install axios``` / use CDN in HTML
```js
const axios = require("axios");

// 1.
axios
  .get(`https://randomuser.me/api`)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

// 2. It automatically understand which data is coming back so no need to use .json
async function getaxios() {
  const response = await axios.get("https://sum-server.100xdevs.com/todos");
  console.log(response.data);
}
getaxios();

```

**Relation to `fetch()`:** In the context of `fetch()`, `async/await` provides a more synchronous-looking code structure when dealing with asynchronous operations, especially when handling responses.

## **Overall Relationship:**

-   Callbacks were the traditional way of handling asynchronous code.
-   Promises introduced a more structured and readable way to handle async operations.
-   `async/await` builds on top of Promises, offering a more synchronous coding style, making asynchronous code look similar to synchronous code.

**Example Combining All:**

```jsx
function fetchData(callback) {
  setTimeout(() => {
    const data = 'Hello, Callback!';
    callback(data);
  }, 1000);
}

function fetchDataPromise() {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = 'Hello, Promise!';
      resolve(data);
    }, 1000);
  });
}

async function fetchDataAsyncAwait() {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = 'Hello, Async/Await!';
      resolve(data);
    }, 1000);
  });
}

// Using callback
fetchData(result => {
  console.log(result);

  // Using Promise
  fetchDataPromise()
    .then(result => {
      console.log(result);

      // Using Async/Await
      fetchDataAsyncAwait()
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
    });
});

```

In this example, we've shown the use of callback, Promise, and Async/Await together. Async/Await provides a cleaner and more readable way to structure asynchronous code, especially when dealing with multiple async operations.
## 5. Try Catch Blocks

In JavaScript and many other programming languages, a `try-catch` block is a mechanism for handling exceptions or errors in a structured way. This construct is crucial for writing robust and fault-tolerant code.

### Purpose:

The primary purpose of a `try-catch` block is to gracefully handle runtime errors or exceptions that may occur during the execution of a program. It allows developers to anticipate potential issues and implement a fallback strategy, preventing abrupt program termination.

### Syntax:

The basic syntax of a `try-catch` block is as follows:

```jsx
try {
  // Code that may throw an exception
} catch (error) {
  // Code to handle the exception
}

```

-   The `try` block encloses the code that might generate an exception.
-   If an exception occurs, the control is transferred to the `catch` block, where the `error` parameter holds information about the exception.

### How It Works:

1.  **Execution in the Try Block:**
    -   Code inside the `try` block is executed sequentially.
    -   If an exception occurs at any point, the normal flow of execution is interrupted.
2.  **Control Transfer to Catch Block:**
    -   When an exception is thrown, control is transferred to the corresponding `catch` block.
    -   The `catch` block is responsible for handling the exception.
3.  **Exception Handling:**
    -   Inside the `catch` block, developers can implement error-handling logic.
    -   They can log the error, display a user-friendly message, or take alternative actions to recover from the error.

### Example:

```jsx
try {
  // Code that may throw an exception
  const result = 10 / 0; // Division by zero, will throw an exception
  console.log(result); // This line won't be executed
} catch (error) {
  // Code to handle the exception
  console.error('An error occurred:', error.message); // Output: An error occurred: Cannot divide by zero
} finally {
  // Code inside the finally block will execute regardless of whether an exception occurred or not
  console.log('Finally block executed');
}

```

-   In this example, a division by zero operation inside the `try` block will throw an exception.
-   The control is then transferred to the `catch` block, where an error message is logged.
-   The `finally` block, if present, will always execute, providing an opportunity for cleanup or finalization tasks.



# 1. Promises
Promises are a way to handle asynchronous operations in JavaScript. They are easy to manage when dealing with multiple asynchronous operations where callbacks can create callback hell leading to unmanageable code.

### **Key Characteristics of Promises:**

1.  **Asynchronous Operations:**
    -   Promises are commonly used to handle asynchronous operations, such as fetching data from a server, reading a file, or executing a timer.
2.  **States:**
    -   A promise can be in one of three states:
        -   **Pending:** The initial state, before the promise is resolved or rejected.
        -   **Fulfilled (Resolved):** The operation completed successfully, and the promise has a resulting value.
        -   **Rejected:** There was an error during the operation, and the promise has a reason for the failure.
3.  **Chaining:**
    -   Promises support chaining through the **`then`** method, allowing you to sequence asynchronous operations in a readable manner.
4.  **Error Handling:**
    -   Promises have built-in error handling through the **`catch`** method, making it easier to manage and propagate errors in asynchronous code.
 

### **Why Do We Need Promises?**

1.  **Avoiding Callback Hell (Callback Pyramids):**
    
    -   Promises help to mitigate the problem of callback hell, where nesting callbacks leads to unreadable and hard-to-maintain code.
    
    ```jsx
    
    // Without Promises
    asyncOperation1((result1) => {
      asyncOperation2(result1, (result2) => {
        asyncOperation3(result2, (result3) => {
          // ...
        });
      });
    });
    
    // With Promises
    asyncOperation1()
      .then((result1) => asyncOperation2(result1))
      .then((result2) => asyncOperation3(result2))
      .then((result3) => {
        // ...
      });
    
    
    ```
    
2.  **Sequential Execution of Asynchronous Code:**
    
    -   Promises provide a clean way to execute asynchronous operations sequentially, improving code readability.
    
    ```jsx
    
    // Without Promises
    asyncOperation1((result1) => {
      asyncOperation2(result1, (result2) => {
        asyncOperation3(result2, (result3) => {
          // ...
        });
      });
    });
    
    // With Promises
    asyncOperation1()
      .then((result1) => asyncOperation2(result1))
      .then((result2) => asyncOperation3(result2))
      .then((result3) => {
        // ...
      });
    
    
    ```
    
3.  **Error Handling:**
    
    -   Promises simplify error handling by providing a centralized **`catch`** block to handle errors for a sequence of asynchronous operations.
    
    ```jsx
    
    asyncOperation1()
      .then((result1) => asyncOperation2(result1))
      .then((result2) => asyncOperation3(result2))
      .catch((error) => {
        console.error('An error occurred:', error);
      });
    
    
    ```
    
4.  **Promise.all for Parallel Execution:**
    
    -   Promises offer the **`Promise.all`** method, allowing parallel execution of multiple asynchronous operations and waiting for all of them to complete.
    
    ```jsx
    
    const promise1 = asyncOperation1();
    const promise2 = asyncOperation2();
    
    Promise.all([promise1, promise2])
      .then((results) => {
        const result1 = results[0];
        const result2 = results[1];
        // ...
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
    
    
    ```
    

In summary, promises provide a cleaner and more organized way to work with asynchronous code, making it easier to read, write, and maintain. They address common challenges associated with callback-based code and promote better error handling and sequential execution of asynchronous operations.

### **Promises Basics:**

1.  **Creating a Promise:**
    
    -   A promise represents the eventual completion or failure of an asynchronous operation.
    -   The **`Promise`** constructor takes a function with two parameters: **`resolve`** and **`reject`**.
    
    ```jsx
    
    const myPromise = new Promise((resolve, reject) => {
      // Asynchronous operation goes here
      // If successful, call resolve with the result
      // If there's an error, call reject with the error
    });
    
    
    ```
    
2.  **Resolving a Promise:**
    
    -   Use the **`resolve`** function when the asynchronous operation is successful.
    
    ```jsx
    
    const successfulPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Operation succeeded!');
      }, 1000);
    });
    
    
    ```
    
3.  **Rejecting a Promise:**
    
    -   Use the **`reject`** function when there's an error during the asynchronous operation.
    
    ```jsx
    
    const failedPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('Operation failed!');
      }, 1000);
    });
    
    
    ```
    
  >Example:    
    
- Open html file in browser type `mydata` in the console and see the output.

HTML File
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1 style="text-align: center;">Promises</h1>

    <script src="./05promise.js"></script>
</body>
</html>
```


JS file    
```js
const mydata = new Promise((resolve, reject) => {
    // User lena bhja tha 
    fetch('https://randomuser.me/api')
        .then(raw => raw.json())
        .then(result => {
            // Male hoga green button mtlab resolve
            if(result.results[0].gender === "male")
                resolve();
            // Female hoga red button mtlab reject
            else
                reject();
        })
});
console.log(mydata); // side stack - Promise { <pending> }


// The below is my Task I can perform any task here after getting the users data from promise.
mydata
    .then(() => {
        console.log("Green Button daba diya - for MALE");
    })
    .catch(() => {
        console.log("Red Button daba diya - for FEMALE");
    });
    
```

### **Consuming Promises:**

1.  **Using `then` and `catch`:**
    
    -   The **`then`** method is used to handle the resolved value.
    -   The **`catch`** method is used to handle errors.
    
    ```jsx
    
    successfulPromise
      .then((result) => {
        console.log(result); // Output: Operation succeeded!
      })
      .catch((error) => {
        console.error(error); // This won't be called in this example
      });
    
    
    ```
    
2.  **Chaining Promises:**
    
    -   Promises can be chained using **`then`**. Each **`then`** returns a new promise.
    
    ```jsx
    
    successfulPromise
      .then((result) => {
        console.log(result); // Output: Operation succeeded!
        return 'New value';
      })
      .then((newValue) => {
        console.log(newValue); // Output: New value
      })
      .catch((error) => {
        console.error(error);
      });
    
    
    ```
    
3.  **Promise All:**
    
    -   **`Promise.all`** is used to wait for multiple promises to complete.
    
    ```jsx
    
    const promise1 = Promise.resolve('One');
    const promise2 = Promise.resolve('Two');
    
    Promise.all([promise1, promise2])
      .then((values) => {
        console.log(values); // Output: ['One', 'Two']
      })
      .catch((error) => {
        console.error(error);
      });
    
    
    ```
    

Promises are essential for handling asynchronous code in a clean and readable way, especially when working with features like fetching data from a server, handling events, or working with timers.

