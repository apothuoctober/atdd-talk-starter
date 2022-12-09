@todos @remove-items @TOD-3
Feature: Removing todo items

  Rule: I can remove existing item
    Example: Remove an existing item
      Given I open my todo list
      And I have a list of todo items with
        | name         | completed |
        | walk the dog | true     |
        | wash the dog | true     |
        | feed the dog | false     |
        | hug the dog  | false     |
      When I remove "walk the dog" item
      Then I see 3 todo items

    Example: Remove existing items
      Given I open my todo list
      And I have a list of todo items with
        | name         | completed |
        | walk the dog | true     |
        | wash the dog | true     |
        | feed the dog | false     |
        | hug the dog  | false     |
      When I remove "walk the dog" item
      And I remove "wash the dog" item
      And I remove "feed the dog" item
      Then I see 1 todo item
