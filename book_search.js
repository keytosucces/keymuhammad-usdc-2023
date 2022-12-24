/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */
    const result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    // create a hash map to store matching lines
const matchingLines = new Map();

// for loop interating through each book object in books array
for (const book of scannedTextObj) {

    // going through each piece of scanned text in the book
    for (const content of book.Content) {

        /* quick error message for not inputing a string for search term */
        if (typeof searchTerm !== 'string' || searchTerm.length === 0) {
            throw new Error('invalid - expected a non-empty string');
          }
          
      // checking if text.has search term value
      if (content.Text.includes(searchTerm)) {
        // if text has search term, then add to hash map
        if (matchingLines.has(book.ISBN)) {
          matchingLines.get(book.ISBN).push({
            Page: content.Page,
            Line: content.Line
          });
        } else {
          matchingLines.set(book.ISBN, [{
            Page: content.Page,
            Line: content.Line
          }]);
        }
      }
    }
  }

// iterate through hash map and add matching lines to results
for (const [ISBN, lines] of matchingLines) {
  for (const line of lines) {
    result.Results.push({
      ISBN,
      ...line
    });
  }
}

return result; 

}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
] 

/* why not utilize the assignment to also suggest my favorite books? */
/* this example input object has multiple (>1) books */
const multipleBooksIn = [
    {
        "Title": "So you want to talk about race",
        "ISBN": "978-1580058827",
        "Content": [
            {
                "Page": 14,
                "Line": 81,
                "Text": "tying racism to its systemic causes and effects will help"
            },
            {
                "Page": 14,
                "Line": 82,
                "Text": "others see the important difference between systemic"
            },
            {
                "Page": 14,
                "Line": 83,
                "Text": "racism, and anti-white bigotry"
            } 
        ] 
    },

    {
        "Title": "Reclaiming our Space",
        "ISBN": "978-0807055373",
        "Content": [
            {
                "Page": 98,
                "Line": 9,
                "Text": "Well, we are enemies of any racist, sexist, classist, xenophobic"
            },
            {
                "Page": 98,
                "Line": 10,
                "Text": "state that sanctions brutality and murder against"
            },
            {
                "Page": 98,
                "Line": 11,
                "Text": "marginalized people who deserve to live as free people."
            } 
        ] 
    }
]

/* this example input object has no scanned content */
const noContentIn = [
    {
        "Title": "Fun Home: A Family Tragicomic",
        "ISBN": "978-0224080514",
        "Content": [] 
    }
] 

/* this is another input object option, where the object contains zero (0) books */
// const noBookIn = []

/* this is an example input object with one (1) book and (1) line of scanned text */
const oneScannedIn = [
    {
        "Title": "The Norton Mix: Food Writing, A Readymade Mix",
        "ISBN": "978-0393149258",
        "Content": [
            {   "Page": 2018,
                "Line": 68,
                "Text": "It was the soup. It was cold."
            }
        ] 
    }
]

/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/* all example output objects of the input objects i created */
const multipleBooksOut = {
    "SearchTerm": "and",
    "Results": [
        {
            "ISBN": "978-1580058827",
            "Page": 14,
            "Line": 81
        },
        {
            "ISBN": "978-1580058827",
            "Page": 14,
            "Line": 83
        },
        {
            "ISBN": "978-0807055373",
            "Page": 98,
            "Line": 10
        }
    ]
}

const noContentOut = {
    SearchTerm: 'key',
    Results: []
  }

/* this is an example output object, where the object contains zero (0) books */
// const noBookOut = {
//     SearhTerm: 'example',
//     Results : []
// }

const oneScannedOut = {
  SearchTerm: 'THE',
  Results: []
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

  // /// // // / // // // // / // /// my unit tests

  /* positive test for multiple books */
  const testPos = findSearchTermInBooks('and', multipleBooksIn);
  if (JSON.stringify(multipleBooksOut) === JSON.stringify(testPos)) {
    console.log("PASS: Positive Test");
} else {
    console.log("FAIL: Positive Test");
    console.log("Expected:", multipleBooksOut);
    console.log("Received:", testPos);
}
  /* negative test with an example of a book with no content */
  const testNeg = findSearchTermInBooks('key', noContentIn);
  if (JSON.stringify(noContentOut) === JSON.stringify(testNeg))  {
    console.log("PASS: Negative Test");
} else {
    console.log("FAIL: Negative Test");
    console.log("Expected:", noContentOut);
    console.log("Received:", testNeg);
}
   /* case sensitive test /i */
   const testCS = findSearchTermInBooks('THE', oneScannedIn);
   if (JSON.stringify(oneScannedOut) === JSON.stringify(testCS)) {
    console.log("PASS: Case Sensitivity Test");
} else {
    console.log("FAIL: Case Sensitivity Test");
    console.log("Expected:", oneScannedOut);
    console.log("Received:", testCS);
    }
    