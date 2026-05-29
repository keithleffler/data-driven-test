# Data-driven, Multi-framework test example

This project is a demonstration of data-driven test automation, supporting both Cypress and Playwright. This example is motivated by work at previous projects, where the organization was in the early stages of migrating from a very large number of Cucumber scenarios on Cypress to  Playwright (non-Cucumber).  Scenarios usually tested more than one thing.  AI analysis revealled there were a small number of test equivalence classes, but a large input surface from variations of user type, product type, and state of residence. 



Objectives:
1.  Abstract test types (text context verification, link navigation)
2.  Abstract test input and expected output, to efficiently handle the input surface
3.  Provide a transparent path from Cypress to Playwright for test teams.
   

Major classes:

TestCase - an abstraction of a test, independent of test framework
TestStep - an abstraction of a test step.  Test cases contain (1 .. many) test steps

Page Object - Utility class 

Framework adapter - An abstraction of the actual test framework.  Frameworks 


