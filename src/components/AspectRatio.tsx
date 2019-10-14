import * as React from "react";
import styled from "@emotion/styled";

type Props = {
  ratio: number;
} & any;

export const AspectRatio = ({ ratio = 1 / 1, children, ...props }: Props) => (
  <Container {...props}>
    <Box style={{ paddingTop: `${(1 / ratio) * 100}%` }} />
    <Wrapper>{children}</Wrapper>
  </Container>
);

const Container = styled.div`
  position: relative;
`;

const Box = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
