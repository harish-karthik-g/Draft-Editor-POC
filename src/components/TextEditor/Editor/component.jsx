import React, { createRef } from "react";
import {
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import InlineStyleControls from "../InlineStyleControls";
import "draft-js/dist/Draft.css";
import "./styles.css";
import BlockStyleControls from "../BlockStyleControls";
import NoteTitle from "../NoteTitle";
import { v4 as uuidV4 } from "uuid";
import { blockStyleClassNames, inlineStyleMap } from "./constants";

export class DraftEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      noteTitle: "",
    };
    this.editorRef = createRef();
    this.focusEditor = this.focusEditor.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
    this.noteTitleChange = this.noteTitleChange.bind(this);
  }

  noteTitleChange(event) {
    this.setState({ noteTitle: event.target.value });
  }

  getBlockStyle(block) {
    return blockStyleClassNames[block.getType()];
  }

  focusEditor() {
    this.editorRef.current.focus();
  }

  onChange(editorState) {
    this.setState({ editorState });
  }

  handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  componentDidMount() {
    if (this.props.selectedNoteId) {
      const { title, editorData } = JSON.parse(
        localStorage.getItem(this.props.selectedNoteId)
      );
      if (editorData) {
        this.setState({
          noteTitle: title,
          editorState: EditorState.createWithContent(
            convertFromRaw(editorData)
          ),
        });
      }
    }
  }

  componentWillUnmount() {
    const hasContent = this.state.editorState.getCurrentContent().hasText();
    const noteDataStringFromLocalStorage = localStorage.getItem(
      this.props.selectedNoteId
    );
    const noteDataStringFromEditor = JSON.stringify(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
    const hasContentChanged =
      noteDataStringFromEditor !== noteDataStringFromLocalStorage;
    if (hasContent && hasContentChanged) {
      const noteIdForLocalStorage = this.props.selectedNoteId || uuidV4();
      this.props.updateNoteTitles(this.state.noteTitle, noteIdForLocalStorage);
      localStorage.setItem(
        noteIdForLocalStorage,
        JSON.stringify({
          title: this.state.noteTitle,
          editorData: convertToRaw(this.state.editorState.getCurrentContent()),
        })
      );
    }
  }

  render() {
    const { editorState } = this.state;
    let className = "RichEditor-editor";
    let contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }
    return (
      <>
        <NoteTitle
          title={this.state.noteTitle}
          noteTitleChange={this.noteTitleChange}
        />
        <div className="RichEditor-root">
          <div className="RichEditor__controlsContainer">
            <BlockStyleControls
              editorState={editorState}
              toggleBlockType={this.toggleBlockType}
            />
            <InlineStyleControls
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
            />
          </div>
          <div className={className} onClick={this.focusEditor}>
            <Editor
              blockStyleFn={this.getBlockStyle}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              placeholder="Tell a story..."
              ref={this.editorRef}
              spellCheck={true}
              customStyleMap={inlineStyleMap}
            />
          </div>
        </div>
      </>
    );
  }
}
