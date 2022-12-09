@todos @complete-items @TOD-2
Feature: Completing todo items

  Rule: I can complete existing item
    Example: Complete an existing item
      Given I open my todo list
      And I have a list of todo items with
        | name         | completed |
        | walk the dog | false     |
        | wash the dog | false     |
        | feed the dog | false     |
        | hug the dog  | false     |
      When I complete "walk the dog" item
      Then I see 1 completed todo items

    Example: Complete existing items
      Given I open my todo list
      And I have a list of todo items with
        | name         | completed |
        | walk the dog | false     |
        | wash the dog | false     |
        | feed the dog | false     |
        | hug the dog  | false     |
      When I complete "walk the dog" item
      And I complete "wash the dog" item
      And I complete "feed the dog" item
      Then I see 3 completed todo items

  Rule: I can toggle off a completed item
    Example: Toggle off an existing item
      Given I open my todo list
      And I have a list of todo items with
        | name         | completed |
        | walk the dog | true     |
        | wash the dog | true     |
        | feed the dog | true     |
        | hug the dog  | true     |
      When I toggle off "walk the dog" item
      Then I see 3 completed todo items

    Example: Toggle off existing items
      Given I open my todo list
      And I have a list of todo items with
        | name         | completed |
        | walk the dog | true     |
        | wash the dog | true     |
        | feed the dog | true     |
        | hug the dog  | true     |
      When I toggle off "walk the dog" item
      And I toggle off "wash the dog" item
      And I toggle off "feed the dog" item
      Then I see 1 completed todo items
