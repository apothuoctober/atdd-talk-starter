import {Given, When, Then, DataTable} from "@badeball/cypress-cucumber-preprocessor";

Given("I open my todo list", () => {
  cy.visit("/")
});

Given("I have no todo items", () => {
  cy.log("no todo items")
})

Given("I have a list of todo items with", (dataTable: DataTable) => {
  const items = dataTable.hashes()
  const todos = items.map((i) => ({
    name: i['name'],
    completed: JSON.parse(i['completed'])
  }))
  cy.window().its('hacks').invoke('addTodos', todos)
})

When("I fill new item with {string}", (newItem: string) => {
  cy.get("input#name").type(newItem)
})

When("I submit a new item", () => {
  cy.get("button[type=submit]").click()
})

When("I complete {string} item", (todoItem: string) => {
  cy.contains(todoItem).parent().find('input').click()
})

When("I toggle off {string} item", (todoItem: string) => {
  cy.contains(todoItem).parent().find('input').click()
})

When("I remove {string} item", (todoItem: string) => {
  cy.contains(todoItem).parent().find('button').click()
})

When("I wait for {int} seconds", (num: number) => {
  cy.wait(num * 1000)
})

Then("I am warned that I cannot submit an empty item", () => {
  cy.get("span.todo-form-error").should("contain.text", "is empty")
})

Then("I am warned that I cannot submit a duplicated item", () => {
  cy.get("span.todo-form-error").should("contain.text", "already exists")
})

Then("I see {string} item highlighted for conflict illustration", (item: string) => {
  cy.contains(item).parent().should("contain.class", "conflict")
})

Then("I have no warnings", () => {
  cy.get("span.todo-form-error").should("not.exist")
})

Then("I see {int} todo item", (num: number) => {
  cy.get("li").should(
    "have.length",
    num
  );
});

Then("I see {int} todo items", (num: number) => {
    cy.get("li").should(
        "have.length",
      num
    );
});

Then("I see {int} completed todo items", (num: number) => {
  cy.get("li.completed").should(
    "have.length",
    num
  );
});

Then("I see an empty field for my next item", () => {
  cy.get("input#name").should(
    "have.value",
    ""
  );
})