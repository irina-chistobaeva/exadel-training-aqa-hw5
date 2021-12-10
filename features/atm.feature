Feature: ATM withdraw
  As an Account Holder
  In Order to get money
  I want to withdraw cash from an ATM

  Scenario Outline: Account has <Scenario>
    Given my account balance is <Balance>
    And the ATM contains <ATMAmount>
    When I withdraw <Cash>
    Then I get <Message> message

    Examples:
      | Scenario                     | Balance | ATMAmount | Cash  | Message                                 |
      | sufficient funds             | "500"   | "600"     | "50"  | "Take your money!"                      |
      | insufficient funds           | "500"   | "600"     | "550" | "You don't have enough money!"          |
      | insufficient amount of money | "500"   | "150"     | "300" | "The machine is not have enough money!" |
