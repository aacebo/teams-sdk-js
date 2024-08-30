import { ColumnSet, Container } from './containers';
import { CodeBlock, Icon, Image, Media, RichTextBlock, TextBlock } from './medias';

export type Element =
  | ColumnSet
  | Container
  | Image
  | Media
  | RichTextBlock
  | TextBlock
  | CodeBlock
  | Icon;
