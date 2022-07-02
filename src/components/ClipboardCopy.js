import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  color: #ffc15a;
  align-items: center;
  justify-content: center;
  padding-right: 30px;
  cursor: pointer;
`;

const ClipboardCopy = (props) => {
  const [isCopied, setIsCopied] = useState(false);
  const emails = props.emails;
  // onCopyText function to toggle this state
  // The onCopy prop is run when the text is copied.
  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <StyledDiv>
      <CopyToClipboard text={emails} onCopy={onCopyText}>
        <div>
          {isCopied ? (
            <FontAwesomeIcon icon={["fas", "clipboard-check"]} size='lg' />
          ) : (
            <FontAwesomeIcon icon={["fas", "copy"]} size='lg' />
          )}
        </div>
      </CopyToClipboard>
    </StyledDiv>
  );
};

export default ClipboardCopy;
