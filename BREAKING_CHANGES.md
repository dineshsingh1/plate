# 9.0.0

## @udecode/plate-core@9.0.0

-   [#1303](https://github.com/udecode/plate/pull/1303) by [@zbeyens](https://github.com/zbeyens) –
    -   `Plate`
        -   `editor` prop can now be fully controlled: Plate is not applying `withPlate` on it anymore
    -   `PlatePlugin.deserializeHtml`
        -   can't be an array anymore
        -   moved `validAttribute`, `validClassName`, `validNodeName`, `validStyle` to `deserializeHtml.rules` property
    -   renamed `plateStore` to `platesStore`
    -   `platesStore` is now a zustood store
    -   `eventEditorStore` is now a zustood store
    -   `getPlateId` now gets the last editor id if not focused or blurred
        -   used by `usePlateEditorRef` and `usePlateEditorState`
    -   removed:
        -   `usePlateEnabled` for `usePlateSelectors(id).enabled()`
        -   `usePlateValue` for `usePlateSelectors(id).value()`
        -   `usePlateActions`:
            -   `resetEditor` for `getPlateActions(id).resetEditor()`
            -   `clearState` for `platesActions.unset()`
            -   `setInitialState` for `platesActions.set(id)`
            -   `setEditor` for `getPlateActions(id).editor(value)`
            -   `setEnabled` for `getPlateActions(id).enabled(value)`
            -   `setValue` for `getPlateActions(id).value(value)`
        -   `getPlateState`
        -   `usePlateState`
        -   `usePlateKey`

## @udecode/plate@9.0.0

-   [#1303](https://github.com/udecode/plate/pull/1303) by [@zbeyens](https://github.com/zbeyens) –
   -   renamed `plate-x-ui` to `plate-ui-x`: all packages depending on `styled-components` has `plate-ui` prefix
   -   renamed `plate-x-serializer` to `plate-serializer-x`
   -   is now exporting only these (new) packages:
       -   `@udecode/plate-headless`: all unstyled packages
       -   `@udecode/plate-ui`: all styled packages

# 8.0.0

## @udecode/plate-indent-list@8.0.0

-   [#1234](https://github.com/udecode/plate/pull/1234) by [@zbeyens](https://github.com/zbeyens) – Removed:

    -   `IndentListPluginOptions` for `PlatePlugin`

    Rename:

    -   `getIndentListInjectComponent` to `injectIndentListComponent`

 ## @udecode/plate-core@8.0.0

-   [#1234](https://github.com/udecode/plate/pull/1234) by [@zbeyens](https://github.com/zbeyens) – Breaking changes:

    ### `Plate`

    -   removed `components` prop:

    ```tsx
    // Before
    <Plate plugins={plugins} components={components} />;

    // After
    // option 1: use the plugin factory
    let plugins = [
      createParagraphPlugin({
        component: ParagraphElement,
      }),
    ];

    // option 2: use createPlugins
    plugins = createPlugins(plugins, {
      components: {
        [ELEMENT_PARAGRAPH]: ParagraphElement,
      },
    });

    <Plate plugins={plugins} />;
    ```

    -   removed `options` prop:

    ```tsx
    // Before
    <Plate plugins={plugins} options={options} />;

    // After
    // option 1: use the plugin factory
    let plugins = [
      createParagraphPlugin({
        type: 'paragraph',
      }),
    ];

    // option 2: use createPlugins
    plugins = createPlugins(plugins, {
      overrideByKey: {
        [ELEMENT_PARAGRAPH]: {
          type: 'paragraph',
        },
      },
    });

    <Plate plugins={plugins} />;
    ```

    ### `PlatePlugin`

    -   `key`
        -   replacing `pluginKey`
        -   is now required: each plugin needs a key to be retrieved by key.
    -   all handlers have `plugin` as a second parameter:

    ```tsx
    // Before
    export type X<T = {}> = (editor: PlateEditor<T>) => Y;

    // After
    export type X<T = {}, P = {}> = (
      editor: PlateEditor<T>,
      plugin: WithPlatePlugin<T, P>
    ) => Y;
    ```

    -   `serialize` no longer has `element` and `leaf` properties:

    ```ts
    type SerializeHtml = RenderFunction<
      PlateRenderElementProps | PlateRenderLeafProps
    >;
    ```

    Renamed:

    -   `injectParentComponent` to `inject.aboveComponent`
    -   `injectChildComponent` to `inject.belowComponent`
    -   `overrideProps` to `inject.props`
        -   `transformClassName`, `transformNodeValue`, `transformStyle` first parameter is no longer `editor` as it's provided by `then` if needed.
        -   the previously `getOverrideProps` is now the core behavior if `inject.props` is defined.
    -   `serialize` to `serializeHtml`
    -   `deserialize` to `deserializeHtml`
        -   can be an array
        -   the old deserializer options are merged to `deserializeHtml`

    ```tsx
    type DeserializeHtml = {
      /**
       * List of HTML attribute names to store their values in `node.attributes`.
       */
      attributeNames?: string[];

      /**
       * Deserialize an element.
       * Use this instead of plugin.isElement if you don't want the plugin to renderElement.
       * @default plugin.isElement
       */
      isElement?: boolean;

      /**
       * Deserialize a leaf.
       * Use this instead of plugin.isLeaf if you don't want the plugin to renderLeaf.
       * @default plugin.isLeaf
       */
      isLeaf?: boolean;

      /**
       * Deserialize html element to slate node.
       */
      getNode?: (element: HTMLElement) => AnyObject | undefined;

      query?: (element: HTMLElement) => boolean;

      /**
       * Deserialize an element:
       * - if this option (string) is in the element attribute names.
       * - if this option (object) values match the element attributes.
       */
      validAttribute?: string | { [key: string]: string | string[] };

      /**
       * Valid element `className`.
       */
      validClassName?: string;

      /**
       * Valid element `nodeName`.
       * Set '*' to allow any node name.
       */
      validNodeName?: string | string[];

      /**
       * Valid element style values.
       * Can be a list of string (only one match is needed).
       */
      validStyle?: Partial<
        Record<keyof CSSStyleDeclaration, string | string[] | undefined>
      >;

      /**
       * Whether or not to include deserialized children on this node
       */
      withoutChildren?: boolean;
    };
    ```

    -   handlers starting by `on...` are moved to `handlers` property.

    ```ts
    // Before
    onDrop: handler;

    // After
    handlers: {
      onDrop: handler;
    }
    ```

    Removed:

    -   `renderElement` is favor of:
        -   `isElement` is a boolean that enables element rendering.
        -   the previously `getRenderElement` is now the core behavior.
    -   `renderLeaf` is favor of:
        -   `isLeaf` is a boolean that enables leaf rendering.
        -   the previously `getRenderLeaf` is now the core behavior.
    -   `inlineTypes` and `voidTypes` for:
        -   `isInline` is a boolean that enables inline rendering.
        -   `isVoid` is a boolean that enables void rendering.

    ### General

    -   the following plugins are now part of the core plugins, so you need to remove these from your `plugins` prop:

    ```ts
    const corePlugins = [
      createReactPlugin(),
      createHistoryPlugin(),
      createEventEditorPlugin(),
      createInlineVoidPlugin(),
      createInsertDataPlugin(),
      createDeserializeAstPlugin(),
      createDeserializeHtmlPlugin(),
    ];
    ```

    -   `plugins` is not a parameter anymore as it can be retrieved in `editor.plugins`
    -   `withInlineVoid` is now using plugins `isInline` and `isVoid` plugin properties.

    Renamed:

    -   `getPlatePluginType` to `getPluginType`
    -   `getEditorOptions` to `getPlugins`
    -   `getPlatePluginOptions` to `getPlugin`
    -   `pipeOverrideProps` to `pipeInjectProps`
    -   `getOverrideProps` to `pluginInjectProps`
    -   `serializeHTMLFromNodes` to `serializeHtml`
        -   `getLeaf` to `leafToHtml`
        -   `getNode` to `elementToHtml`
    -   `xDeserializerId` to `KEY_DESERIALIZE_X`
    -   `deserializeHTMLToText` to `htmlTextNodeToString`
    -   `deserializeHTMLToMarks` to `htmlElementToLeaf` and `pipeDeserializeHtmlLeaf`
    -   `deserializeHTMLToElement` to `htmlElementToElement` and `pipeDeserializeHtmlElement`
    -   `deserializeHTMLToFragment` to `htmlBodyToFragment`
    -   `deserializeHTMLToDocumentFragment` to `deserializeHtml`
    -   `deserializeHTMLToBreak` to `htmlBrToNewLine`
    -   `deserializeHTMLNode` to `deserializeHtmlNode`
    -   `deserializeHTMLElement` to `deserializeHtmlElement`

    Removed:

    -   `usePlateKeys`, `getPlateKeys`
    -   `usePlateOptions` for `getPlugin`
    -   `getPlateSelection` for `getPlateEditorRef().selection`
    -   `flatMapByKey`
    -   `getEditableRenderElement` and `getRenderElement` for `pipeRenderElement` and `pluginRenderElement`
    -   `getEditableRenderLeaf` and `getRenderLeaf` for `pipeRenderLeaf` and `pluginRenderLeaf`
    -   `getInlineTypes`
    -   `getVoidTypes`
    -   `getPlatePluginTypes`
    -   `getPlatePluginWithOverrides`
    -   `mapPlatePluginKeysToOptions`
    -   `withDeserializeX` for `PlatePlugin.editor.insertData`

    Changed types:

    -   `PlateEditor`:
        -   removed `options` for `pluginsByKey`
    -   `WithOverride` is not returning an extended editor anymore (input and output editors are assumed to be the same types for simplicity).
    -   `PlateState`
        -   renamed `keyChange` to `keyEditor`
        -   removed `plugins` for `editor.plugins`
        -   removed `pluginKeys`
        -   removed `selection` for `editor.selection`
        -   actions:
            -   removed `setSelection`, `setPlugins`, `setPluginKeys`
            -   removed `incrementKeyChange` for

    Renamed types:

    -   `XHTMLY` to `XHtmlY`
    -   `Deserialize` to `DeseralizeHtml`

    Removed types:

    -   `PlatePluginOptions`:
        -   `type` to `PlatePlugin.type`
        -   `component` to `PlatePlugin.component`
        -   `deserialize` to `PlatePlugin.deserializeHtml`
        -   `getNodeProps` to `PlatePlugin.props.nodeProps`
        -   `hotkey` to `HotkeyPlugin`
        -   `clear` to `ToggleMarkPlugin`
        -   `defaultType` is hardcoded to `p.type`
    -   `OverrideProps` for `PlatePlugin.inject.props`
    -   `Serialize` for `PlatePlugin.serializeHtml`
    -   `NodeProps` for `AnyObject`
    -   `OnKeyDownElementOptions` for `HotkeyPlugin`
    -   `OnKeyDownMarkOptions` for `ToggleMarkPlugin`
    -   `WithInlineVoidOptions`
    -   `GetNodeProps` for `PlatePluginProps`
    -   `DeserializeOptions`, `GetLeafDeserializerOptions`, `GetElementDeserializerOptions`, `GetNodeDeserializerOptions`, `GetNodeDeserializerRule`, `DeserializeNode` for `PlatePlugin.deserializeHtml`
    -   `PlateOptions`
    -   `RenderNodeOptions`
    -   `DeserializedHTMLElement`

 ## @udecode/plate-find-replace@8.0.0

-   [#1234](https://github.com/udecode/plate/pull/1234) by [@zbeyens](https://github.com/zbeyens) – Removed:
    -   `useFindReplacePlugin` for `createFindReplacePlugin`

 ## @udecode/plate-alignment@8.0.0

-   [#1234](https://github.com/udecode/plate/pull/1234) by [@zbeyens](https://github.com/zbeyens) –
    -   `setAlign`
        -   moved param 3 to param 2 as `setNodesOptions`

 ## @udecode/plate-basic-elements@8.0.0

-   [#1234](https://github.com/udecode/plate/pull/1234) by [@zbeyens](https://github.com/zbeyens) –
    -   renamed `createBasicElementPlugins` to `createBasicElementsPlugin`

 ## @udecode/plate-code-block@8.0.0

-   [#1234](https://github.com/udecode/plate/pull/1234) by [@zbeyens](https://github.com/zbeyens) – Removed:
    -   `getCodeBlockPluginOptions` for `getPlugin`
    -   `getCodeLinePluginOptions` for `getPlugin`

 ## @udecode/plate-heading@8.0.0

-   [#1234](https://github.com/udecode/plate/pull/1234) by [@zbeyens](https://github.com/zbeyens) – Renamed:
    -   `HeadingPluginOptions` to `HeadingsPlugin`

 ## @udecode/plate-mention@8.0.0

-   [#1234](https://github.com/udecode/plate/pull/1234) by [@zbeyens](https://github.com/zbeyens) – Removed:
    -   `getMentionInputPluginOptions` for `getPlugin`
    -   `getMentionInputType` for `getPluginType`
    -   `COMBOBOX_TRIGGER_MENTION`

 ## @udecode/plate-basic-marks@8.0.0

-   [#1234](https://github.com/udecode/plate/pull/1234) by [@zbeyens](https://github.com/zbeyens) –
    -   renamed `createBasicMarkPlugins` to `createBasicMarksPlugin`

 ## @udecode/plate@8.0.0

-   [#1234](https://github.com/udecode/plate/pull/1234) by [@zbeyens](https://github.com/zbeyens) – Breaking changes:

    -   all plugins options are now defined in the plugin itself
    -   plugins which now have nested plugins instead of array:
        -   `createBasicElementsPlugin`
        -   `createCodeBlockPlugin`
        -   `createHeadingPlugin`
        -   `createListPlugin`
        -   `createTablePlugin`
        -   `createBasicMarksPlugin`

    Removed:

    -   `createEditorPlugins` for `createPlateEditor` (without components) and `createPlateEditorUI` (with Plate components)
    -   `createPlateOptions` for `createPlugins`
    -   all `DEFAULTS_X`: these are defined in the plugins
    -   all `getXDeserialize`: these are defined in the plugins
    -   all `WithXOptions` for extended plugins
    -   all `getXRenderElement`
    -   some plugin option types are removed for `PlatePlugin`

    Renamed:

    -   `createPlateComponents` to `createPlateUI`
    -   all `getXY` handlers to `yX` (e.g. `getXOnKeyDown` to `onKeyDownX`)
    -   all `XPluginOptions` to `XPlugin`
    -   all `pluginKey` parameter to `key` except in components

    Renamed types:

    -   `DecorateSearchHighlightOptions` to `FindReplacePlugin`

    Updated deps:

    -   `"slate": "0.70.0"`
    -   `"slate-react": "0.70.1"`

    Removed deps (merged to core):

    -   `plate-common`
    -   `plate-ast-serializer`
    -   `plate-html-serializer`
    -   `plate-serializer`

 ## @udecode/plate-serializer-csv@8.0.0

-   [#1234](https://github.com/udecode/plate/pull/1234) by [@zbeyens](https://github.com/zbeyens) – Renamed:
    -   `createDeserializeCSVPlugin` to `createDeserializeCsvPlugin`
    -   `deserializeCSV` to `deserializeCsv`

 ## @udecode/plate-serializer-md@8.0.0

-   [#1234](https://github.com/udecode/plate/pull/1234) by [@zbeyens](https://github.com/zbeyens) –

    -   `createDeserializeMdPlugin`:
        -   is now disabled if there is html data in the data transfer.

    Renamed:

    -   `createDeserializeMDPlugin` to `createDeserializeMdPlugin`
    -   `deserializeMD` to `deserializeMd`

# 7.0.0

## `@udecode/plate-core`

- renamed:
  - `SPEditor` to `PEditor` (note that `PlateEditor` is the new default)
  - `SPRenderNodeProps` to `PlateRenderNodeProps`
  - `SPRenderElementProps` to `PlateRenderElementProps`
  - `SPRenderLeafProps` to `PlateRenderLeafProps`
  - `useEventEditorId` to `usePlateEventId`
  - `useStoreEditorOptions` to `usePlateOptions` 
  - `useStoreEditorRef` to `usePlateEditorRef` 
  - `useStoreEditorSelection` to `usePlateSelection` 
  - `useStoreEditorState` to `usePlateEditorState` 
  - `useStoreEditorValue` to `usePlateValue` 
  - `useStoreEnabled` to `usePlateEnabled` 
  - `useStorePlate` to `usePlatePlugins` 
  - `useStorePlatePluginKeys` to `usePlateKeys` 
  - `useStoreState` to `usePlateState` 
- `getPlateId`: Get the last focused editor id, else get the last blurred editor id, else get the first editor id, else `null`
- `getPlateState`:
  - removed first parameter `state`
  - previously when giving no parameter, it was returning the first editor. Now it's returning the editor with id = `getPlateId()`. It means `useEventEditorId('focus')` is no longer needed for
    - `usePlateEditorRef`
    - `usePlateEditorState`
    - `usePlateX`...

## `@udecode/plate-alignment`

- `setAlign`: option `align` renamed to `value`
- removed `getAlignOverrideProps()` in favor of `getOverrideProps(KEY_ALIGN)`

## `@udecode/plate-indent`

- removed `getIndentOverrideProps()` in favor of `getOverrideProps(KEY_INDENT)`
- rename `onKeyDownHandler` to `getIndentOnKeyDown()`
- `IndentPluginOptions`
  - rename `types` to `validTypes`
  - rename `cssPropName` to `styleKey`
  - rename `transformCssValue` to `transformNodeValue`

## `@udecode/plate-line-height`

- `setLineHeight`: option `lineHeight` renamed to `value`
- removed `getLineHeightOverrideProps` in favor of `getOverrideProps(KEY_LINE_HEIGHT)`

## `@udecode/plate-mention`

- `getMentionOnSelectItem`:
  - removed `createMentionNode` in favor of plugin options
  - removed `insertSpaceAfterMention` in favor of plugin options

## `@udecode/plate-mention-ui`

- `MentionCombobox` props:
  - removed `trigger` in favor of plugin options
  - removed `insertSpaceAfterMention` in favor of plugin options
  - removed `createMentionNode` in favor of plugin options

## `@udecode/plate-x-ui`

- renamed `ToolbarAlign` to `AlignToolbarButton`
- renamed `ToolbarCodeBlock` to `CodeBlockToolbarButton`
- renamed `ToolbarElement` to `BlockToolbarButton`
- renamed `ToolbarImage` to `ImageToolbarButton`
- renamed `ToolbarLink` to `LinkToolbarButton`
- renamed `ToolbarList` to `ListToolbarButton`
- renamed `ToolbarLineHeight` to `LineHeightToolbarDropdown`
- renamed `ToolbarMark` to `MarkToolbarButton`
- renamed `ToolbarMediaEmbed` to `MediaEmbedToolbarButton`
- renamed `ToolbarSearchHighlight` to `SearchHighlightToolbar`
- renamed `ToolbarTable` to `TableToolbarButton`

# 6.0.0

## `@udecode/plate-alignment`

The align plugin is no longer wrapping a block, but instead setting an `align` property to an existing block.

- `createAlignPlugin`:
  - removed `pluginKeys`, `renderElement` and `deserialize`
- removed:
  - `ELEMENT_ALIGN_LEFT`
  - `ELEMENT_ALIGN_CENTER`
  - `ELEMENT_ALIGN_RIGHT`
  - `ELEMENT_ALIGN_JUSTIFY`
  - `KEYS_ALIGN` in favor of `KEY_ALIGN`
  - `getAlignDeserialize`
  - `upsertAlign` in favor of `setAlign`

Migration (normalizer):  
- for each node:
  - run `parent = getParent(editor, path)`, if `parent[0].type` is one of the alignment values:
    - run `setAlign(editor, { align }, { at: path })`
    - run `unwrapNodes(editor, { at: path })`

## `@udecode/plate-alignment-ui`

- `ToolbarAlignProps`:
  - removed `type` in favor of `align`
  - removed `unwrapTypes`
  - added `align`

# 5.0.0

## `@udecode/plate-mention`

The mention plugin is now using the combobox.
- removed `useMentionPlugin` in favor of `createMentionPlugin`
  - migration: replace `useMentionPlugin().plugin` by `createMentionPlugin()`
- removed options:
  - `mentionableSearchPattern`
  - `insertSpaceAfterMention`
  - `maxSuggestions`: moved to `comboboxStore`
  - `trigger`: moved to `comboboxStore`
  - `mentionables`: moved to `items` in `comboboxStore` 
  - `mentionableFilter`: moved to `filter` in `comboboxStore` 
- removed `matchesTriggerAndPattern` in favor of `getTextFromTrigger`
- removed `MentionNodeData` in favor of `ComboboxItemData`
```ts
export interface ComboboxItemData {
  /**
   * Unique key.
   */
  key: string;
  /**
   * Item text.
   */
  text: any;
  /**
   * Whether the item is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Data available to `onRenderItem`.
   */
  data?: unknown;
}
```

## `@udecode/plate-mention-ui`

- removed `MentionSelect` in favor of `MentionCombobox`

## `@udecode/plate-toolbar`

- removed `setPositionAtSelection` in favor of `useBalloonToolbarPopper`
- removed `useBalloonMove` in favor of `useBalloonToolbarPopper`
- removed `usePopupPosition` in favor of `useBalloonToolbarPopper`
- removed `useBalloonShow` in favor of `useBalloonToolbarPopper`
`BalloonToolbar` props:
- removed `direction` in favor of `popperOptions.placement`
- renamed `scrollContainer` to `popperContainer`

# 4.0.0

## `@udecode/plate-toolbar`

- `BalloonToolbar`: removed `hiddenDelay` prop.

# 3.0.0

## All UI packages

There was multiple instances of `styled-components` across all the packages.
So we moved `styled-components` from dependencies to peer dependencies.

### Before

`styled-components` was not listed in your dependencies

### After

Add `styled-components` to your dependencies

# 2.0.0

## `@udecode/plate-autoformat`

- `autoformatBlock`:
  - signatude changed 

```ts
// Before 
(
  editor: TEditor,
  type: string,
  at: Location,
  options: Pick<AutoformatRule, 'preFormat' | 'format'>
)
```

```ts
// After
(editor: TEditor, options: AutoformatBlockOptions)
```

  - moved the checks from `withAutoformat`
- `autoformatInline`:
  - renamed to `autoformatMark`
  - signatured changed

```ts
// Before
(
  editor: TEditor,
  options: Pick<AutoformatRule, 'type' | 'between' | 'markup' | 'ignoreTrim'>
)  
```

```ts
// After
(
  editor: TEditor,
  options: AutoformatMarkOptions
) 
```

- `AutoformatRule` is now `AutoformatBlockRule
  | AutoformatMarkRule
  | AutoformatTextRule;`
  - `mode: 'inline'` renamed to `mode: 'mark'`
  - `markup` and `between` have been replaced by `match: string | string[] | MatchRange | MatchRange[]`: The rule applies when the trigger and the text just before the cursor matches. For `mode: 'block'`: lookup for the end match(es) before the cursor. For `mode: 'text'`: lookup for the end match(es) before the cursor. If `format` is an array, also lookup for the start match(es). For `mode: 'mark'`: lookup for the start and end matches. Note: `'_*'`, `['_*']` and `{ start: '_*', end: '*_' }` are equivalent. 
  - `trigger` now defaults to the last character of `match` or `match.end` (previously `' '`)
- the plugin now checks that there is no character before the start match to apply autoformatting. For example, nothing will happen by typing `a*text*`.