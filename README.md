# JEST tutorial for test-driven development
Learn how to write unit tests and other kinds of tests

# Setup

Install dependencies

`$ npm install`

Run tests

`$ NODE_ENV=test npx jest /path/to/test/file`

Run coverage

`$ NODE_ENV=test npx jest --coverage /path/to/test/file`

View coverage report in `coverage/lcov-report/index.html`

The followung database scripts are not necessary. If you still need
them for manual testing here they are:

`$ npx ts-node insert_sample_data.ts "mongodb://127.0.0.1:27017/my_library_db"`

Clean the database

`npx ts-node remove_db.ts "mongodb://127.0.0.1:27017/my_library_db"`

# Description

This repository illustrates how to use jest to write unit tests 
for a server in typescript. The examples are as follows:

- `tests/authorSchema.test.ts`: Unit tests to verify the schema of the authors colletion. 
- `tests/bookDetailsService.test.ts`: Unit tests to verify the behavior of the service that is used to retrieve the details of a particular book.
- `tests/createBookService.test.ts`: Unit tests to verify if a book is created successfully.

# For you to do

## Part 1

Write a unit test for the GET /authors service. 
The service should respond with a list of author names and lifetimes sorted by family name of the authors. It should respond
with a "No authors found" message when there are no authors in the database. If an error occurs when retrieving the authors then the
service responds with an error code of 500. The unit test
should be placed in `tests/authorService.test.ts`.

## Part 2

Briefly explain a limitation of the tests in `tests/authorSchema.test.ts` in the space below.

1. **Testing Multiple Functionalities**  
   - Some tests are checking more than one condition at a time. For example, the date of birth validation test is indirectly testing both the validity of the date and the validation logic.  

2. **Missing Edge Cases**  
   - The tests don’t cover edge cases like:  
     - A birth date after the death date.  
     - Invalid but possible dates like February 30th.  

3. **Lack of Logical Consistency Checks**  
   - No test checks for logical inconsistencies, like birth date being after the death date.  

4. **Coverage vs. Quality**  
   - The tests might achieve high code coverage, but that doesn’t necessarily mean the tests are good — they might miss important scenarios.  

5. **Mixing Validation and Schema Logic**  
   - Some tests (like the full name virtual tests) are testing both data validation and schema behavior at the same time, which makes it harder to isolate issues.  

6. **Missing Path Coverage**  
   - The tests cover some straightforward paths but don't explore all possible code paths.  
   - For example, there are no tests to verify behavior when only some fields (like first name but not last name) are provided.  

7. **No Data Flow Coverage**  
   - The tests don’t check how data flows through the schema — like whether setting certain fields affects other fields or the output.  
   - Example: Changing the first name or family name should update the `name` virtual — this isn’t tested.  

8. **No Condition Coverage**  
   - The tests don’t cover all possible Boolean evaluations (true and false cases) for schema validations.  
   - Example: The tests don’t check the behavior when an optional field is explicitly set to `null`.  

9. **Inadequate Error Handling Tests**  
   - The tests don’t verify how the schema handles unexpected input types (like strings instead of dates) or missing fields other than `first_name` and `family_name`.  
   - Example: What happens if `date_of_birth` is passed as `null` or an invalid string?  

10. **Lack of Performance or Load Testing**  
    - The tests only handle a small number of authors, so they don’t test how the schema performs under a larger dataset.  

11. **No Negative Testing for Counting/Listing**  
    - The counting and listing tests only verify positive cases, there are no tests for cases like invalid filters or empty results.  
    - Example: What happens when a filter that doesn't match any records is used?  


## Part 3

Generate the coverage report for the tests you wrote. How can you improve
your tests using the coverage report? Briefly explain your 
process in the space below.