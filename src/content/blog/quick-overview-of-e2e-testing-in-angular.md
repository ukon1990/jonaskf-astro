---
title: "Quick overview of E2E testing in Angular"
description: "A comprehensive guide to End-to-End testing in Angular applications using Protractor, covering setup, configuration, and best practices."
pubDate: "Nov 30 2017"
heroImage: "../../assets/blog-placeholder-3.jpg"
draft: false
tags: ["Angular", "E2E Testing", "Protractor", "Testing"]
---

**Note:**  
*This article assumes that you use the angular-cli, and have basic knowledge on how it works.*

## What is End-to-End testing?

While unit tests helps you find bugs, there are some things that won't be noticeable at this level. That is where e2e or integration tests comes in, where you automate a user using your application in one or more browsers.

As our applications grow in size, testing the correctness of the UI (user interface) manually becomes unrealistic and tedious. It also helps you find out if certain parts of the UI, stops working as expected.

## Getting started

Your tests are located in the e2e folder in the root directory of your project.

A test is contained within a spec or specification file. The spec file for the e2e tests have to end with *.e2e-spec.ts*. Else *ng e2e* won't find your tests.

You can think of a spec as a scenario that a user acts out.  
An example would be:

1. *A user wish to login,*
2. *go to their profile page*
3. *change password.*

Your tests are ran per spec file alphabetically, then in order of your tests. If you wish to run, lets say a login test first add *_* as prefix.

## Protractor config

Protractor allows you to define several browsers that you wish to test with. Even several instances per browser. The Protractor config file is named *protractor.conf.json*.

If you wish to test for more than one browser at once, replace the *capabilities* variable with *multiCapabilities*, like below. If you only wish for once session to be ran at a time, add *maxSessions* into it also. This can be useful, if you don't want any concurrency issues.

```javascript
maxSessions: 1,
multiCapabilities: [{
  'browserName':'chrome'
 } , {
  'browserName':'firefox'
}]
```

You can play with the other settings also if you'd like.

### Supported browsers

- Chrome
- Firefox
- Internet Explorer
- Edge
- Safari
- Android – Chrome (I have not done e2e on phones yet)
- iOS – Safari (I have not done e2e on phones yet)

## Writing a test

For your tests you need two or more files in the root of or in sub folders in the e2e folder. A *PO (Page object)* file, representing the actions to perform on a page. Like click a button that contains the text *search*. And one file containing your test specification. This is the *\*.e2e-spec.ts* file.

To my knowledge, your e2e tests can not access your code directly. It interacts with your page by simulating a user.

### Page Object

One of the ways you can find the elements on your page, is by using css selectors. Some useful imports would be *browser*, *by,* *element and $*. $ and element are basically the same, and work kinda like jQuery.

```typescript
import { browser, by, element, $ } from 'protractor';
```

A element has several functions, and two of them are getText(), *click()* and *sendKeys(string)*. Below you can see an example of a PO file.

```typescript
export class LoginPage {
  navigateTo() {
    return browser.get('/login');
  }

  login(username: string, password: string) {
    // Using $
    $('#username').sendKeys(username);
    $('#password').sendKeys(password);
    // Using element and by
    element(by.cssContainingText('button', 'Login')).click();
  }

  getLoginErrorMessage() {
    return $('#the-login-error-message').getText();
  }

  getLoginSuccessMessage() {
    return $('#the-login-success-message').getText();
  }
}
```

### The specification / Scenario

The spec files use Jasmine, and you can see an example of one below. In some cases you wish to wait for an event for a specific time. To do this, you can use the *browser.sleep(timeInMS)* function.

```typescript
import { LoginPage } from './_login.po';
import { browser } from 'protractor';
import {} from 'jasmine';

describe('Logging in', () => {
  let page: LoginPage;
 
  beforeEach(() => {
    page = new LoginPage();
    page.navigateTo();
  });

  it('Can\'t login with wrong credentials', () => {
    page.login('BruceLee', 'Wrong password');
    // Waiting for response
    browser.sleep(3000);

    expect(
      page.getLoginErrorMessage())
        .toEqual('You shall not pass.');
  });

  it('Is able to login with proper credentials', () => {
    page.login('JetLee', 'eeLteJ');
    // Waiting for response
    browser.sleep(3000);

    // In some cases you might want ignore the synchronization.
    // Logging in, has been one of those I've had to do so
    browser.ignoreSynchronization = true;

    expect(page.getLoginSuccessMessage())
      .toEqual(`Currently logged in as: Jet Lee`);
  });
});
```

## Running the tests

To run your tests, simply run the *ng e2e* command in the terminal. It will compile the application, if all goes well you will see one or more browser windows appear in the background.

### Useful commands

For updating the web drivers you can run the following command:

```bash
ng e2e --webdriver-update
# or
ng e2e --wu
```

Running one or more specific spec file / test:

```bash
ng e2e --specs=e2e/a-test.e2e-spec.ts
ng e2e --specs=e2e/_login.e2e-spec.ts --specs=e2e/another-test.e2e-spec.ts
```

Running one or more specific tests (not really a command):  
In order to just run specific describe or it blocks, you can do it by adding an f to the beginning of the it or describe function name. Alternatively you could add x to exclude that block.

```typescript
fit('a description', => {
    doSomething();
    expect()...
});
// or
fdescribe('a description', () => {
    it('', () => {});
    it('', () => {});
});
```

When you have done that, these are the only function that will be ran when you run the e2e command.

```bash
ng e2e
```

Running the test for a specific build environment:

```bash
ng e2e --target production
# or
ng e2e --target development
```

If you wish to run a single command for testing your linting, unit tests, e2e tests and if a production build is successful. Try adding a script like this to your *package.json*'s script section. The *&&*'s make it so that it won't continue to the next test, if the previous one failed.

```bash
ng lint && ng test && ng e2e && ng build --prod
```

## The end

Thank you for reading! If you have anything to add, or if I forgot something or you've got suggestions on this topic, feel free to post them in the comments.

*Update 24/4-18: added fit and fdescribe*
