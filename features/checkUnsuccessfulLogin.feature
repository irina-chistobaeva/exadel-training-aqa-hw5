Feature: Login

    Scenario: Error message is shown, if user logs in with credentials: "<login>", "<password>"
        When I go to "https://viktor-silakov.github.io/course-sut/index.html?quick"
        When I login as: "<login>", "<password>"
        Then I get <errorMessage> error message

        Examples:
            | login             | password      | errorMessage            |
            | walker@jw.com     | password1     | "Fail to login"         |
            | walker@jw.com     |               | "Password is empty"     |
            |                   | password      | "Login is empty"        |
            | old_walker@jw.com | password1     | "The user is suspended" |
            | password          | walker@jw.com | "Fail to login"         |
            | admin             | admin         | "Fail to login"         |
            | user              | 123           | "Fail to login"         |
            | dlink             | dlink         | "Fail to login"         |
            | user              |               | "Password is empty"     |
            | admin             |               | "Password is empty"     |
            |                   |               | "Login is empty"        |