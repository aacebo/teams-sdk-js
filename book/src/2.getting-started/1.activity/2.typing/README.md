# Activity: Typing

Typing activities represent ongoing input from a user or a bot. This activity is often sent when keystrokes are being entered by a user, although it's also used by bots to indicate they're "thinking," and could also be used to indicate e.g. collecting audio from users.

Typing activities are intended to persist within UIs for three seconds.

```typescript
app.on('message', async ({ send }) => {
    await send({ type: 'typing' });
});
```

## Schema

Typing activities are identified by a `type` value of `typing`.

`A6000`: If able, clients SHOULD display typing indicators for three seconds upon receiving a typing activity.

`A6001`: Unless otherwise known for the channel, senders SHOULD NOT send typing activities more frequently than one every three seconds. (Senders MAY send typing activities every two seconds to prevent gaps from appearing.)

`A6002`: If a channel assigns an [`id`](#id) to a typing activity, it MAY allow bots and clients to delete the typing activity before its expiration.

`A6003`: If able, channels SHOULD send typing activities to bots.
