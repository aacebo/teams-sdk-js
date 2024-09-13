# 📖 [User Auth](https://learn.microsoft.com/en-us/microsoftteams/platform/bots/how-to/authentication/add-authentication)

You can create bots in Microsoft Teams that access resources on behalf of the user, such as the graph api.

> Example: when an activity is received, prompt the user to sign in.

```typescript
app.on('activity', async ({ signin }) => {
    await signin('connectionName');
});
```
