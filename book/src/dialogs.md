# 📖 [Dialogs (Task Modules)](https://learn.microsoft.com/en-us/microsoftteams/platform/task-modules-and-cards/task-modules/task-modules-bots?tabs=nodejs)

Modal dialogs in Teams for rich interaction.

## [`@teams.sdk/cards`](https://www.npmjs.com/package/@teams.sdk/cards)

dialogs can be opened from teams by using an [Adaptive Card `Action.Submit`](https://adaptivecards.io/explorer/Action.Submit.html).

> Example: by adding `msteams: { type: 'task/fetch' }` to the `action.data` we tell the teams client to open a dialog on click.

```typescript
const card: Card = {
    type: 'AdaptiveCard',
    version: '1.6',
    body: [...],
    actions: [
      {
        id: 'hello-world',
        type: 'Action.Submit',
        title: 'Hello World',
        data: {
          msteams: {
            type: 'task/fetch'
          }
        }
      }
    ]
};
```

## [`dialog.open` (task/fetch)](https://learn.microsoft.com/en-us/microsoftteams/platform/task-modules-and-cards/task-modules/task-modules-bots?tabs=nodejs#invoke-a-dialog-using-taskfetch)

triggered when a dialog is opened, used to render dialog contents.

> Example: when a dialog is opened, render an [Adaptive Card](https://adaptivecards.io/) as the body.

```typescript
app.on('dialog.open', ({ }) => {
    return {
        status: 200,
        body: {
            task: {
                type: 'continue',
                value: {
                    width: 'large',
                    card: cardAttachment('adaptive', {
                        type: 'AdaptiveCard',
                        version: '1.6',
                        body: [...]
                    })
                }
            }
        }
    };
});
```

## [`dialog.submit` (task/submit)](https://learn.microsoft.com/en-us/microsoftteams/platform/task-modules-and-cards/task-modules/task-modules-bots?tabs=nodejs#responds-to-the-tasksubmit-messages)

triggered when a dialog is submitted, used to handle logic before closing the dialog.

> Example: when a dialog is submitted, do some custom logic and do not render anything else.

```typescript
app.on('dialog.submit', ({}) => {
    // ... some logic
    return { status: 200 };
});
```

## Docs

-   [Invoking Task Modules](https://learn.microsoft.com/en-us/microsoftteams/platform/task-modules-and-cards/task-modules/invoking-task-modules)
