@todos @errors @TOD-5
Feature: Handle errors the right way

  Rule: Empty item error must last 5 seconds
    Example: Submit empty item and wait for 6 seconds
      Given I open my todo list
      And I have no todo items
      When I submit a new item
      And I wait for 6 seconds
      Then I have no warnings

  Rule: Empty item error must disappear on new item name change
    Example: Submit empty item and change new item name
      Given I open my todo list
      And I have no todo items
      When I submit a new item
      And I fill new item with "test"
      Then I have no warnings

  Rule: Duplicate name error must last 5 seconds
    Example: Submit with duplicated name and wait for 6 seconds
      Given I open my todo list
      And I have a list of todo items with
        | name         | completed |
        | walk the dog | true      |
        | wash the dog | true      |
        | feed the dog | false     |
        | hug the dog  | false     |
      When I fill new item with "wash the dog"
      And I submit a new item
      And I wait for 6 seconds
      Then I have no warnings

  Rule: Duplicate name error must disappear on new item name change
    Example: Submit with duplicated name and change new item name
      Given I open my todo list
      And I have a list of todo items with
        | name         | completed |
        | walk the dog | true      |
        | wash the dog | true      |
        | feed the dog | false     |
        | hug the dog  | false     |
      When I fill new item with "wash the dog"
      And I submit a new item
      And I fill new item with "test"
      Then I have no warnings
