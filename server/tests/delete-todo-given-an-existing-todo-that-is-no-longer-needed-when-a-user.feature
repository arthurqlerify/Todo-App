Feature: Delete Todo

  Scenario: Given an existing todo that is no longer needed, when a user requests to delete it, then the todo is permanently removed from the system.
    Given an existing todo that is no longer needed
    When a user requests to delete it
    Then the todo is permanently removed from the system