import React, { useState, useMemo, useEffect } from "react";
import styled from "@emotion/styled";
import { AspectRatio } from "./AspectRatio";
import { Canvas } from "./Canvas";
import { parseViewBox, setViewBox } from "../utils/setViewBox";
import { Checkbox } from "./Checkbox";
import { minifyPath } from "../utils/minifyPath";

export const App = () => {
  const [originPath, setOriginPath] = useState(
    "M28.947,56.486c15.685-11.277,23.532-21.592,27.222-29.46c4.311-9.193,0.561-20.589-8.845-24.413   C36.268-1.88,28.947,8.486,28.947,8.486S21.678-1.907,10.623,2.588C1.217,6.412-2.533,17.808,1.778,27.001   C5.468,34.868,13.262,45.21,28.947,56.486z"
  );
  const [originViewbox, setOriginViewbox] = useState("0 0 57.947 57.947");
  const [targetViewbox, setTargetViewbox] = useState("0 0 1 1");

  const [minify, setMinify] = useState(false);

  const targetPath = useMemo(
    () =>
      setViewBox(
        originPath,
        parseViewBox(originViewbox),
        parseViewBox(targetViewbox)
      ),
    [originPath, originViewbox, targetViewbox]
  );

  const [targetPathS, setTargetPathS] = useState(targetPath);
  useEffect(() => {
    const box = parseViewBox(targetViewbox);
    const floatPrecision = Math.max(
      0,
      2 - Math.round(Math.log(Math.min(box.width, box.height)) / Math.log(10))
    );
    if (minify) minifyPath(targetPath, { floatPrecision }).then(setTargetPathS);
    else setTargetPathS(targetPath);
  }, [targetPath, minify, targetViewbox]);

  return (
    <Container>
      <Box>
        <CanvasViewBox ratio={1 / 1}>
          <CanvasView viewBox={originViewbox} path={originPath} />
        </CanvasViewBox>
        <Input
          type="text"
          value={originViewbox}
          onChange={(e) => setOriginViewbox(e.target.value)}
          placeholder="original viewBox"
        />
        <LargeInput
          value={originPath}
          onChange={(e) => setOriginPath(e.target.value)}
          placeholder="original path"
        />
      </Box>

      <Box>
        <CanvasViewBox ratio={1 / 1}>
          <CanvasView viewBox={targetViewbox} path={targetPathS} />
        </CanvasViewBox>
        <Input
          type="text"
          value={targetViewbox}
          onChange={(e) => setTargetViewbox(e.target.value)}
          placeholder="target viewBox"
        />
        <LargeInput
          value={targetPathS}
          onFocus={(e) => e.target.focus()}
          placeholder="result path"
          readOnly
        />

        <div>
          <Checkbox id="minify-with-svgo" value={minify} onChange={setMinify} />{" "}
          <label htmlFor="minify-with-svgo">minify with svgo</label>
        </div>
      </Box>
    </Container>
  );
};

export const app = <App />;

const Input = styled.input`
  width: calc(100% - 2px - 8px);
  margin-top: 16px;
  padding: 4px;
  font-family: monospace;
  font-size: 12px;
`;

const LargeInput = styled.textarea`
  width: calc(100% - 2px - 8px);
  margin-top: 16px;
  padding: 4px;
  resize: vertical;
  height: 200px;
  font-family: monospace;
  font-size: 12px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: strech;
  padding: 8px;
`;

const Box = styled.div`
  width: calc(50% - 16px);
  margin: 8px;
  position: relative;
`;

const CanvasViewBox = styled(AspectRatio)`
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2) inset;
  display: flex;
` as any;

const CanvasView = styled(Canvas)`
  width: 100%;
  height: 100%;
` as any;
