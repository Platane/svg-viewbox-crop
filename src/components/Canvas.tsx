import * as React from "react";
import styled from "@emotion/styled";
import { parseViewBox, stringifyViewBox } from "../utils/setViewBox";

export const Canvas = ({ viewBox, viewBox2, path, ...props }) => {
  const box = parseViewBox(viewBox);

  const enlargeBox = {
    x: box.x - box.width * 0.1,
    y: box.y - box.height * 0.1,
    width: box.width * 1.2,
    height: box.height * 1.2
  };

  return (
    <Container {...props} viewBox={stringifyViewBox(enlargeBox)}>
      <ViewBox
        strokeWidth={box.width * 0.005}
        d={`M${box.x} ${box.y}v${box.height}h${box.width}v${-box.height}z`}
      />
      <Path d={path} />
    </Container>
  );
};

const Container = styled.svg``;

const Path = styled.path`
  fill: rgba(0, 0, 0, 0.6);
  stroke: none;
`;

const ViewBox = styled.path`
  fill: rgba(0, 0, 0, 0.1);
  fill: none;
  stroke: red;
`;
