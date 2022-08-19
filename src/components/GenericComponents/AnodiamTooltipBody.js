import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";

const AnodiamTooltipBody = styled(({ className, ...props }) => (
  <Tooltip {...props} componentsProps={{ tooltip: { className: className } }} />
))(`
    color: #80878f;
    background-color: #e0f5ff;
    max-width: 250px;
    text-align: justify;
    font-weight: 50;
    font-size: 11px;
`);

export default AnodiamTooltipBody;