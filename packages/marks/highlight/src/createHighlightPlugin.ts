import {
  getToggleMarkOnKeyDown,
  ToggleMarkPlugin,
} from '@udecode/plate-common';
import { createPluginFactory } from '@udecode/plate-core';
import { getHighlightDeserialize } from './getHighlightDeserialize';

export const MARK_HIGHLIGHT = 'highlight';

/**
 * Enables support for highlights, useful when reviewing
 * content or highlighting it for future reference.
 */
export const createHighlightPlugin = createPluginFactory<ToggleMarkPlugin>({
  key: MARK_HIGHLIGHT,
  isLeaf: true,
  deserialize: getHighlightDeserialize(),
  onKeyDown: getToggleMarkOnKeyDown(),
  hotkey: 'mod+shift+h',
});
