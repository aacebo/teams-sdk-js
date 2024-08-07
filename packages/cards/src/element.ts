import { ColumnSet, Container } from './containers';
import { Image, Media, RichTextBlock, TextBlock } from './medias';

export type Element = ColumnSet | Container | Image | Media | RichTextBlock | TextBlock;
