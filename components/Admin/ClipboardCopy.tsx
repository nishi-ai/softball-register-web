import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
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


const ClipboardCopy = (props: { emails: string; }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
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
            <FontAwesomeIcon
              icon={faClipboardCheck}
              color='#ffc15a'
              size='lg'
            />
          ) : (
            <FontAwesomeIcon icon={faClipboard} color='#ffc15a' size='lg' />
          )}
        </div>
      </CopyToClipboard>
    </StyledDiv>
  );
};

export default ClipboardCopy;
