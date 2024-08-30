# [`task/submit`](https://learn.microsoft.com/en-us/microsoftteams/platform/task-modules-and-cards/task-modules/task-modules-bots?tabs=nodejs#responds-to-the-tasksubmit-messages)

the `task/submit` invoke is used in the context of Task Modules. Task Modules are a way to create modal dialogs within Teams that can be used to collect or display information. They are often used in conjunction with bots or messaging extensions to provide a richer user experience.

When you use `task/submit`, it is typically part of the payload that is sent when a user submits a form within a Task Module. Here’s a breakdown of how it works:

1. **Opening a Task Module**: A Task Module can be opened by a bot or a messaging extension. This is usually done by sending an `invoke` activity to the bot with the `task/fetch` action. The bot responds with the Task Module configuration, which includes the URL of the content to be displayed in the modal.

2. **User Interaction**: The user interacts with the form or content within the Task Module. This could involve filling out a form, making selections, or any other interaction.

3. **Submitting the Form**: When the user submits the form, an `invoke` activity with the `task/submit` action is sent to the bot. This activity includes the data collected from the form.

4. **Bot Processing**: The bot receives the `task/submit` activity and processes the data. This could involve saving the data, performing some action based on the data, or any other processing required by the bot’s logic.

5. **Response**: The bot can then respond with a message or another Task Module configuration if further interaction is needed.

Here’s an example of how the `task/submit` payload might look:

```json
{
    "type": "invoke",
    "name": "task/submit",
    "value": {
        "formData": {
            "field1": "value1",
            "field2": "value2"
        }
    }
}
```

In this example, `formData` contains the data collected from the form within the Task Module.

### Key Points:

-   **Task Modules**: Modal dialogs in Teams for rich interaction.
-   **task/submit**: Action invoked when a form within a Task Module is submitted.
-   **Bot Processing**: The bot handles the submitted data and can respond accordingly.

Task Modules and the `task/submit` invoke action provide a powerful way to create interactive and dynamic experiences within Microsoft Teams.
