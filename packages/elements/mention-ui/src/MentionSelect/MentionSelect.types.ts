import {
  GetMentionSelectProps,
  MentionNodeData,
} from '@udecode/slate-plugins-mention';
import { StyledProps } from '@udecode/slate-plugins-ui';
import { CSSProp } from 'styled-components';

export interface MentionSelectStyles {
  mentionItem: CSSProp;
  mentionItemSelected: CSSProp;
}

export interface MentionSelectProps
  extends GetMentionSelectProps,
    StyledProps<MentionSelectStyles> {
  renderLabel?: (mentionable: MentionNodeData) => string;
}
