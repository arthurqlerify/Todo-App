Feature: Update Todo

  Scenario: Given an existing todo with a specific ID, when a user provides a new task for that todo, then the todo's task is updated in the system.
    Given an existing todo with a specific ID
    When a user provides a new task for that todo
    Then the todo's task is updated in the system.