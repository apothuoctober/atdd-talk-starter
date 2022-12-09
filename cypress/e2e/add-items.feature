@todos @add-items @TOD-1
Feature: Adding new todo items

  Rule: I cannot submit an empty new item
    Example: Submit an empty item
      Given I open my todo list
      And I have no todo items
      When I submit a new item
      Then I am warned that I cannot submit an empty item
      And I see 0 todo items

  @TOD-4
  Rule: I cannot submit items with same name
    Example: Submit item with name already taken
      Given I open my todo list
      And I have a list of todo items with
        | name         | completed |
        | walk the dog | true      |
        | wash the dog | true      |
        | feed the dog | false     |
        | hug the dog  | false     |
      When I fill new item with "wash the dog"
      And I submit a new item
      Then I am warned that I cannot submit a duplicated item
      And I see 4 todo items

  Rule: I can submit valid new item
    Example: Submit a valid item and don't be warned
      Given I open my todo list
      And I have no todo items
      When I fill new item with "wash my clothes"
      And I submit a new item
      Then I have no warnings

  Rule: New item field reset on submit
    Example: Submit a valid item and reset new item name
      Given I open my todo list
      And I have no todo items
      When I fill new item with "wash my clothes"
      And I submit a new item
      Then I see an empty field for my next item

  Rule: New item is added to the items list
    Example: Submit a valid item and it is added to the list
      Given I open my todo list
      And I have no todo items
      When I fill new item with "wash my clothes"
      And I submit a new item
      Then I see 1 todo item