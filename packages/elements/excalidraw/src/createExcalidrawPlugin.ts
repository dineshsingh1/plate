import { createPluginFactory } from '@udecode/plate-core';
import { getExcalidrawDeserialize } from './getExcalidrawDeserialize';

export const ELEMENT_EXCALIDRAW = 'excalidraw';

/**
 * Enables support for Excalidraw drawing tool within a Slate document
 */
export const createExcalidrawPlugin = createPluginFactory({
  key: ELEMENT_EXCALIDRAW,
  isElement: true,
  isVoid: true,
  deserialize: getExcalidrawDeserialize(),
});
