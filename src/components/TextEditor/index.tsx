import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import Button from "../Button";
import { IRule, ICreateRulesRequest } from "../../interfaces/IRules";

interface Languages {
  en: string;
  ru: string;
  he: string;
}

const defaultRules: Languages = {
  en: "<p>There is no description</p>",
  ru: "<p>Нет описания</p>",
  he: "<p>אין תיאור</p>"
};

interface TextEditorProps {
  currentGameName: string;
  newGameName: string;
  currentGameType: number;
  rules: IRule[];
  createRulesRequest(data: ICreateRulesRequest): void;
  translate(text: string): string;
}

interface TextEditorState {
  editorState: any
}

class TextEditor extends Component<TextEditorProps, TextEditorState> {
  constructor(props) {
    super(props);

    const editorState = this.getEditorState();

    this.state = {
      editorState
    };
  }

  componentDidUpdate = (previousProps, previousState) => {
    if (
      previousProps.currentGameName !== this.props.currentGameName ||
      this.props.rules.some(rule => previousProps.rules.every(previousRule => rule.gameName !== previousRule.gameName))
    ) {
      const editorState = this.getEditorState();

      this.setState({
        editorState
      });
    }
  };

  getEditorState = () => {
    const currentRule: IRule | undefined = this.props.rules.find(rule => rule.gameName === this.props.currentGameName);
    const text: string =
      currentRule && JSON.parse(currentRule.text)[localStorage.locale]
        ? JSON.parse(currentRule.text)[localStorage.locale]
        : `<body>${defaultRules[localStorage.locale]}</body>`;

    const contentBlock = htmlToDraft(text);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);

    return EditorState.createWithContent(contentState);
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  onSubmit = values => {
    values.preventDefault();
    const currentRule: IRule | undefined = this.props.rules.find(rule => rule.gameName === this.props.currentGameName);
    const text: string = currentRule ? JSON.parse(currentRule.text)[localStorage.locale] : defaultRules[localStorage.locale];
    const content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())).slice(0, -1);

    if (
      content === defaultRules[localStorage.locale] ||
      ((currentRule && content === text) && (!this.props.newGameName || this.props.currentGameName === this.props.newGameName))
    ) {
      return;
    }

    let newText: Languages;

    const data: ICreateRulesRequest = {
      gameType: this.props.currentGameType,
      gameName: this.props.currentGameName,
      text: currentRule
        ? ((newText = JSON.parse(currentRule.text)), (newText[localStorage.locale] = content), JSON.stringify(newText))
        : JSON.stringify({ [localStorage.locale]: content })
    };

    if (this.props.newGameName) {
      data.newGameName = this.props.newGameName;
    }

    this.props.createRulesRequest(data);
  };

  render() {
    const { editorState } = this.state;
    return (
      <>
        <form className="rules-form" onSubmit={this.onSubmit}>
          <Editor
            editorState={editorState}
            wrapperClassName="editor-wrapper"
            editorClassName="editor-content"
            onEditorStateChange={this.onEditorStateChange}
          />
          <Button className="btn gold-btn" type="submit">
            {this.props.translate("Set")}
          </Button>
        </form>
      </>
    );
  }
}

export default TextEditor;
