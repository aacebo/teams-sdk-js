import { FC, useContext } from 'react';
import {
  bundleIcon,
  Edit16Filled,
  Edit16Regular,
  FluentIcon,
  MoreHorizontal16Filled,
  MoreHorizontal16Regular,
  TextQuote16Filled,
  TextQuote16Regular,
} from '@fluentui/react-icons/lib/fonts';
import { Message } from '@teams.sdk/api';
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  ToolbarGroup,
  ToolbarToggleButton,
  Tooltip,
} from '@fluentui/react-components';
import type { ToolbarProps } from '@fluentui/react-components';

import { MessageReaction, MessageReactionType } from '@teams.sdk/api';

import { useClasses } from './NewMessageToolbar.styles';
import { ChatContext } from '../../stores/ChatStore';
import useSparkApi from '../../hooks/useSparkApi';
import React from 'react';

interface MessageActionsProps extends ToolbarProps {
  // Whether the message is sent or received
  sent: boolean;
  value: Message;
}

const MessageReactions: Array<{
  readonly label: string;
  readonly reaction: MessageReactionType;
}> = [
  { label: '👍', reaction: 'like' },
  { label: '❤️', reaction: 'heart' },
  { label: '😆', reaction: 'laugh' },
  { label: '😮', reaction: 'surprised' },
];

const MoreHorizontalIcon = bundleIcon(
  MoreHorizontal16Filled as FluentIcon,
  MoreHorizontal16Regular as FluentIcon
);
const EditIcon = bundleIcon(Edit16Filled as FluentIcon, Edit16Regular as FluentIcon);
const TextQuoteIcon = bundleIcon(TextQuote16Filled as FluentIcon, TextQuote16Regular as FluentIcon);

const MessageActionsToolbar: FC<MessageActionsProps> = ({ sent, value, ...props }) => {
  const { chat, messages } = useContext(ChatContext);
  const sparkApi = useSparkApi();
  const classes = useClasses();

  const capitalizeFirstLetter = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleMessageReaction = async (id: string, type: MessageReactionType) => {
    const message = messages[chat.id].find((m) => m.id === id);

    if (!message) return;

    const added: Array<MessageReaction> = [];
    const removed: Array<MessageReaction> = [];
    const reaction = (message.reactions || []).find(
      (r) => r.type === type && r.user?.id === 'devtools'
    );

    if (reaction) {
      removed.push(reaction);
    } else {
      added.push({
        type,
        user: { id: 'devtools', displayName: 'devtools' },
        createdDateTime: new Date().toUTCString(),
      });
    }

    try {
      await sparkApi.conversations.activities(chat.id).create({
        id,
        type: 'messageReaction',
        reactionsAdded: added,
        reactionsRemoved: removed,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    id: string,
    type: MessageReactionType
  ) => {
    if (event.key === 'Enter') {
      handleMessageReaction(id, type);
    }
  };

  return (
    <Toolbar aria-label="Message actions" {...props}>
      <ToolbarGroup>
        {MessageReactions.map(({ label, reaction }) => (
          <Tooltip content={capitalizeFirstLetter(reaction)} relationship="label" key={reaction}>
            <ToolbarToggleButton
              as="button"
              appearance="subtle"
              aria-label={reaction}
              className={classes.toolbarButton}
              size="small"
              name={reaction}
              value={reaction}
              onClick={() => handleMessageReaction(value.id, reaction)}
              onKeyDown={(event) => handleKeyDown(event, value.id, reaction)}
              tabIndex={0}
            >
              {label}
            </ToolbarToggleButton>
          </Tooltip>
        ))}
      </ToolbarGroup>
      <ToolbarDivider />
      {!sent && (
        <Tooltip content="Reply with quote" relationship="label">
          <ToolbarButton
            appearance="subtle"
            className={classes.toolbarButton}
            key="reply-with-quote"
            icon={<TextQuoteIcon />}
            disabled={true}
          />
        </Tooltip>
      )}
      {sent && (
        <Tooltip content="Edit" relationship="label">
          <ToolbarButton
            aria-label="Edit"
            key="Edit"
            icon={<EditIcon />}
            className={classes.toolbarButton}
            disabled={true}
          />
        </Tooltip>
      )}
      <Tooltip content="More options" relationship="label">
        <ToolbarButton
          aria-label="More options"
          key="more-options"
          icon={<MoreHorizontalIcon />}
          className={classes.toolbarButton}
          disabled={true}
        />
      </Tooltip>
    </Toolbar>
  );
};

export default MessageActionsToolbar;