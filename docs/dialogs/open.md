# [`task/fetch`](https://learn.microsoft.com/en-us/microsoftteams/platform/task-modules-and-cards/task-modules/task-modules-bots?tabs=nodejs#invoke-a-dialog-using-taskfetch)

a `task/fetch` invoke is part of the Bot Framework's task module functionality. Task modules are a way to create custom, modal (popup) dialogs within Microsoft Teams that can be used to gather input from users, display information, or interact with external systems.

Here's a detailed breakdown of what `task/fetch` does:

1. **Triggering the Task Module**: When a user interacts with a bot in a way that should open a task module (for example, by clicking a button in a bot message), the bot can send a `task/fetch` invoke activity to the bot's backend.

2. **Bot's Response**: The bot's backend processes the `task/fetch` invoke and responds with a JSON payload that defines the task module's content. This payload can include:

    - The URL of a web page to display within the task module.
    - The height and width of the task module.
    - Any additional data that should be passed to the web page.

3. **Displaying the Task Module**: Microsoft Teams uses the bot's response to render the task module as specified. The task module can then interact with the user, collect input, and perform actions.

4. **Closing the Task Module**: Once the user has completed the interaction, the task module can send data back to the bot, which can then process the data and take appropriate actions.

### Example Use Case

Imagine a scenario where a bot needs to collect feedback from a user. The bot can send a message with a button labeled "Provide Feedback." When the user clicks this button, a `task/fetch` invoke is sent to the bot's backend. The bot responds with a task module that contains a feedback form. The user fills out the form and submits it, and the task module sends the feedback data back to the bot for processing.

### Key Points

-   **Invoke Activity**: `task/fetch` is a specific type of invoke activity used to request the opening of a task module.
-   **Response Payload**: The bot responds with a JSON payload that defines the task module's content and behavior.
-   **User Interaction**: Task modules provide a rich, interactive experience within Microsoft Teams, allowing for complex workflows and data collection.

By using `task/fetch` and task modules, developers can create more engaging and interactive bot experiences in Microsoft Teams.
