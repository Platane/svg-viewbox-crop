import * as React from "react";
import styled from "@emotion/styled";

export const Checkbox = ({ value, onChange, ...props }) => (
  <Input
    {...props}
    type="checkbox"
    checked={!!value}
    onChange={(e) => onChange(e.target.checked)}
  />
);

const Input = styled.input`
  width: 20px;
  height: 20px;
`;
